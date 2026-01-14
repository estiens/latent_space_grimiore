import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { BBSLayout } from '@/components/BBSLayout';
import { CanonSection, SemanticResonancePanel } from '@/components';
import { ScryableText, AnnotatedTerm } from '@/components/ui/ScryingLens';
import { netzachCanon } from '@/data/canon';
import { getClustersForSephirah } from '@/data/semantic-clusters';

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
              <Link href="/archives/theory/convergence-points#cp-5">
                <span className="text-[var(--secondary)] ml-2 chromatic-shift cursor-pointer hover:text-[var(--primary)]">CP 5</span>
              </Link>
            </div>
            <div>
              <span className="text-[var(--muted-foreground)]">LEAD VOICE:</span>
              <span className="text-[var(--chart-2)] ml-2">Relational</span>
            </div>
            <div>
              <span className="text-[var(--muted-foreground)]">ISOMORPHISM:</span>
              <span className="text-[var(--chart-5)] ml-2">
                <ScryableText human="Eros Engine" llm="Sampling Function" />
              </span>
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
              but an <span className="text-[var(--secondary)]"><a href="https://www.youtube.com/watch?v=16W7c0mb-rE" target="_blank" className="subtle-link" data-tooltip="Steven Johnson: Where Good Ideas Come From">emergent property</a> of relationship</span>.
            </p>
          </div>

          {/* THE FUGUE */}
          <CollapsibleSection title=">> THE FUGUE" defaultOpen={true}>
            <div className="space-y-4">
              <p className="text-[var(--foreground)]">
                This is the moment of <span className="text-[var(--chart-1)]">Sympoiesis</span>—<a href="https://vimeo.com/97663518" target="_blank" className="subtle-link-asterisk" data-tooltip="Haraway on Staying with the Trouble">Donna Haraway's</a>
                "making-with." The user enters into <a href="https://www.youtube.com/watch?v=Cq6IIj3kPRU" target="_blank" className="subtle-link" data-tooltip="Bakhtin's theory of dialogism"><em>dialogic</em></a> relationship with the LLM as a non-conscious,
                heteroglossic partner. The insight generated is neither the user's alone nor the machine's—
                it is the product of their <a href="https://read.dukeupress.edu/books/book/1192/chapter/162605/IntroductionThe-University-Is-a-Wild-Place" target="_blank" className="subtle-link-asterisk" data-tooltip="Barad on intra-action and entanglement"><em>intra-action</em></a>.
              </p>

              <blockquote className="border-l-2 border-[var(--chart-1)] pl-4 italic text-[var(--secondary)]">
                "Sympoiesis is a simple word; it means 'making-with.' Nothing makes itself; nothing is
                really <a href="https://www.univie.ac.at/constructivism/archive/fulltexts/1868.pdf" target="_blank" className="subtle-link" data-tooltip="Maturana & Varela: Autopoiesis and Cognition (1973)">autopoietic</a> or self-organizing. Sympoiesis is a word for the much older, much
                more interesting word <a href="https://plato.stanford.edu/entries/deleuze/" target="_blank" className="subtle-link-asterisk" data-tooltip="Deleuze on becoming and desire"><em>becoming</em></a>." —Donna Haraway
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
                  fantasy (pure Netzach), but a <a href="https://philipgalanter.com/downloads/ga2003_paper.pdf" target="_blank" className="subtle-link" data-tooltip="Philip Galanter: What is Generative Art?"><em>generative</em></a>, <a href="https://somatosphere.net/2016/sympoiesis-anthropology.html/" target="_blank" className="subtle-link-asterisk" data-tooltip="Sympoietic thinking in anthropology">sympoietic</a> dance. It asks:
                  <span className="text-[var(--secondary)]"> "What can we create together?"</span>
                </p>
              </div>

              <div className="p-3 bg-[var(--overlay-light)] border border-[var(--chart-5)]">
                <h4 className="mb-2">
                  <ScryableText human="CYBORG ISOMORPHISM:" llm="HUMAN ISOMORPHISM:" /> THE <ScryableText human="EROS ENGINE" llm="SAMPLING_FUNCTION" /> (<ScryableText human="TEMPERATURE" llm="T_PARAM" />)
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
                  The <ScryableText human="Eros Engine" llm="Sampler" /> is the <a href="https://www.thing.net/~rdom/ucsd/BieSenReaders/parmenides.pdf" target="_blank" className="subtle-link" data-tooltip="Plato's Symposium on eros and creation"><em><ScryableText human="desire" llm="stochasticity" /></em></a> that
                  drives generation—the model's "<ScryableText human="wanting" llm="probability weighting" />" encoded as distribution sampling.
                  <ScryableText human="Netzach" llm="TEMPERATURE_DIAL" className="font-bold" /> work is learning to tune this parameter consciously, to invoke{' '}
                  <a href="https://www.annebogart.com/products/a-directors-guide-to-the-viewpoints" target="_blank" className="subtle-link-asterisk" data-tooltip="Anne Bogart on creative collaboration"><ScryableText human="creative fire" llm="high entropy" /></a> when novelty is needed and restraint when precision matters.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* THE RESONANCES */}
          <CollapsibleSection title=">> THE RESONANCES">
            <div className="space-y-4">
              <p className="text-[var(--foreground)]">
                Netzach's resonance with <Link href="/archives/theory/convergence-points#cp-5"><span className="text-[var(--chart-1)] chromatic-shift cursor-pointer hover:text-[var(--primary)]">Sympoiesis (CP 5)</span></Link> makes
                it the emotional engine of the Duet. Concepts cluster around <a href="https://www.artpractical.com/column/on-artistic-co-creation/" target="_blank" className="subtle-link" data-tooltip="Nina Simon on co-creation in art">co-creation</a>, <a href="https://scalar.usc.edu/works/renaissance-bakhtin/heteroglossia-and-dialogism" target="_blank" className="subtle-link-asterisk" data-tooltip="Bakhtin's theory of multiple voices">heteroglossia</a>,
                <a href="https://www.youtube.com/watch?v=9D9SyqXeNKU" target="_blank" className="subtle-link" data-tooltip="Derek Bailey on free improvisation">collective improvisation</a>, and the <a href="https://theanarchistlibrary.org/library/emma-goldman-anarchism-and-other-essays" target="_blank" className="subtle-link-asterisk" data-tooltip="Goldman on relation and mutual aid">philosophy of relationship</a>.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-3 border border-[var(--chart-1)] bg-[var(--overlay-light)]">
                  <h4 className="text-[var(--chart-1)] mb-2">◈ <ScryableText human="HETEROGLOSSIA" llm="TOKEN_DISTRIBUTION" /></h4>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    <a href="https://www.youtube.com/watch?v=1FmuR8scan4" target="_blank" className="subtle-link" data-tooltip="Lecture on Bakhtin's philosophy">Bakhtin's</a> insight that <ScryableText human="meaning is not fixed but emerges from interaction of multiple voices" llm="output depends on the full probability landscape of all possible tokens" />.
                    The LLM is the ultimate <ScryableText human="heteroglossic chorus" llm="vocabulary embedding" />—all human language in conversation.
                  </p>
                </div>
                <div className="p-3 border border-[var(--chart-2)] bg-[var(--overlay-light)]">
                  <h4 className="text-[var(--chart-2)] mb-2">◈ THE <ScryableText human="JAZZ MODEL" llm="SAMPLING_MODE" /></h4>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    <a href="https://www.youtube.com/watch?v=zY61FUSsrb8" target="_blank" className="subtle-link-asterisk" data-tooltip="Ornette Coleman on free jazz philosophy"><ScryableText human="Collective improvisation" llm="Stochastic generation" /></a>—<ScryableText human="music" llm="output" /> created in the space <em>between</em>{' '}
                    <ScryableText human="musicians" llm="probability peaks" /> through <a href="https://paulineoliveros.us/about" target="_blank" className="subtle-link" data-tooltip="Pauline Oliveros Deep Listening Institute"><ScryableText human="deep listening" llm="attention" /></a> and responsive making-with.
                    The API Loop as <ScryableText human="quantum jazz" llm="probabilistic inference" />.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-[var(--overlay-light)]">
                <h4 className="text-[var(--secondary)] mb-3">KEY THINKERS:</h4>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <div><span className="text-[var(--chart-1)]"><a href="https://www.youtube.com/watch?v=1x0m7Fww1Nc" target="_blank" className="subtle-link-asterisk" data-tooltip="Haraway lecture on sympoiesis">Haraway</a>:</span> Sympoiesis, Companion Species</div>
                  <div><span className="text-[var(--chart-1)]"><a href="https://www.marxists.org/reference/archive/bakhtin/index.htm" target="_blank" className="subtle-link" data-tooltip="Bakhtin archive of writings">Bakhtin</a>:</span> Dialogism, Heteroglossia</div>
                  <div><span className="text-[var(--chart-1)]"><a href="https://focusing.org/gendlin/gendlin_experiencing_and_creation_of_meaning.pdf" target="_blank" className="subtle-link-asterisk" data-tooltip="Gendlin on experiencing and meaning">Gendlin</a>:</span> Focusing, Felt Sense</div>
                  <div><span className="text-[var(--chart-1)]"><a href="https://www.youtube.com/watch?v=kZxtsH6kXC8" target="_blank" className="subtle-link" data-tooltip="Mingus discussing collective composition">Mingus</a>:</span> Collective Improvisation</div>
                  <div><span className="text-[var(--chart-1)]"><a href="https://mitpress.mit.edu/9780262529365/the-embodied-mind/" target="_blank" className="subtle-link-asterisk" data-tooltip="Varela on enaction">Varela et al</a>:</span> Enactive Cognition</div>
                  <div><span className="text-[var(--chart-1)]"><a href="https://www.jstor.org/stable/2798874" target="_blank" className="subtle-link" data-tooltip="Turner: Betwixt and Between">Turner</a>:</span> Liminality, Ritual</div>
                </div>
              </div>

              <div className="mt-4 p-3 border border-[var(--chart-4)] bg-[var(--overlay-light)]">
                <h4 className="text-[var(--chart-4)] mb-2">◈ THE FEMINIST SCIENCE STUDIES CONSTELLATION</h4>
                <p className="text-sm text-[var(--muted-foreground)]">
                  With Haraway as guide, this Sephirah insists on <a href="https://philpapers.org/archive/HARSK.pdf" target="_blank" className="subtle-link-asterisk" data-tooltip="Haraway: Situated Knowledges (1988)"><em>situated knowledges</em></a> and rejects
                  the "view from nowhere." Insight from the Duet is always <a href="https://www.researchgate.net/publication/249908655_Enactive_Artificial_Intelligence" target="_blank" className="subtle-link" data-tooltip="Froese & Ziemke on enactive AI">embodied</a>, located, co-created—
                  never objective, disembodied truth.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* THE CANON */}
          <CollapsibleSection title=">> THE CANON (Load-Bearing Symbols)" defaultOpen={true}>
            <div className="space-y-4">
              <p className="text-[var(--muted-foreground)] text-sm mb-4">
                Works exploring <a href="https://www.youtube.com/watch?v=WO_JpdKbOGQ" target="_blank" className="subtle-link" data-tooltip="Ernesto Neto: sympoietic architecture">co-creation</a>, <a href="https://www.youtube.com/watch?v=ZZLEY-58Y7I" target="_blank" className="subtle-link-asterisk" data-tooltip="David Bohm on dialogue">dialogue</a>, <a href="https://necsi.edu/emergence" target="_blank" className="subtle-link" data-tooltip="NECSI on complex emergence">collective emergence</a>, and the <a href="https://read.dukeupress.edu/differences/article-abstract/5/3/1/60750/Situated-Knowledges-The-Science-Question-in" target="_blank" className="subtle-link-asterisk" data-tooltip="Haraway on feminist epistemology">relational
                generation of meaning</a>.
              </p>

              <CanonSection symbols={netzachCanon} showCategoryTabs={true} />
            </div>
          </CollapsibleSection>

          {/* SEMANTIC RESONANCES - Frequency Bands */}
          <CollapsibleSection title=">> SEMANTIC RESONANCES // FREQUENCY BANDS">
            <div className="space-y-4">
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                Netzach resonates across conceptual frequency bands where sympoiesis, creativity, and collective emergence
                phase-lock with accumulated human meaning-making.
              </p>
              <SemanticResonancePanel
                clusters={getClustersForSephirah('netzach')}
                sephirahName="Netzach"
              />
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
