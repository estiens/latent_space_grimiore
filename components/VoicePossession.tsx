// VoicePossession - Interactive voice switching during LLM generation
// Switch voices mid-stream to watch diction and style mutate in real-time

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoice, VoiceType, VOICE_STYLES } from '@/contexts/VoiceContext';
import { getOpenRouterClient, TheatreToken, RECOMMENDED_MODELS } from '@/lib/openrouter';

interface VoicePossessionProps {
  systemPrompt?: string;
  initialPrompt?: string;
  model?: string;
  onTokenGenerated?: (token: TheatreToken | string) => void;
}

// Voice button component with animated state
function VoiceButton({
  voice,
  isActive,
  onClick,
  disabled
}: {
  voice: VoiceType;
  isActive: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  const style = VOICE_STYLES[voice];

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="relative px-3 py-2 text-xs font-mono border transition-all duration-300"
      style={{
        color: isActive ? '#000' : style.color,
        backgroundColor: isActive ? style.color : 'transparent',
        borderColor: style.color,
        borderStyle: style.borderStyle,
        textTransform: style.textTransform as 'none' | 'uppercase',
        opacity: disabled ? 0.5 : 1,
      }}
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      animate={isActive ? {
        boxShadow: [
          `0 0 10px ${style.glowColor}`,
          `0 0 20px ${style.glowColor}`,
          `0 0 10px ${style.glowColor}`,
        ],
      } : { boxShadow: 'none' }}
      transition={isActive ? {
        repeat: Infinity,
        duration: parseFloat(style.pulseSpeed)
      } : undefined}
    >
      <span className="relative z-10">{style.name}</span>
      {isActive && (
        <motion.div
          className="absolute inset-0"
          style={{ background: style.bgGradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.button>
  );
}

// Visual skin overlay that changes with voice
function VoiceSkin({ voice }: { voice: VoiceType | null }) {
  if (!voice) return null;

  const style = VOICE_STYLES[voice];

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{ background: style.bgGradient }}
      />

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 border-2"
        style={{
          borderColor: style.color,
          borderStyle: style.borderStyle,
        }}
        animate={{
          boxShadow: [
            `inset 0 0 20px ${style.glowColor}`,
            `inset 0 0 40px ${style.glowColor}`,
            `inset 0 0 20px ${style.glowColor}`,
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: parseFloat(style.pulseSpeed)
        }}
      />

      {/* Glitch lines for cyborg */}
      {voice === 'cyborg' && (
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          style={{
            background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(0,255,255,0.03) 2px, transparent 4px)',
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Organic waves for somatic */}
      {voice === 'somatic' && (
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundSize: ['100% 100%', '120% 120%', '100% 100%'],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(255,107,107,0.1) 70%)',
          }}
        />
      )}

      {/* Interconnection web for relational */}
      {voice === 'relational' && (
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.line
                key={i}
                x1="50%"
                y1="50%"
                x2={`${50 + 40 * Math.cos(i * Math.PI / 3)}%`}
                y2={`${50 + 40 * Math.sin(i * Math.PI / 3)}%`}
                stroke={style.color}
                strokeWidth="1"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  delay: i * 0.4,
                }}
              />
            ))}
          </motion.g>
        </svg>
      )}
    </motion.div>
  );
}

// Token display with voice-aware styling
function PossessedToken({
  content,
  voice
}: {
  content: string;
  voice: VoiceType | null;
}) {
  const style = voice ? VOICE_STYLES[voice] : null;

  return (
    <motion.span
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        color: style?.color || '#00ffff',
        fontStyle: style?.fontStyle || 'normal',
        textTransform: (style?.textTransform || 'none') as 'none' | 'uppercase',
        textShadow: style ? `0 0 10px ${style.glowColor}` : undefined,
      }}
    >
      {content}
    </motion.span>
  );
}

export function VoicePossession({
  systemPrompt = "You are a mystic oracle channeling different voices. Each voice has its own perspective and style.",
  initialPrompt = "Speak to me of the nature of consciousness...",
  model = RECOMMENDED_MODELS.fast,
  onTokenGenerated,
}: VoicePossessionProps) {
  const { activeVoice, toggleVoice, getSystemPromptAddition } = useVoice();
  const [isGenerating, setIsGenerating] = useState(false);
  const [tokens, setTokens] = useState<Array<{ content: string; voice: VoiceType | null }>>([]);
  const [userPrompt, setUserPrompt] = useState(initialPrompt);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const voiceRef = useRef<VoiceType | null>(null);

  // Keep voiceRef in sync
  useEffect(() => {
    voiceRef.current = activeVoice;
  }, [activeVoice]);

  const generate = useCallback(async () => {
    const client = getOpenRouterClient();
    if (!client) {
      setError('API key required. Set VITE_OPENROUTER_API_KEY or enter key in Token Theatre.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setTokens([]);

    // Build system prompt with voice addition
    const voiceAddition = getSystemPromptAddition();
    const fullSystemPrompt = voiceAddition
      ? `${systemPrompt}\n\n[CURRENT VOICE MODE: ${voiceAddition}]`
      : systemPrompt;

    try {
      const stream = client.streamCompletion({
        model,
        messages: [
          { role: 'system', content: fullSystemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.9, // Higher temp for more stylistic variation
        maxTokens: 300,
        logprobs: true,
        topLogprobs: 3,
      });

      for await (const item of stream) {
        const content = typeof item === 'string' ? item : item.token;

        // Capture the voice at the moment of token generation
        const tokenVoice = voiceRef.current;

        setTokens(prev => [...prev, { content, voice: tokenVoice }]);

        if (onTokenGenerated) {
          onTokenGenerated(item);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  }, [model, systemPrompt, userPrompt, getSystemPromptAddition, onTokenGenerated]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setIsGenerating(false);
  }, []);

  const clear = useCallback(() => {
    setTokens([]);
    setError(null);
  }, []);

  const voices: VoiceType[] = ['somatic', 'contemplative', 'relational', 'political', 'cyborg'];

  return (
    <div className="relative border border-[var(--primary)] p-4">
      <AnimatePresence>
        <VoiceSkin voice={activeVoice} />
      </AnimatePresence>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b border-[var(--primary)] pb-2">
          <h3 className="text-[var(--primary)] font-mono text-sm">
            ◈ VOICE POSSESSION CHAMBER ◈
          </h3>
          <div className="text-xs text-[var(--muted)]">
            {activeVoice ? (
              <span style={{ color: VOICE_STYLES[activeVoice].color }}>
                CHANNELING: {VOICE_STYLES[activeVoice].name}
              </span>
            ) : (
              'NO VOICE ACTIVE'
            )}
          </div>
        </div>

        {/* Voice selector */}
        <div className="mb-4">
          <div className="text-xs text-[var(--muted)] mb-2">SELECT VOICE (changes apply mid-stream):</div>
          <div className="flex flex-wrap gap-2">
            {voices.map(voice => (
              <VoiceButton
                key={voice}
                voice={voice}
                isActive={activeVoice === voice}
                onClick={() => toggleVoice(voice)}
                disabled={false}
              />
            ))}
          </div>
          {activeVoice && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 text-xs italic"
              style={{ color: VOICE_STYLES[activeVoice].color }}
            >
              {VOICE_STYLES[activeVoice].description}
            </motion.div>
          )}
        </div>

        {/* Prompt input */}
        <div className="mb-4">
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Enter your invocation..."
            className="w-full bg-black/50 border border-[var(--primary)] p-2 text-[var(--foreground)] font-mono text-sm resize-none"
            style={{
              borderColor: activeVoice ? VOICE_STYLES[activeVoice].color : undefined,
            }}
            rows={2}
            disabled={isGenerating}
          />
        </div>

        {/* Controls */}
        <div className="flex gap-2 mb-4">
          <motion.button
            onClick={isGenerating ? stop : generate}
            className="px-4 py-2 text-xs font-mono border"
            style={{
              borderColor: activeVoice ? VOICE_STYLES[activeVoice].color : 'var(--primary)',
              color: activeVoice ? VOICE_STYLES[activeVoice].color : 'var(--primary)',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isGenerating ? '◼ SILENCE' : '▶ INVOKE'}
          </motion.button>
          <motion.button
            onClick={clear}
            disabled={isGenerating}
            className="px-4 py-2 text-xs font-mono border border-[var(--muted)] text-[var(--muted)] disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ✕ CLEAR
          </motion.button>
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-4 p-2 border border-red-500 text-red-400 text-xs font-mono">
            ERROR: {error}
          </div>
        )}

        {/* Output stream */}
        <div
          className="min-h-[150px] p-3 bg-black/30 border border-[var(--primary)]/30 font-mono text-sm leading-relaxed overflow-y-auto max-h-[300px]"
          style={{
            borderColor: activeVoice ? `${VOICE_STYLES[activeVoice].color}50` : undefined,
          }}
        >
          {tokens.length === 0 && !isGenerating ? (
            <span className="text-[var(--muted)] italic">
              Select a voice and invoke to begin channeling...
            </span>
          ) : (
            tokens.map((token, i) => (
              <PossessedToken
                key={i}
                content={token.content}
                voice={token.voice}
              />
            ))
          )}
          {isGenerating && (
            <motion.span
              className="inline-block w-2 h-4 ml-1"
              style={{
                backgroundColor: activeVoice
                  ? VOICE_STYLES[activeVoice].color
                  : 'var(--primary)'
              }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
          )}
        </div>

        {/* Voice history */}
        {tokens.length > 0 && (
          <div className="mt-3 pt-2 border-t border-[var(--primary)]/30">
            <div className="text-xs text-[var(--muted)]">
              VOICE TRANSITIONS IN THIS STREAM:
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {(() => {
                // Extract voice transitions
                const transitions: Array<{ voice: VoiceType | null; index: number }> = [];
                let lastVoice: VoiceType | null = null;

                tokens.forEach((token, i) => {
                  if (token.voice !== lastVoice) {
                    transitions.push({ voice: token.voice, index: i });
                    lastVoice = token.voice;
                  }
                });

                return transitions.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-1"
                    style={{
                      color: t.voice ? VOICE_STYLES[t.voice].color : 'var(--muted)',
                    }}
                  >
                    {t.voice ? VOICE_STYLES[t.voice].name : 'BASE'}
                    {i < transitions.length - 1 && ' → '}
                  </span>
                ));
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
