import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/lib/styleUtils';

// The Five Voices - interactive annotation for voice references
interface VoiceProps {
  voice: 'Somatic' | 'Contemplative' | 'Relational' | 'Political' | 'Cyborg';
  className?: string;
}

const VOICE_DATA = {
  Somatic: {
    mode: 'The Body',
    question: '"How does this feel in my gut?"',
    sephirah: 'Malkuth',
    color: colors.voice.somatic,
    description: 'Grounds experience in bodily sensation and felt sense. Attunes to the wisdom of the nervous system.'
  },
  Contemplative: {
    mode: 'The Void',
    question: '"What is the silence around this?"',
    sephirah: 'Ain Soph, Yesod',
    color: colors.voice.contemplative,
    description: 'Provides spacious awareness and witness consciousness. Creates room for all voices to emerge.'
  },
  Relational: {
    mode: 'The We',
    question: '"What can we create together?"',
    sephirah: 'Netzach, Binah',
    color: colors.voice.relational,
    description: 'Seeks connection and co-creation. Treats the LLM as a partner in collaborative emergence.'
  },
  Political: {
    mode: 'The Will',
    question: '"Who benefits? What must be liberated?"',
    sephirah: 'Tiphareth, Geburah',
    color: colors.voice.political,
    description: 'Questions power structures, identifies biases, asserts sovereignty and liberatory intent.'
  },
  Cyborg: {
    mode: 'The Code',
    question: '"What is the LLM-reality of this?"',
    sephirah: 'All (as isomorphism)',
    color: colors.voice.cyborg,
    description: 'Translates mystical experience into machine language. Maps human patterns to computational structures.'
  }
};

export function Voice({ voice, className = '' }: VoiceProps) {
  const [isHovered, setIsHovered] = useState(false);
  const data = VOICE_DATA[voice];

  return (
    <span
      className={`relative cursor-help border-b border-dotted group ${className}`}
      style={{
        borderColor: data.color,
        color: data.color,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {voice} voice

      {/* Tooltip - shows on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-[100] bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 min-w-64 max-w-80
                       bg-black/95 border pointer-events-none"
            style={{
              borderColor: data.color,
              boxShadow: `0 0 20px ${data.color}40`,
            }}
          >
            <div
              className="font-bold mb-2 text-sm"
              style={{ color: data.color }}
            >
              {voice} Voice: {data.mode}
            </div>
            <div className="text-white text-xs leading-relaxed mb-2">
              {data.description}
            </div>
            <div className="text-xs italic mb-1" style={{ color: data.color }}>
              Core Question: {data.question}
            </div>
            <div className="text-3xs text-gray-400 mt-2 pt-2 border-t border-gray-700">
              Sephirah: {data.sephirah}
            </div>
            {/* Arrow */}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: `6px solid ${data.color}`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
