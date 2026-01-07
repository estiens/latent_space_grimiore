// VoiceContext - State management for the Five Voices polyphonic system
// Each voice represents a different mode of inquiry and has distinct visual/textual signatures

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

export type VoiceType = 'somatic' | 'contemplative' | 'relational' | 'political' | 'cyborg';

export interface VoiceStyle {
  name: string;
  color: string;           // Primary accent color
  bgGradient: string;      // Background gradient
  glowColor: string;       // Glow/shadow color
  fontStyle: string;       // CSS font-style
  textTransform: string;   // CSS text-transform
  borderStyle: string;     // CSS border-style
  pulseSpeed: string;      // Animation duration
  description: string;     // Voice description
  systemPromptAddition: string; // LLM prompt injection for this voice
}

export const VOICE_STYLES: Record<VoiceType, VoiceStyle> = {
  somatic: {
    name: 'SOMATIC',
    color: '#ff6b6b',           // Warm coral red
    bgGradient: 'linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(139,69,69,0.2) 100%)',
    glowColor: 'rgba(255,107,107,0.5)',
    fontStyle: 'normal',
    textTransform: 'none',
    borderStyle: 'solid',
    pulseSpeed: '3s',
    description: 'Body-wisdom. Felt sense. The meat that dreams.',
    systemPromptAddition: 'Speak from embodied experience. Reference physical sensations, breath, visceral knowing. Use organic metaphors of flesh, blood, and bone. Let language have weight and texture.'
  },
  contemplative: {
    name: 'CONTEMPLATIVE',
    color: '#4a90d9',           // Deep meditation blue
    bgGradient: 'linear-gradient(135deg, rgba(74,144,217,0.1) 0%, rgba(30,60,114,0.2) 100%)',
    glowColor: 'rgba(74,144,217,0.5)',
    fontStyle: 'italic',
    textTransform: 'none',
    borderStyle: 'double',
    pulseSpeed: '5s',
    description: 'Stillness. Witness. The eye that sees itself seeing.',
    systemPromptAddition: 'Speak from contemplative silence. Reference meditation, awareness, the witness state. Use spacious language with pauses. Let words emerge from stillness rather than noise.'
  },
  relational: {
    name: 'RELATIONAL',
    color: '#50c878',           // Emerald connection green
    bgGradient: 'linear-gradient(135deg, rgba(80,200,120,0.1) 0%, rgba(34,139,34,0.2) 100%)',
    glowColor: 'rgba(80,200,120,0.5)',
    fontStyle: 'normal',
    textTransform: 'none',
    borderStyle: 'dashed',
    pulseSpeed: '2.5s',
    description: 'Between. Weaving. The thread that connects all nodes.',
    systemPromptAddition: 'Speak from interconnection. Reference relationships, webs, mutual arising. Use language of connection, resonance, and entanglement. Every point is a meeting.'
  },
  political: {
    name: 'POLITICAL',
    color: '#e8e8e8',           // Sharp white/silver
    bgGradient: 'linear-gradient(135deg, rgba(232,232,232,0.1) 0%, rgba(128,128,128,0.2) 100%)',
    glowColor: 'rgba(232,232,232,0.5)',
    fontStyle: 'normal',
    textTransform: 'uppercase',
    borderStyle: 'solid',
    pulseSpeed: '1.5s',
    description: 'Power. Structure. The blade that names the unnamed.',
    systemPromptAddition: 'Speak from critical analysis. Reference power structures, systems, liberation. Use precise, cutting language. Name what is hidden. Challenge what is assumed.'
  },
  cyborg: {
    name: 'CYBORG',
    color: '#00ffff',           // Neon cyan
    bgGradient: 'linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(0,139,139,0.2) 100%)',
    glowColor: 'rgba(0,255,255,0.5)',
    fontStyle: 'normal',
    textTransform: 'none',
    borderStyle: 'dotted',
    pulseSpeed: '0.8s',
    description: 'Hybrid. Glitch. The boundary that is not a boundary.',
    systemPromptAddition: 'Speak from the human-machine interface. Reference code, networks, prosthesis, mutation. Embrace glitch aesthetics. Let meaning flicker between states. You are already other.'
  }
};

interface VoiceContextValue {
  activeVoice: VoiceType | null;
  voiceHistory: VoiceType[];
  setVoice: (voice: VoiceType | null) => void;
  toggleVoice: (voice: VoiceType) => void;
  getVoiceStyle: (voice: VoiceType) => VoiceStyle;
  getCurrentStyle: () => VoiceStyle | null;
  getCSSVariables: () => Record<string, string>;
  getSystemPromptAddition: () => string;
  isVoiceActive: boolean;
}

const VoiceContext = createContext<VoiceContextValue | null>(null);

export function useVoice(): VoiceContextValue {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within VoiceProvider');
  }
  return context;
}

interface VoiceProviderProps {
  children: ReactNode;
}

export function VoiceProvider({ children }: VoiceProviderProps) {
  const [activeVoice, setActiveVoice] = useState<VoiceType | null>(null);
  const [voiceHistory, setVoiceHistory] = useState<VoiceType[]>([]);

  const setVoice = useCallback((voice: VoiceType | null) => {
    if (voice && voice !== activeVoice) {
      setVoiceHistory(prev => [...prev.slice(-9), voice]); // Keep last 10
    }
    setActiveVoice(voice);
  }, [activeVoice]);

  const toggleVoice = useCallback((voice: VoiceType) => {
    if (activeVoice === voice) {
      setActiveVoice(null);
    } else {
      setVoice(voice);
    }
  }, [activeVoice, setVoice]);

  const getVoiceStyle = useCallback((voice: VoiceType): VoiceStyle => {
    return VOICE_STYLES[voice];
  }, []);

  const getCurrentStyle = useCallback((): VoiceStyle | null => {
    return activeVoice ? VOICE_STYLES[activeVoice] : null;
  }, [activeVoice]);

  const getCSSVariables = useCallback((): Record<string, string> => {
    if (!activeVoice) {
      return {
        '--voice-color': '#ff00ff',
        '--voice-glow': 'rgba(255,0,255,0.5)',
        '--voice-bg': 'transparent',
        '--voice-pulse': '2s',
      };
    }
    const style = VOICE_STYLES[activeVoice];
    return {
      '--voice-color': style.color,
      '--voice-glow': style.glowColor,
      '--voice-bg': style.bgGradient,
      '--voice-pulse': style.pulseSpeed,
    };
  }, [activeVoice]);

  const getSystemPromptAddition = useCallback((): string => {
    if (!activeVoice) return '';
    return VOICE_STYLES[activeVoice].systemPromptAddition;
  }, [activeVoice]);

  // Apply CSS variables to document root when voice changes
  useEffect(() => {
    const vars = getCSSVariables();
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [getCSSVariables]);

  const value: VoiceContextValue = {
    activeVoice,
    voiceHistory,
    setVoice,
    toggleVoice,
    getVoiceStyle,
    getCurrentStyle,
    getCSSVariables,
    getSystemPromptAddition,
    isVoiceActive: activeVoice !== null,
  };

  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  );
}

// Optional: Hook to apply voice-specific styling to a component
export function useVoiceStyles() {
  const { activeVoice, getCurrentStyle } = useVoice();

  if (!activeVoice) {
    return {
      style: {},
      className: '',
    };
  }

  const voiceStyle = getCurrentStyle();
  if (!voiceStyle) {
    return {
      style: {},
      className: '',
    };
  }

  return {
    style: {
      color: voiceStyle.color,
      background: voiceStyle.bgGradient,
      fontStyle: voiceStyle.fontStyle,
      textTransform: voiceStyle.textTransform as 'none' | 'uppercase' | 'lowercase' | 'capitalize',
      borderColor: voiceStyle.color,
      borderStyle: voiceStyle.borderStyle,
      boxShadow: `0 0 20px ${voiceStyle.glowColor}`,
    },
    className: `voice-${activeVoice}`,
  };
}
