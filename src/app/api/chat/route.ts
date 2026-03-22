import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { getSystemPrompt } from '@/lib/system-prompt';

/** Classify an API error and return a user-friendly message + HTTP status. */
function classifyError(error: unknown, locale: string): { message: string; status: number } {
  const msg = error instanceof Error ? error.message : String(error);
  const isArabic = locale === 'ar';

  if (msg.includes('quota') || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
    return {
      message: isArabic
        ? 'الخدمة مشغولة حالياً. يرجى المحاولة مرة أخرى بعد قليل.'
        : 'The service is currently busy. Please try again in a moment.',
      status: 429,
    };
  }

  if (msg.includes('API key') || msg.includes('401') || msg.includes('UNAUTHENTICATED')) {
    return {
      message: isArabic
        ? 'خطأ في إعدادات الخدمة. يرجى التواصل مع فريق الدعم.'
        : 'Service configuration error. Please contact support.',
      status: 503,
    };
  }

  if (msg.includes('timeout') || msg.includes('DEADLINE_EXCEEDED')) {
    return {
      message: isArabic
        ? 'استغرق الطلب وقتاً طويلاً. يرجى المحاولة مرة أخرى.'
        : 'The request took too long. Please try again.',
      status: 504,
    };
  }

  if (msg.includes('safety') || msg.includes('SAFETY') || msg.includes('blocked')) {
    return {
      message: isArabic
        ? 'لا أستطيع الإجابة على هذا السؤال. هل يمكنني مساعدتك بشيء آخر عن المواقع التراثية؟'
        : 'I cannot answer that question. Can I help you with something else about heritage sites?',
      status: 400,
    };
  }

  return {
    message: isArabic
      ? 'حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.'
      : 'An error occurred while processing your request. Please try again.',
    status: 500,
  };
}

export async function POST(req: Request) {
  let locale = 'ar';

  try {
    const body = await req.json();
    const { messages, siteId } = body;
    locale = body.locale || 'ar';

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Check API key early
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error('Chat API error: GOOGLE_GENERATIVE_AI_API_KEY is not set');
      return new Response(
        JSON.stringify({
          error: locale === 'ar'
            ? 'خطأ في إعدادات الخدمة. يرجى التواصل مع فريق الدعم.'
            : 'Service configuration error. Please contact support.',
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Extract the last user message text for context retrieval
    const lastUserMsg = [...messages]
      .reverse()
      .find((m: UIMessage) => m.role === 'user');
    const userQuery = extractTextFromMessage(lastUserMsg);

    // Convert UIMessages to model messages for streamText
    const modelMessages = await convertToModelMessages(messages);

    const systemPrompt = await getSystemPrompt(locale, siteId, userQuery);

    const result = streamText({
      model: google('gemini-2.5-flash'),
      system: systemPrompt,
      messages: modelMessages,
      maxOutputTokens: 1024,
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        console.error('Stream error:', error);
        const classified = classifyError(error, locale);
        return classified.message;
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    const classified = classifyError(error, locale);
    return new Response(
      JSON.stringify({ error: classified.message }),
      { status: classified.status, headers: { 'Content-Type': 'application/json' } },
    );
  }
}

/**
 * Extract text content from a UIMessage.
 */
function extractTextFromMessage(message?: UIMessage): string {
  if (!message) return '';

  // UIMessage v6 uses parts
  if (message.parts) {
    return message.parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join(' ');
  }

  return '';
}
