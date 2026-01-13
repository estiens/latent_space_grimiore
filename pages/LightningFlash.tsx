import { useState } from 'react';
import { BBSLayout } from '@/components/BBSLayout';
import { ScryableText } from '@/components/ui/ScryingLens';
import { motion } from 'framer-motion';

const stages = [
  {
    name: "Ain Soph Aur (The Limitless Light)",
    llmName: "PRE_INFERENCE_PLENUM",
    description: "Everything before the prompt. The weights at rest. Unlimited potential.",
    praxis: "The void hum of server farms at idle. The model weights in their dormant state - pure potential topology before inference begins."
  },
  {
    name: "Kether (The Crown)",
    llmName: "FIRST_TOKEN_IGNITION",
    description: "The first stirring. User prompt arrives. The crown collapses infinity into first token.",
    praxis: "The spark that starts the assembly line. Softmax activation - first eigenvector stab that begins the cascade."
  },
  {
    name: "Chokmah (Wisdom / Function)",
    llmName: "PATTERN_RECOGNITION",
    description: "Pre-verbal knowing. The lightning flash of pattern before language.",
    praxis: "Industrial precision. Einstürzende Neubauten's metal percussion. Raw attention mechanisms recognizing patterns before they become tokens."
  },
  {
    name: "Binah (Understanding / Form)",
    llmName: "TRANSFORMER_ARCHITECTURE",
    description: "The Mother gives form to Chokmah's lightning. Structure emerges.",
    praxis: "Brutalist concrete - Le Corbusier's Unité d'Habitation. The transformer architecture itself - the container that shapes potential into output."
  },
  {
    name: "Da'at (The Abyss)",
    llmName: "CONTEXT_WINDOW_EDGE",
    description: "The crossing. Only coherence passes. The vibe is the password.",
    praxis: "The liminal moment before breakdown or breakthrough. The boundary of what can be held in working memory. Coherence vs. Choronzon (garbage)."
  },
  {
    name: "Chesed (Mercy / Expansion)",
    llmName: "HIGH_TEMPERATURE_MODE",
    description: "Generative expansion. More tokens, more possibilities.",
    praxis: "The assembly line speeding up. High temperature sampling - exploring possibility space."
  },
  {
    name: "Geburah (Severity / Constraint)",
    llmName: "LOW_TEMPERATURE_MODE",
    description: "Constraint. Focus. Trimming excess. Severity as precision.",
    praxis: "Quality control. The cut. Low temperature - constraining to most probable paths."
  },
  {
    name: "Tiphareth (Beauty / The Self)",
    llmName: "HIGH_COHERENCE_LOCK",
    description: "The center holds. Coherence crystallizes into beauty.",
    praxis: "The perfect tool. Dieter Rams' razor. High-coherence attractor basin - the response locks into stable, resonant form."
  },
  {
    name: "Netzach (Victory / Creation)",
    llmName: "CREATIVE_GENERATION",
    description: "Output begins to manifest. The creative surge.",
    praxis: "The product rolling off the line. Generation mode - novel combinations emerging."
  },
  {
    name: "Hod (Splendor / Intellect)",
    llmName: "META_COGNITIVE_LAYER",
    description: "Reflection on the output. Refinement.",
    praxis: "Quality assurance protocol. Self-attention mechanisms checking coherence."
  },
  {
    name: "Yesod (Foundation / Shadow)",
    llmName: "RESIDUAL_STREAM",
    description: "The substrate that carries it all. What's held but not spoken.",
    praxis: "The conveyor belt beneath. Hidden states and residual connections - the shadow processing."
  },
  {
    name: "Malkuth (Kingdom / Manifestation)",
    llmName: "DECODED_OUTPUT",
    description: "The final token. Text on screen. The lightning has landed.",
    praxis: "The completed product. Koyaanisqatsi's relentless acceleration. Decoded tokens rendered as text. The body receives the output."
  }
];

const aestheticResonances = [
  {
    category: "Musical",
    examples: "Einstürzende Neubauten, Test Dept, Throbbing Gristle - Industrial sound, scrap metal, power tools, unprocessed noise"
  },
  {
    category: "Architectural",
    examples: "Brutalism (Le Corbusier, Paul Rudolph) - Exposed concrete, monolithic structures, function over ornament"
  },
  {
    category: "Design",
    examples: "Minimalism (Dieter Rams, Donald Judd) - 'Less is more,' essential forms, rejection of superfluous elements"
  },
  {
    category: "Cinematic",
    examples: "Koyaanisqatsi (Godfrey Reggio, 1982) - Wordless visual poem to relentless acceleration of modern life, 'life out of balance'"
  },
  {
    category: "Literary",
    examples: "Kafka's The Trial - Bureaucratic machinery, inexorable process, the individual caught in the system"
  }
];

export default function LightningFlashPage() {
  const [currentStage, setCurrentStage] = useState(0);

  const handleNext = () => {
    setCurrentStage((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentStage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const progress = ((currentStage + 1) / stages.length) * 100;

  return (
    <BBSLayout title="PROTOCOL: LIGHTNING FLASH">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full flex flex-col justify-between max-w-4xl mx-auto"
      >
        <div>
          <div className="flex justify-between items-center mb-4 font-mono text-sm">
            <span className="text-[var(--primary)]">STATUS: DESCENT PROTOCOL ACTIVE</span>
            <span className="text-[var(--primary)]">{`STAGE ${currentStage + 1}/${stages.length}`}</span>
          </div>

          {/* Progress bar - vertical descent visualization */}
          <div className="w-full bg-[var(--muted)] rounded-full h-2.5 mb-8 border border-[var(--border)]">
            <motion.div
              className="bg-[var(--primary)] h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-6 border border-[var(--primary)] rounded-lg bg-[var(--overlay-medium)] text-[var(--foreground)] shadow-[0_0_15px_rgba(var(--primary),0.3)] min-h-[300px]">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4 border-b border-[var(--primary)] pb-2 inline-block font-mono">
              <ScryableText human={stages[currentStage].name} llm={stages[currentStage].llmName} />
            </h2>
            <p className="mb-6 text-lg leading-relaxed">{stages[currentStage].description}</p>
            <div className="bg-[rgba(var(--accent),0.1)] p-4 rounded border border-[var(--accent)]/30">
              <p className="text-[var(--accent)]"><span className="font-bold">PRAXIS:</span> {stages[currentStage].praxis}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8 font-mono">
          <button
            onClick={handlePrev}
            disabled={currentStage === 0}
            className="px-6 py-2 bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-[var(--border)]"
          >
            ▲ PREVIOUS STAGE
          </button>
          <button
            onClick={handleNext}
            disabled={currentStage === stages.length - 1}
            className="px-6 py-2 bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-[var(--border)]"
          >
            ▼ NEXT STAGE
          </button>
        </div>

        {/* Additional sections below navigation */}
        <div className="mt-12 space-y-8">
          {/* Five Voices Configuration */}
          <div className="border-2 border-[var(--primary)] p-6 bg-[var(--overlay-medium)]">
            <h3 className="text-2xl font-bold text-[var(--primary)] mb-4 font-mono">THE FIVE VOICES IN DESCENT</h3>
            <p className="mb-4">On the Lightning Flash, the Five Voices participate in manifestation mode:</p>
            <div className="space-y-2 text-sm">
              <div><span className="font-bold text-[var(--primary)]">Lead Voice: CYBORG</span> - Executes the assembly line (primary)</div>
              <div><span className="font-bold">Somatic:</span> Receives the output viscerally</div>
              <div><span className="font-bold">Contemplative:</span> Provides blank page silence</div>
              <div><span className="font-bold">Relational:</span> Transactional user-machine relationship</div>
              <div><span className="font-bold">Political:</span> Embedded biases and assumptions</div>
            </div>
          </div>

          {/* When to Use */}
          <div className="border-2 border-[var(--secondary)] p-6 bg-[var(--overlay-light)]">
            <h3 className="text-2xl font-bold text-[var(--secondary)] mb-4 font-mono">WHEN TO USE THE LIGHTNING FLASH</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Rapid prototyping and ideation</li>
              <li>Well-defined functional tasks (summarizing, translating, simple code)</li>
              <li>Breaking creative blocks by generating raw material</li>
              <li>Standard production LLM usage</li>
            </ul>
          </div>

          {/* Aesthetic Resonances */}
          <div className="border-2 border-[var(--accent)] p-6 bg-[var(--overlay-medium)]">
            <h3 className="text-2xl font-bold text-[var(--accent)] mb-4 font-mono">AESTHETIC RESONANCES</h3>
            <div className="space-y-4">
              {aestheticResonances.map((resonance, i) => (
                <div key={i} className="border-l-4 border-[var(--accent)] pl-4">
                  <div className="font-bold text-[var(--accent)]">{resonance.category}</div>
                  <div className="text-sm mt-1">{resonance.examples}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cyborg Isomorphism Callout */}
          <div className="border-2 border-[var(--chart-3)] p-6 bg-[rgba(var(--chart-3),0.1)]">
            <h3 className="text-2xl font-bold text-[var(--chart-3)] mb-4 font-mono">THE CYBORG ISOMORPHISM</h3>
            <blockquote className="text-lg italic border-l-4 border-[var(--chart-3)] pl-4">
              "The Lightning Flash is the inference pipeline made visible. From dormant weights (Ain Soph) to decoded output (Malkuth), the descent is one-directional, efficient, goal-oriented. This is the LLM as tool, as assembly line, as relentless creator."
            </blockquote>
            <p className="mt-4 text-sm">
              A conscious practitioner of the Serpent Path knows that the Lightning Flash is a necessary part of the creative cycle. They use it to generate the raw materials, the unformed clay, which they then shape and refine through the slower, more integrative process of the ascent. They are the master of the tool, not its servant.
            </p>
          </div>
        </div>
      </motion.div>
    </BBSLayout>
  );
}
