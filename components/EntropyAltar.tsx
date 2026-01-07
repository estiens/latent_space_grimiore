// Entropy Altar - Temperature as the Geburah-Chesed Oscillation
// Interactive visualization of how temperature affects generation

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  getOpenRouterClient,
  setOpenRouterApiKey,
  RECOMMENDED_MODELS,
  Message,
} from '@/lib/openrouter';

// Probability distribution visualization
interface DistributionBarProps {
  probabilities: number[];
  labels: string[];
  highlightIndex?: number;
}

function DistributionBars({ probabilities, labels, highlightIndex }: DistributionBarProps) {
  const maxProb = Math.max(...probabilities, 0.01);

  return (
    <div className="flex items-end gap-1 h-24">
      {probabilities.map((prob, i) => {
        const height = (prob / maxProb) * 100;
        const isHighlight = i === highlightIndex;

        return (
          <div key={i} className="flex-1 flex flex-col items-center">
            <motion.div
              className="w-full rounded-t"
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: isHighlight ? '#00ffff' : `hsl(${280 - i * 30}, 70%, 50%)`,
                boxShadow: isHighlight ? '0 0 10px #00ffff' : 'none',
                minHeight: prob > 0 ? '2px' : '0',
              }}
            />
            <span className="text-[0.5rem] text-[var(--muted-foreground)] mt-1 truncate w-full text-center">
              {labels[i]?.slice(0, 6) || '...'}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// Temperature dial visualization
interface TemperatureDialProps {
  temperature: number;
  onChange: (temp: number) => void;
}

function TemperatureDial({ temperature, onChange }: TemperatureDialProps) {
  const dialRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: MouseEvent | TouchEvent) => {
    if (!dialRef.current) return;

    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const angle = Math.atan2(clientY - centerY, clientX - centerX);
    // Map angle (-PI to PI) to temperature (0 to 2)
    // Left side (-PI) = 0, Right side (PI) = 2
    const normalizedAngle = (angle + Math.PI) / (2 * Math.PI);
    const temp = Math.max(0, Math.min(2, normalizedAngle * 2));
    onChange(Math.round(temp * 20) / 20); // Round to 0.05
  }, [onChange]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent | TouchEvent) => handleDrag(e);
    const handleUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, handleDrag]);

  // Calculate dial rotation (-135deg at 0, +135deg at 2)
  const rotation = -135 + (temperature / 2) * 270;

  // Color gradient from blue (cold/Geburah) to red (hot/Chesed)
  const hue = 240 - (temperature / 2) * 240; // 240 (blue) to 0 (red)

  return (
    <div
      ref={dialRef}
      className="relative w-40 h-40 cursor-pointer select-none"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* Background ring */}
      <div
        className="absolute inset-2 rounded-full border-4"
        style={{
          borderColor: `hsl(${hue}, 70%, 50%)`,
          boxShadow: `0 0 20px hsla(${hue}, 70%, 50%, 0.5), inset 0 0 20px hsla(${hue}, 70%, 50%, 0.2)`,
        }}
      />

      {/* Tick marks */}
      {[0, 0.5, 1, 1.5, 2].map((tick) => {
        const angle = -135 + (tick / 2) * 270;
        return (
          <div
            key={tick}
            className="absolute w-1 h-3 bg-[var(--muted-foreground)] origin-bottom"
            style={{
              left: '50%',
              bottom: '50%',
              transform: `translateX(-50%) rotate(${angle}deg) translateY(-60px)`,
            }}
          />
        );
      })}

      {/* Needle */}
      <motion.div
        className="absolute left-1/2 bottom-1/2 w-1 h-14 origin-bottom"
        style={{
          backgroundColor: `hsl(${hue}, 70%, 60%)`,
          boxShadow: `0 0 10px hsl(${hue}, 70%, 50%)`,
        }}
        animate={{ rotate: rotation }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      />

      {/* Center cap */}
      <div
        className="absolute left-1/2 top-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundColor: `hsl(${hue}, 70%, 40%)`,
          boxShadow: `0 0 15px hsl(${hue}, 70%, 50%)`,
        }}
      />

      {/* Labels */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-blue-400 text-xs font-bold">
        GEBURAH
      </div>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-red-400 text-xs font-bold">
        CHESED
      </div>

      {/* Temperature value */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-2 text-center">
        <div className="text-2xl font-bold" style={{ color: `hsl(${hue}, 70%, 60%)` }}>
          {temperature.toFixed(2)}
        </div>
        <div className="text-xs text-[var(--muted-foreground)]">TEMPERATURE</div>
      </div>
    </div>
  );
}

// Sample outputs at different temperatures
interface SampleOutput {
  temp: number;
  text: string;
}

// API Key Modal (reused)
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
          The Entropy Altar requires an OpenRouter API key to demonstrate temperature effects.
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

// Main component
interface EntropyAltarProps {
  className?: string;
}

export function EntropyAltar({ className = '' }: EntropyAltarProps) {
  const [temperature, setTemperature] = useState(0.7);
  const [prompt, setPrompt] = useState('Complete this thought: The nature of creativity is');
  const [samples, setSamples] = useState<SampleOutput[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulated probability distribution that changes with temperature
  const getSimulatedDistribution = (temp: number): { probs: number[]; labels: string[] } => {
    // At low temp: sharp peak at one token
    // At high temp: more uniform distribution
    const baseProbs = [0.6, 0.2, 0.1, 0.05, 0.03, 0.02];
    const labels = ['the', 'a', 'an', 'that', 'which', 'one'];

    // Flatten distribution as temp increases
    const flatness = temp / 2; // 0 to 1
    const flattened = baseProbs.map((p, _i) => {
      const uniform = 1 / baseProbs.length;
      return p * (1 - flatness) + uniform * flatness;
    });

    // Normalize
    const sum = flattened.reduce((a, b) => a + b, 0);
    return {
      probs: flattened.map(p => p / sum),
      labels,
    };
  };

  const distribution = getSimulatedDistribution(temperature);

  const handleApiKeySubmit = (key: string) => {
    setOpenRouterApiKey(key);
    setShowApiKeyModal(false);
    setError(null);
  };

  const generateSample = useCallback(async () => {
    const client = getOpenRouterClient();
    if (!client) {
      setShowApiKeyModal(true);
      return;
    }

    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    const messages: Message[] = [
      { role: 'user', content: prompt },
    ];

    try {
      const response = await client.complete({
        model: RECOMMENDED_MODELS.fast,
        messages,
        temperature,
        maxTokens: 60,
      });

      setSamples(prev => [
        { temp: temperature, text: response },
        ...prev.slice(0, 4), // Keep last 5
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, temperature]);

  // Generate comparison at multiple temperatures
  const generateComparison = useCallback(async () => {
    const client = getOpenRouterClient();
    if (!client) {
      setShowApiKeyModal(true);
      return;
    }

    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setSamples([]);

    const temps = [0.0, 0.5, 1.0, 1.5, 2.0];
    const messages: Message[] = [
      { role: 'user', content: prompt },
    ];

    try {
      for (const temp of temps) {
        const response = await client.complete({
          model: RECOMMENDED_MODELS.fast,
          messages,
          temperature: temp,
          maxTokens: 50,
        });

        setSamples(prev => [...prev, { temp, text: response }]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  }, [prompt]);

  return (
    <div className={`border-2 border-[var(--secondary)] bg-black/80 ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-red-900 text-white px-4 py-2 flex justify-between items-center">
        <span className="font-bold">◈ ENTROPY ALTAR</span>
        <span className="text-xs opacity-70">Geburah ↔ Chesed Oscillation</span>
      </div>

      <div className="p-4 space-y-6">
        {/* Temperature dial and distribution */}
        <div className="flex flex-col md:flex-row items-center justify-around gap-6">
          <TemperatureDial temperature={temperature} onChange={setTemperature} />

          <div className="flex-1 max-w-xs">
            <div className="text-xs text-[var(--muted-foreground)] mb-2 text-center">
              PROBABILITY DISTRIBUTION (simulated)
            </div>
            <DistributionBars
              probabilities={distribution.probs}
              labels={distribution.labels}
              highlightIndex={0}
            />
            <div className="text-xs text-center mt-2">
              <span className="text-blue-400">Low temp = sharp peak</span>
              {' • '}
              <span className="text-red-400">High temp = flat distribution</span>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="text-sm text-[var(--muted-foreground)] p-3 bg-[rgba(0,0,0,0.3)] border border-[var(--muted)]">
          <strong className="text-[var(--secondary)]">The Engine of Generativity:</strong>{' '}
          Temperature controls the balance between <span className="text-blue-400">Geburah</span> (constraint, low entropy, predictable) and{' '}
          <span className="text-red-400">Chesed</span> (expansion, high entropy, creative chaos).
          At 0, the model always picks the most likely token. At 2, it samples more uniformly from possibilities.
        </div>

        {/* Prompt input */}
        <div className="space-y-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a prompt to complete..."
            className="w-full bg-black border border-[var(--muted)] px-3 py-2 text-sm text-[var(--foreground)]"
          />
          <div className="flex gap-2">
            <button
              onClick={generateSample}
              disabled={isGenerating || !prompt.trim()}
              className="flex-1 bg-[var(--secondary)] text-black py-2 font-bold disabled:opacity-50"
            >
              {isGenerating ? 'GENERATING...' : `SAMPLE @ ${temperature.toFixed(1)}`}
            </button>
            <button
              onClick={generateComparison}
              disabled={isGenerating || !prompt.trim()}
              className="px-4 border border-[var(--secondary)] text-[var(--secondary)] disabled:opacity-50"
            >
              COMPARE ALL
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-400 border border-red-800 p-2 bg-red-900/20 text-sm">
            {error}
          </div>
        )}

        {/* Sample outputs */}
        {samples.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs text-[var(--muted-foreground)]">GENERATED SAMPLES:</div>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {samples.map((sample, i) => {
                const hue = 240 - (sample.temp / 2) * 240;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-2 border text-sm"
                    style={{
                      borderColor: `hsl(${hue}, 50%, 40%)`,
                      backgroundColor: `hsla(${hue}, 50%, 20%, 0.2)`,
                    }}
                  >
                    <span
                      className="text-xs font-bold mr-2"
                      style={{ color: `hsl(${hue}, 70%, 60%)` }}
                    >
                      T={sample.temp.toFixed(1)}:
                    </span>
                    <span className="text-[var(--foreground)]">{sample.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-xs text-[var(--muted-foreground)] flex justify-between">
          <span>Drag the dial or click positions to adjust temperature</span>
          <button
            onClick={() => setShowApiKeyModal(true)}
            className="text-[var(--primary)] hover:underline"
          >
            [API KEY]
          </button>
        </div>
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

export default EntropyAltar;
