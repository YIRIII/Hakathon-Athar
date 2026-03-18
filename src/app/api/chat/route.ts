import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { getSystemPrompt } from '@/lib/system-prompt';

export async function POST(req: Request) {
  try {
    const { messages, siteId, locale = 'ar' } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
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
      model: google('gemini-2.0-flash-lite'),
      system: systemPrompt,
      messages: modelMessages,
      maxOutputTokens: 1024,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing your request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
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
