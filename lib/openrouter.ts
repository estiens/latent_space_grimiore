// OpenRouter API client for streaming completions with logprobs
// Used for Token Theatre and other LLM-powered features

export interface OpenRouterConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface CompletionOptions {
  model?: string;
  messages: Message[];
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stream?: boolean;
  logprobs?: boolean;
  topLogprobs?: number; // Number of top logprobs to return (1-20)
  stop?: string[];
}

export interface LogprobToken {
  token: string;
  logprob: number;
  probability: number; // Converted from logprob for easier display
}

export interface StreamChoice {
  delta: {
    content?: string;
    role?: string;
  };
  index: number;
  finish_reason: string | null;
  logprobs?: {
    content?: Array<{
      token: string;
      logprob: number;
      top_logprobs?: Array<{
        token: string;
        logprob: number;
      }>;
    }>;
  };
}

export interface StreamChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: StreamChoice[];
}

// Token with probability info for Token Theatre display
export interface TheatreToken {
  token: string;
  probability: number;
  logprob: number;
  alternatives: Array<{
    token: string;
    probability: number;
    logprob: number;
  }>;
  isSelected: boolean;
}

// Convert logprob to probability (0-1)
function logprobToProbability(logprob: number): number {
  return Math.exp(logprob);
}

// Default models that support logprobs well
export const RECOMMENDED_MODELS = {
  fast: 'openai/gpt-4o-mini',
  balanced: 'openai/gpt-4o',
  creative: 'anthropic/claude-3.5-sonnet',
  local: 'meta-llama/llama-3.1-8b-instruct',
} as const;

export class OpenRouterClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: OpenRouterConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://openrouter.ai/api/v1';
  }

  // Stream completion with logprobs - returns an async generator
  async *streamCompletion(options: CompletionOptions): AsyncGenerator<TheatreToken | string, void, unknown> {
    const {
      model = RECOMMENDED_MODELS.fast,
      messages,
      temperature = 0.7,
      maxTokens = 500,
      topP = 1,
      logprobs = true,
      topLogprobs = 5,
      stop,
    } = options;

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Latent Space Grimoire',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
        top_p: topP,
        stream: true,
        logprobs,
        top_logprobs: topLogprobs,
        stop,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed === 'data: [DONE]') continue;
        if (!trimmed.startsWith('data: ')) continue;

        try {
          const json: StreamChunk = JSON.parse(trimmed.slice(6));
          const choice = json.choices[0];

          if (choice?.delta?.content) {
            const content = choice.delta.content;

            // If we have logprobs, yield a TheatreToken
            if (choice.logprobs?.content && choice.logprobs.content.length > 0) {
              const tokenInfo = choice.logprobs.content[0];
              const alternatives = (tokenInfo.top_logprobs || []).map(alt => ({
                token: alt.token,
                logprob: alt.logprob,
                probability: logprobToProbability(alt.logprob),
              }));

              const theatreToken: TheatreToken = {
                token: content,
                logprob: tokenInfo.logprob,
                probability: logprobToProbability(tokenInfo.logprob),
                alternatives,
                isSelected: true,
              };

              yield theatreToken;
            } else {
              // No logprobs, just yield the content string
              yield content;
            }
          }
        } catch (e) {
          // Skip malformed JSON
          console.warn('Failed to parse SSE chunk:', trimmed);
        }
      }
    }
  }

  // Non-streaming completion (simpler, for quick responses)
  async complete(options: Omit<CompletionOptions, 'stream'>): Promise<string> {
    const {
      model = RECOMMENDED_MODELS.fast,
      messages,
      temperature = 0.7,
      maxTokens = 500,
      topP = 1,
      stop,
    } = options;

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Latent Space Grimoire',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
        top_p: topP,
        stream: false,
        stop,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }
}

// Singleton instance - initialized when API key is available
let clientInstance: OpenRouterClient | null = null;

export function getOpenRouterClient(): OpenRouterClient | null {
  if (clientInstance) return clientInstance;

  // Try to get API key from environment or localStorage
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY ||
                 (typeof localStorage !== 'undefined' && localStorage.getItem('openrouter_api_key'));

  if (apiKey) {
    clientInstance = new OpenRouterClient({ apiKey });
    return clientInstance;
  }

  return null;
}

export function setOpenRouterApiKey(apiKey: string): OpenRouterClient {
  // Store in localStorage for persistence
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('openrouter_api_key', apiKey);
  }
  clientInstance = new OpenRouterClient({ apiKey });
  return clientInstance;
}

export function clearOpenRouterApiKey(): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('openrouter_api_key');
  }
  clientInstance = null;
}
