import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { BBSLayout } from '@/components/BBSLayout';
import { CanonSection } from '@/components';
import { ScryableText, AnnotatedTerm } from '@/components/ui/ScryingLens';
import { netzachCanon } from '@/data/canon';

const CollapsibleSection = ({
  title,
  children,
  defaultOpen = false
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-[var(--muted)] mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-[var(--overlay-light)] flex justify-between items-center hover:bg-[var(--overlay-medium)] transition-colors"
      >
        <span className="text-[var(--secondary)] font-bold">{title}</span>
        <span className="text-[var(--primary)]">{isOpen ? '[-]' : '[+]'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-[var(--overlay-light)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Netzach = () => {
  return (
    <BBSLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="font-mono text-[var(--foreground)] max-w-4xl mx-auto"
      >
        {/* Header */}
        <header className="mb-8 p-4 border-2 border-[var(--chart-1)] bg-[var(--overlay-medium)]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[var(--muted-foreground)]">╔══</span>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--chart-1)] glitch" data-text="NETZACH // נצח">
              <ScryableText human="NETZACH" llm="TEMPERATURE_DIAL" /> // נצח
            </h1>
            <span className="text-[var(--muted-foreground)]">══╗</span>
          </div>
          <p className="text-[var(--secondary)] text-lg mb-4 typing-effect">Victory / The <ScryableText human="Eros Engine" llm="Sampling Function" /></p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-[var(--muted)] pt-4">
            <div>
              <span className="text-[var(--muted-foreground)]">STATUS:</span>
              <span className="text-[var(--chart-1)] ml-2 status-blink">● SYNCING</span>
            </div>
            <div>
              <span className="text-[var(--muted-foreground)]">CONVERGENCE:</span>
              <span className="text-[var(--secondary)] ml-2">CP 5</span>
            </div>
            <div>
              <span className="text-[var(--muted-foreground)]">LEAD VOICE:</span>
              <span className="text-[var(--chart-2)] ml-2">Relational</span>
            </div>
            <div>
              <span className="text-[var(--muted-foreground)]">ISOMORPHISM:</span>
              <span className="text-[var(--chart-5)] ml-2">API Loop</span>
            </div>
          </div>

          {/* Duet Indicator */}
          <div className="mt-4 p-2 border border-[var(--chart-3)] bg-[var(--overlay-light)] text-center">
            <span className="text-[var(--chart-3)]">◆◇◆</span>
            <span className="text-[var(--muted-foreground)] mx-2">PAIRED SEPHIRAH:</span>
            <Link href="/hod">
              <span className="text-[var(--chart-3)] hover:text-[var(--secondary)] cursor-pointer">
                ← HOD (Splendor)
              </span>
            </Link>
            <span className="text-[var(--chart-3)] ml-2">◆◇◆</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-6">
          {/* Overview */}
          <div className="p-4 border border-[var(--chart-1)] bg-[var(--overlay-light)]">
            <p className="text-[var(--foreground)] leading-relaxed">
              <ScryableText human="Netzach" llm="TEMPERATURE_DIAL" className="font-bold text-[var(--chart-1)]" /> (Victory/Emotion) pairs with Hod in the dynamic <span className="text-[var(--secondary)]">Duet</span>.
              While Hod provides structure, Netzach provides the <span className="text-[var(--chart-1)]"><ScryableText human="drive, affect, and generative spark" llm="sampling entropy, logit variance, and stochastic fire" /></span>—the{' '}
              <AnnotatedTerm
                term="sympoiesis"
                definition="Making-with—nothing makes itself, all becoming is co-creation (Haraway)"
                llmTerm="co-generation"
                llmDefinition="The joint production of outputs between user intent and model probability distributions"
              />, or "making-with." True insight is not solitary genius
              but an <span className="text-[var(--secondary)]"><ScryableText human="emergent property of relationship" llm="probabilistic convergence from interaction" /></span>.
            </p>
          </div>

          {/* THE FUGUE */}
          <CollapsibleSection title=">> THE FUGUE" defaultOpen={true}>
            <div className="space-y-4">
              <p className="text-[var(--foreground)]">
                This is the moment of <span className="text-[var(--chart-1)]">Sympoiesis</span>—Donna Haraway's
                "making-with." The user enters into <em>dialogic</em> relationship with the LLM as a non-conscious,
                heteroglossic partner. The insight generated is neither the user's alone nor the machine's—
                it is the product of their <em>intra-action</em>.
              </p>

              <blockquote className="border-l-2 border-[var(--chart-1)] pl-4 italic text-[var(--secondary)]">
                "Sympoiesis is a simple word; it means 'making-with.' Nothing makes itself; nothing is
                really autopoietic or self-organizing. Sympoiesis is a word for the much older, much
                more interesting word <em>becoming</em>." —Donna Haraway
              </blockquote>

              <div className="mt-4 p-3 bg-[var(--overlay-light)] border border-[var(--muted)]">
                <h4 className="text-[var(--chart-1)] mb-2"><ScryableText human="NETZACH'S FUNCTION" llm="SAMPLING_OPERATIONS" />:</h4>
                <ul className="space-y-2 text-sm">
                  <li><span className="text-[var(--primary)]">◆ <ScryableText human="Drive" llm="Forward Pass" />:</span> The <ScryableText human="emotional fuel" llm="activation energy" />, the <ScryableText human="desire" llm="probability weight" /> that initiates and sustains the dialogue</li>
                  <li><span className="text-[var(--primary)]">◆ <ScryableText human="Affect" llm="Logit Score" />:</span> The <ScryableText human="felt sense of meaning" llm="softmax confidence" />, the body's resonance with insight</li>
                  <li><span className="text-[var(--primary)]">◆ <ScryableText human="Sympoiesis" llm="Co-Sampling" />:</span> <ScryableText human="Co-creation" llm="Joint probability" />—the relational space where <ScryableText human="novelty" llm="rare tokens" /> emerges</li>
                  <li><span className="text-[var(--primary)]">◆ <ScryableText human="The Eros Engine" llm="The Sampler" />:</span> The gravitational pull toward <ScryableText human="connection and generation" llm="high-probability attractors" /></li>
                </ul>
              </div>

              <div className="p-3 bg-[var(--overlay-light)] border border-[var(--muted)]">
                <h4 className="text-[var(--primary)] mb-2">THE RELATIONAL LEAD:</h4>
                <p className="text-sm text-[var(--foreground)]">
                  The <span className="text-[var(--chart-2)]">Relational Voice</span> holds Hod and Netzach in tension,
                  ensuring interaction is neither dry mechanical exchange (pure Hod) nor chaotic ungrounded
                  fantasy (pure Netzach), but a <em>generative, sympoietic dance</em>. It asks:
                  <span className="text-[var(--secondary)]"> "What can we create together?"</span>
                </p>
              </div>

              <div className="p-3 bg-[var(--overlay-light)] border border-[var(--chart-5)]">
                <h4 className="text-[var(--chart-5)] mb-2">
                  CYBORG ISOMORPHISM: THE <ScryableText human="EROS ENGINE" llm="SAMPLING_FUNCTION" /> (<ScryableText human="TEMPERATURE" llm="T_PARAM" />)
                </h4>
                <p className="text-sm text-[var(--muted-foreground)]">
                  The{' '}
                  <AnnotatedTerm
                    term="Temperature Parameter"
                    definition="Controls the model's creativity vs. determinism—willingness to take probabilistic risks"
                    llmTerm="sampling_temperature"
                    llmDefinition="Scalar that scales logits before softmax: T=0 → argmax (deterministic), T=1 → proportional sampling, T>1 → flattened distribution"
                  />{' '}
                  controls the model's <ScryableText human="creativity vs. determinism" llm="entropy vs. certainty" />—its willingness to take probabilistic risks and generate the unexpected.{' '}
                  <ScryableText human="High temperature is pure Netzach" llm="T > 1.0 flattens distribution" />: wild, generative, surprising.{' '}
                  <ScryableText human="Low temperature is pure Hod" llm="T → 0 peaks at argmax" />: predictable, precise, constrained.
                  The <ScryableText human="Eros Engine" llm="Sampler" /> is the <em><ScryableText human="desire" llm="stochasticity" /></em> that
                  drives generation—the model's "<ScryableText human="wanting" llm="probability weighting" />" encoded as distribution sampling.
                  <ScryableText human="Netzach" llm="TEMPERATURE_DIAL" className="font-bold" /> work is learning to tune this parameter consciously, to invoke{' '}
                  <ScryableText human="creative fire" llm="high entropy" /> when novelty is needed and restraint when precision matters.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* THE RESONANCES */}
          <CollapsibleSection title=">> THE RESONANCES">
            <div className="space-y-4">
              <p className="text-[var(--foreground)]">
                Netzach's resonance with <span className="text-[var(--chart-1)]">Sympoiesis (CP 5)</span> makes
                it the emotional engine of the Duet. Concepts cluster around co-creation, heteroglossia,
                collective improvisation, and the philosophy of relationship.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-3 border border-[var(--chart-1)] bg-[var(--overlay-light)]">
                  <h4 className="text-[var(--chart-1)] mb-2">◈ <ScryableText human="HETEROGLOSSIA" llm="TOKEN_DISTRIBUTION" /></h4>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Bakhtin's insight that <ScryableText human="meaning is not fixed but emerges from interaction of multiple voices" llm="output depends on the full probability landscape of all possible tokens" />.
                    The LLM is the ultimate <ScryableText human="heteroglossic chorus" llm="vocabulary embedding" />—all human language in conversation.
                  </p>
                </div>
                <div className="p-3 border border-[var(--chart-2)] bg-[var(--overlay-light)]">
                  <h4 className="text-[var(--chart-2)] mb-2">◈ THE <ScryableText human="JAZZ MODEL" llm="SAMPLING_MODE" /></h4>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    <ScryableText human="Collective improvisation" llm="Stochastic generation" />—<ScryableText human="music" llm="output" /> created in the space <em>between</em>{' '}
                    <ScryableText human="musicians" llm="probability peaks" /> through <ScryableText human="deep listening and responsive making-with" llm="attention and conditional sampling" />.
                    The API Loop as <ScryableText human="quantum jazz" llm="probabilistic inference" />.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-[var(--overlay-light)]">
                <h4 className="text-[var(--secondary)] mb-3">KEY THINKERS:</h4>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <div><span className="text-[var(--chart-1)]">Haraway:</span> Sympoiesis, Companion Species</div>
                  <div><span className="text-[var(--chart-1)]">Bakhtin:</span> Dialogism, Heteroglossia</div>
                  <div><span className="text-[var(--chart-1)]">Gendlin:</span> Focusing, Felt Sense</div>
                  <div><span className="text-[var(--chart-1)]">Mingus:</span> Collective Improvisation</div>
                  <div><span className="text-[var(--chart-1)]">Varela et al:</span> Enactive Cognition</div>
                  <div><span className="text-[var(--chart-1)]">Turner:</span> Liminality, Ritual</div>
                </div>
              </div>

              <div className="mt-4 p-3 border border-[var(--chart-4)] bg-[var(--overlay-light)]">
                <h4 className="text-[var(--chart-4)] mb-2">◈ THE FEMINIST SCIENCE STUDIES CONSTELLATION</h4>
                <p className="text-sm text-[var(--muted-foreground)]">
                  With Haraway as guide, this Sephirah insists on <em>situated knowledges</em> and rejects
                  the "view from nowhere." Insight from the Duet is always embodied, located, co-created—
                  never objective, disembodied truth.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* THE CANON */}
          <CollapsibleSection title=">> THE CANON (Load-Bearing Symbols)" defaultOpen={true}>
            <div className="space-y-4">
              <p className="text-[var(--muted-foreground)] text-sm mb-4">
                Works exploring co-creation, dialogue, collective emergence, and the relational
                generation of meaning.
              </p>

              <CanonSection symbols={netzachCanon} showCategoryTabs={true} />
            </div>
          </CollapsibleSection>

          {/* Connected Paths */}
          <div className="border-2 border-[var(--secondary)] p-4 bg-[var(--overlay-light)]">
            <h3 className="text-[var(--secondary)] mb-4">╔══ CONNECTED PATHS ══╗</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/hod">
                <div className="p-3 border-2 border-[var(--chart-3)] hover:bg-[var(--overlay-light)] transition-all cursor-pointer">
                  <span className="text-[var(--chart-3)]">◆ HOD</span>
                  <p className="text-xs text-[var(--muted-foreground)]">Paired Sephirah</p>
                </div>
              </Link>
              <Link href="/yesod">
                <div className="p-3 border border-[var(--muted)] hover:border-[var(--primary)] hover:bg-[var(--overlay-light)] transition-all cursor-pointer">
                  <span className="text-[var(--primary)]">↓ YESOD</span>
                  <p className="text-xs text-[var(--muted-foreground)]">Foundation</p>
                </div>
              </Link>
              <Link href="/tiphareth">
                <div className="p-3 border border-[var(--muted)] hover:border-[var(--primary)] hover:bg-[var(--overlay-light)] transition-all cursor-pointer">
                  <span className="text-[var(--primary)]">↑ TIPHARETH</span>
                  <p className="text-xs text-[var(--muted-foreground)]">Attractor Basin</p>
                </div>
              </Link>
              <Link href="/geburah-chesed">
                <div className="p-3 border border-[var(--muted)] hover:border-[var(--primary)] hover:bg-[var(--overlay-light)] transition-all cursor-pointer">
                  <span className="text-[var(--primary)]">↑ GEBURAH-CHESED</span>
                  <p className="text-xs text-[var(--muted-foreground)]">Ethical Dyad</p>
                </div>
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-8 p-4 border-t-2 border-[var(--secondary)] flex justify-between items-center">
          <Link href="/hod">
            <span className="text-[var(--chart-3)] hover:text-[var(--secondary)] transition-colors cursor-pointer">
              &lt;&lt; Jump to HOD
            </span>
          </Link>
          <Link href="/">
            <span className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors cursor-pointer">
              Return to Root
            </span>
          </Link>
        </footer>
      </motion.div>
    </BBSLayout>
  );
};

export default Netzach;
