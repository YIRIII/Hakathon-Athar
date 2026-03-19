/**
 * Langfuse LLM Tracing
 *
 * Traces chatbot interactions: token usage, latency, and response quality.
 * Only active when LANGFUSE_SECRET_KEY is configured.
 */

import { Langfuse } from 'langfuse';

let langfuseInstance: Langfuse | null = null;

export function getLangfuse(): Langfuse | null {
  if (!process.env.LANGFUSE_SECRET_KEY || !process.env.LANGFUSE_PUBLIC_KEY) {
    return null;
  }

  if (!langfuseInstance) {
    langfuseInstance = new Langfuse({
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      baseUrl: process.env.LANGFUSE_BASE_URL || 'https://cloud.langfuse.com',
    });
  }

  return langfuseInstance;
}

/**
 * Trace a chatbot generation (call in the chat API route).
 */
export function traceGeneration(params: {
  traceId: string;
  input: string;
  output: string;
  model: string;
  locale: string;
  siteId?: string;
  durationMs: number;
  inputTokens?: number;
  outputTokens?: number;
}) {
  const langfuse = getLangfuse();
  if (!langfuse) return;

  const trace = langfuse.trace({
    id: params.traceId,
    name: 'heritage-chat',
    metadata: {
      locale: params.locale,
      siteId: params.siteId,
    },
    input: params.input,
    output: params.output,
  });

  trace.generation({
    name: 'gemini-chat',
    model: params.model,
    input: params.input,
    output: params.output,
    usage: {
      input: params.inputTokens,
      output: params.outputTokens,
    },
    metadata: {
      durationMs: params.durationMs,
      locale: params.locale,
    },
  });
}
