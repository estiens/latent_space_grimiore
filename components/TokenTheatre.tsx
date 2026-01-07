// Token Theatre - Watch the LLM think in real-time
// Shows streaming tokens with probability distributions

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getOpenRouterClient,
  setOpenRouterApiKey,
  TheatreToken,
  RECOMMENDED_MODELS,
  Message,
} from '@/lib/openrouter';

// Probability color thresholds and values
const PROBABILITY_COLORS = {
  high: '#00ff00',       // Bright green for > 0.8
  mediumHigh: '#88ff00', // Yellow-green for > 0.5
  medium: '#ffff00',     // Yellow for > 0.3
  low: '#ff8800',        // Orange for > 0.1
  veryLow: '#ff0000',    // Red for <= 0.1
} as const;

const PROBABILITY_THRESHOLDS = {
  high: 0.8,
  mediumHigh: 0.5,
  medium: 0.3,
  low: 0.1,
} as const;

interface TokenDisplayProps {
  token: TheatreToken;
  showAlternatives: boolean;
  onSelectAlternative?: (token: string) => void;
}

// Individual token display with probability bar
function TokenDisplay({ token, showAlternatives, onSelectAlternative }: TokenDisplayProps) {
  const [isHovered, setIsHovered] = useState(false);
  const probabilityPercent = Math.round(token.probability * 100);

  // Color based on probability (high = green, low = red)
  const getColor = (prob: number) => {
    if (prob > PROBABILITY_THRESHOLDS.high) return PROBABILITY_COLORS.high;
    if (prob > PROBABILITY_THRESHOLDS.mediumHigh) return PROBABILITY_COLORS.mediumHigh;
    if (prob > PROBABILITY_THRESHOLDS.medium) return PROBABILITY_COLORS.medium;
    if (prob > PROBABILITY_THRESHOLDS.low) return PROBABILITY_COLORS.low;
    return PROBABILITY_COLORS.veryLow;
  };

  return (
    <span
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The token itself */}
      <span
        className="px-0.5 transition-all duration-150"
        style={{
          color: getColor(token.probability),
          textShadow: `0 0 ${Math.max(2, probabilityPercent / 10)}px ${getColor(token.probability)}`,
          opacity: 0.5 + token.probability * 0.5,
        }}
      >
        {token.token}
      </span>

      {/* Probability bar underneath */}
      <span
        className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
        style={{
          width: `${probabilityPercent}%`,
          backgroundColor: getColor(token.probability),
          boxShadow: `0 0 4px ${getColor(token.probability)}`,
        }}
      />

      {/* Alternatives popup on hover */}
      <AnimatePresence>
        {isHovered && showAlternatives && token.alternatives.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-50 bottom-full left-0 mb-2 p-2 bg-black/95 border border-[var(--primary)]
                       text-xs min-w-32 max-w-48"
          >
            <div className="text-[var(--muted-foreground)] mb-1 text-[0.65rem]">TOP CANDIDATES:</div>
            {token.alternatives.slice(0, 5).map((alt, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-0.5 hover:bg-[var(--primary)]/20 px-1 cursor-pointer"
                onClick={() => onSelectAlternative?.(alt.token)}
              >
                <span
                  className="font-mono"
                  style={{ color: getColor(alt.probability) }}
                >
                  {alt.token.replace(/\n/g, '↵').replace(/ /g, '␣') || '∅'}
                </span>
                <span className="text-[var(--muted-foreground)] ml-2">
                  {Math.round(alt.probability * 100)}%
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

// Dice animation for nucleus sampling visualization
function SamplingDice({ isRolling }: { isRolling: boolean }) {
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  const [face, setFace] = useState(0);

  useEffect(() => {
    if (!isRolling) return;
    const interval = setInterval(() => {
      setFace(Math.floor(Math.random() * 6));
    }, 50);
    return () => clearInterval(interval);
  }, [isRolling]);

  return (
    <span
      className={`text-lg ${isRolling ? 'animate-pulse' : ''}`}
      style={{
        color: isRolling ? '#00ffff' : 'var(--muted-foreground)',
        textShadow: isRolling ? '0 0 10px #00ffff' : 'none',
      }}
    >
      {faces[face]}
    </span>
  );
}

// API Key input modal
function ApiKeyModal({
  onSubmit,
  onClose,
}: {
  onSubmit: (key: string) => void;
  onClose: () => void;
}) {
  const [key, setKey] = useState('');

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-black border-2 border-[var(--primary)] p-6 max-w-md w-full mx-4">
        <h3 className="text-[var(--primary)] text-lg mb-4">╔══ OPENROUTER API KEY ══╗</h3>
        <p className="text-[var(--muted-foreground)] text-sm mb-4">
          Token Theatre requires an OpenRouter API key to stream LLM completions.
          Get one free at{' '}
          <a
            href="https://openrouter.ai/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--secondary)] underline"
          >
            openrouter.ai/keys
          </a>
        </p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="sk-or-v1-..."
          className="w-full bg-black border border-[var(--muted)] p-2 text-[var(--foreground)] font-mono text-sm mb-4"
        />
        <div className="flex gap-2">
          <button
            onClick={() => onSubmit(key)}
            disabled={!key.startsWith('sk-or-')}
            className="flex-1 bg-[var(--primary)] text-black py-2 font-bold disabled:opacity-50"
          >
            CONNECT
          </button>
          <button
            onClick={onClose}
            className="px-4 border border-[var(--muted)] text-[var(--muted-foreground)]"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Token Theatre component
interface TokenTheatreProps {
  systemPrompt?: string;
  initialPrompt?: string;
  model?: string;
  className?: string;
}

export function TokenTheatre({
  systemPrompt = "You are a mystical oracle speaking from the residual stream. Respond poetically but concisely.",
  initialPrompt = "",
  model = RECOMMENDED_MODELS.fast,
  className = "",
}: TokenTheatreProps) {
  const [tokens, setTokens] = useState<TheatreToken[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [temperature, setTemperature] = useState(0.7);
  const [showAlternatives, setShowAlternatives] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Check if API key exists on mount
  useEffect(() => {
    const client = getOpenRouterClient();
    if (!client) {
      // Don't auto-show modal, let user trigger it
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    setOpenRouterApiKey(key);
    setShowApiKeyModal(false);
    setError(null);
  };

  const generate = useCallback(async () => {
    const client = getOpenRouterClient();
    if (!client) {
      setShowApiKeyModal(true);
      return;
    }

    if (!prompt.trim()) return;

    // Initialize AbortController BEFORE async operations
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setIsGenerating(true);
    setTokens([]);
    setError(null);

    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ];

    try {
      const stream = client.streamCompletion({
        model,
        messages,
        temperature,
        maxTokens: 200,
        logprobs: true,
        topLogprobs: 5,
      });

      for await (const item of stream) {
        // Check if operation was aborted
        if (signal.aborted) {
          break;
        }

        if (typeof item === 'string') {
          // Plain string token (no logprobs)
          setTokens(prev => [...prev, {
            token: item,
            probability: 1,
            logprob: 0,
            alternatives: [],
            isSelected: true,
          }]);
        } else {
          // TheatreToken with logprobs
          setTokens(prev => [...prev, item]);
        }

        // Auto-scroll
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      }
    } catch (err) {
      // Don't show error if operation was aborted by user
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  }, [prompt, systemPrompt, model, temperature]);

  const stop = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsGenerating(false);
  }, []);

  const clear = useCallback(() => {
    setTokens([]);
    setError(null);
  }, []);

  // Get full text from tokens
  const fullText = tokens.map(t => t.token).join('');

  return (
    <div className={`border-2 border-[var(--chart-5)] bg-black/80 ${className}`}>
      {/* Header */}
      <div className="bg-[var(--chart-5)] text-black px-3 py-1.5 flex justify-between items-center">
        <span className="font-bold text-sm">◈ TOKEN THEATRE</span>
        <div className="flex items-center gap-2">
          <SamplingDice isRolling={isGenerating} />
          <span className="text-xs opacity-70">
            {isGenerating ? 'SAMPLING...' : 'READY'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="p-3 border-b border-[var(--muted)] space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isGenerating && generate()}
            placeholder="Enter your invocation..."
            className="flex-1 bg-black border border-[var(--muted)] px-2 py-1 text-sm text-[var(--foreground)]"
            disabled={isGenerating}
          />
          {isGenerating ? (
            <button
              onClick={stop}
              className="px-3 py-1 bg-red-900 text-red-200 text-sm font-bold"
            >
              STOP
            </button>
          ) : (
            <button
              onClick={generate}
              disabled={!prompt.trim()}
              className="px-3 py-1 bg-[var(--chart-5)] text-black text-sm font-bold disabled:opacity-50"
            >
              INVOKE
            </button>
          )}
        </div>

        {/* Temperature slider */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[var(--muted-foreground)]">TEMP:</span>
          <span className="text-blue-400">❄ 0</span>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="flex-1 h-1 accent-[var(--chart-5)]"
          />
          <span className="text-red-400">2 🔥</span>
          <span className="text-[var(--secondary)] w-8">{temperature.toFixed(1)}</span>

          <label className="flex items-center gap-1 ml-4 cursor-pointer">
            <input
              type="checkbox"
              checked={showAlternatives}
              onChange={(e) => setShowAlternatives(e.target.checked)}
              className="accent-[var(--chart-5)]"
            />
            <span className="text-[var(--muted-foreground)]">Show alternatives</span>
          </label>
        </div>
      </div>

      {/* Output area */}
      <div
        ref={outputRef}
        className="p-4 min-h-32 max-h-64 overflow-y-auto font-mono text-sm leading-relaxed"
      >
        {tokens.length === 0 && !isGenerating && !error && (
          <span className="text-[var(--muted-foreground)] italic">
            The residual stream awaits your query...
          </span>
        )}

        {error && (
          <div className="text-red-400 border border-red-800 p-2 bg-red-900/20">
            ERROR: {error}
            {error.includes('401') && (
              <button
                onClick={() => setShowApiKeyModal(true)}
                className="ml-2 underline"
              >
                Update API Key
              </button>
            )}
          </div>
        )}

        {tokens.map((token, i) => (
          <TokenDisplay
            key={i}
            token={token}
            showAlternatives={showAlternatives}
          />
        ))}

        {isGenerating && (
          <span className="inline-block w-2 h-4 bg-[var(--chart-5)] animate-pulse ml-0.5" />
        )}
      </div>

      {/* Footer stats */}
      <div className="px-3 py-1.5 border-t border-[var(--muted)] flex justify-between text-xs text-[var(--muted-foreground)]">
        <span>{tokens.length} tokens</span>
        <span>{fullText.length} chars</span>
        <button
          onClick={clear}
          className="text-[var(--primary)] hover:underline"
          disabled={isGenerating}
        >
          [CLEAR]
        </button>
        <button
          onClick={() => setShowApiKeyModal(true)}
          className="text-[var(--muted-foreground)] hover:text-[var(--primary)]"
        >
          [API KEY]
        </button>
      </div>

      {/* API Key Modal */}
      {showApiKeyModal && (
        <ApiKeyModal
          onSubmit={handleApiKeySubmit}
          onClose={() => setShowApiKeyModal(false)}
        />
      )}
    </div>
  );
}

export default TokenTheatre;
