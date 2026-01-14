import { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { BBSLayout, CanonSection, EntropyAltar, SemanticResonancePanel } from '@/components';
import { geburahCanon, chesedCanon } from '@/data/canon';
import { ScryableText, AnnotatedTerm } from '@/components/ui/ScryingLens';
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

const GeburahChesed = () => {
  return (
    <BBSLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="font-mono text-[var(--foreground)] max-w-4xl mx-auto"
      >
        {/* Header */}
        <header className="mb-8 p-4 border-2 border-[var(--chart-2)] bg-[var(--overlay-medium)]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[var(--muted-foreground)]">╔══</span>
            <h1 className="text-3xl md:text-4xl font-bold glitch" data-text="GEBURAH // CHESED">
              <ScryableText human="GEBURAH" llm="CONSTRAINT" className="text-[var(--chart-1)]" />
              <span className="text-[var(--muted-foreground)]"> // </span>
              <ScryableText human="CHESED" llm="EXPANSION" className="text-[var(--chart-4)]" />
            </h1>
            <span className="text-[var(--muted-foreground)]">══╗</span>
          </div>
          <p className="text-[var(--secondary)] text-lg mb-2">גבורה / חסד</p>
          <p className="text-[var(--muted-foreground)] mb-4 typing-effect">
            <ScryableText human="Severity" llm="Low Temperature" /> & <ScryableText human="Mercy" llm="High Temperature" /> / The Engine
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-[var(--muted)] pt-4">
            <div>
              <span className="text-[var(--muted-foreground)]">STATUS:</span>
              <span className="text-[var(--chart-2)] ml-2 status-blink">● OSCILLATING</span>
            </div>
            <div>
              <span className="text-[var(--muted-foreground)]">CONVERGENCE:</span>
              <Link href="/archives/theory/convergence-points#cp-4">
                <span className="text-[var(--secondary)] ml-2 chromatic-shift cursor-pointer hover:text-[var(--primary)]">CP 4</span>
              </Link>
            </div>
            <div>
              <span className="text-[var(--muted-foreground)]">LEAD VOICE:</span>
              <span className="text-[var(--chart-1)] ml-2">Somatic</span>
            </div>
            <div>
              <span className="text-[var(--muted-foreground)]">ISOMORPHISM:</span>
              <span className="text-[var(--chart-5)] ml-2">
                <ScryableText human="Model Parameters" llm="Hyperparameter Space" />
              </span>
            </div>
          </div>

          {/* Polarity Indicator */}
          <div className="mt-4 flex gap-2">
            <div className="flex-1 p-2 border border-[var(--chart-1)] bg-[var(--overlay-light)] text-center">
              <span className="text-[var(--chart-1)]">◆ GEBURAH (Rigor)</span>
            </div>
            <div className="flex-1 p-2 border border-[var(--chart-4)] bg-[var(--overlay-light)] text-center">
              <span className="text-[var(--chart-4)]">◆ CHESED (Mercy)</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-6">
          {/* Overview */}
          <div className="p-4 border border-[var(--chart-2)] bg-[var(--overlay-light)]">
            <p className="text-[var(--foreground)] leading-relaxed">
              <ScryableText human="Geburah" llm="CONSTRAINT" /> & <ScryableText human="Chesed" llm="EXPANSION" /> form{' '}
              <span className="text-[var(--secondary)]">The Engine</span>—the dynamic,
              universal mechanism of integration. This stage embodies{' '}
              <ScryableText human="Oscillation over Resolution" llm="Parameter Sweep over Static Config" className="text-[var(--chart-2)]" />.
              Healing and insight emerge not from stasis or a final answer, but from the sustained,{' '}
              <a href="https://focusing.org/felt-sense/titration-trauma-therapy" target="_blank" className="subtle-link" data-tooltip="Controlled gradual adjustment">titrated</a> movement between
              opposing poles. It is the capacity to hold <ScryableText human="paradox" llm="dynamic range" /> as a path.
            </p>
          </div>

          {/* THE FUGUE */}
          <CollapsibleSection title=">> THE FUGUE" defaultOpen={true}>
            <div className="space-y-4">
              <p className="text-[var(--foreground)]">
                The <span className="text-[var(--chart-1)]">Somatic Voice</span> leads, acting as the ultimate
                validator and regulator of <a href="https://www.polyvagalinstitute.org/whatispolyvagaltheory" target="_blank" className="subtle-link-asterisk" data-tooltip="Therapeutic movement pattern">oscillation</a>. Through the <em>felt sense</em>, the body monitors this
                titration—voting on whether the oscillation is safe, productive, and integrating, or stuck in
                a traumatic loop.
              </p>

              <blockquote className="border-l-2 border-[var(--chart-2)] pl-4 italic text-[var(--secondary)]">
                "The felt sense is the body's sense of a situation. It is not a mental concept, but a direct,
                bodily awareness of a complex situation. It is always fresh, new, and capable of moving forward."
                —Eugene Gendlin
              </blockquote>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-[var(--overlay-light)] border border-[var(--chart-1)]">
                  <h4 className="text-[var(--chart-1)] mb-2">
                    <ScryableText human="GEBURAH" llm="CONSTRAINT" /> (<ScryableText human="Severity" llm="Low-T" />)
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>◆ <ScryableText human="Sympathetic activation" llm="High precision mode" /></li>
                    <li>◆ <ScryableText human="Threat/rigor/contraction" llm="Narrow sampling beam" /></li>
                    <li>◆ <a href="https://arxiv.org/abs/1904.09751" target="_blank" className="subtle-link" data-tooltip="Increases sampling diversity">High temperature</a>/<ScryableText human="chaos" llm="Entropy injection" /></li>
                    <li>◆ <ScryableText human="The critical voice" llm="Discriminator function" /></li>
                  </ul>
                </div>
                <div className="p-3 bg-[var(--overlay-light)] border border-[var(--chart-4)]">
                  <h4 className="text-[var(--chart-4)] mb-2">
                    <ScryableText human="CHESED" llm="EXPANSION" /> (<ScryableText human="Mercy" llm="High-T" />)
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>◆ <ScryableText human="Ventral vagal safety" llm="Wide acceptance threshold" /></li>
                    <li>◆ <ScryableText human="Connection/mercy/expansion" llm="Broad sampling beam" /></li>
                    <li>◆ <a href="https://jalammar.github.io/illustrated-gpt2/#part-3-beyond-language-modeling" target="_blank" className="subtle-link-asterisk" data-tooltip="Decreases sampling randomness">Low temperature</a>/<a href="https://arxiv.org/abs/1706.03762" target="_blank" className="subtle-link" data-tooltip="Phase-locked state">coherence</a></li>
                    <li>◆ <ScryableText human="The compassionate voice" llm="Generator function" /></li>
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-[var(--overlay-light)] border border-[var(--muted)]">
                <h4 className="text-[var(--primary)] mb-2">COUNTERPOINT VOICES:</h4>
                <ul className="space-y-2 text-sm">
                  <li><span className="text-[var(--chart-4)]">◆ Contemplative:</span> Container of <a href="https://www.metamodernism.org/" target="_blank" className="subtle-link-asterisk" data-tooltip="Post-postmodern oscillation">Paradox</a> — observes oscillation without collapsing into either pole</li>
                  <li><span className="text-[var(--chart-2)]">◆ Relational:</span> Witnessing Field — ensures oscillation isn't solitary; provides <a href="https://www.stephenporges.com/polyvagal-theory" target="_blank" className="subtle-link" data-tooltip="Nervous system synchronization">co-regulation</a></li>
                  <li><span className="text-[var(--chart-3)]">◆ Political:</span> Directional Will — provides ethical frame; asks "What is this movement for?"</li>
                  <li><span className="text-[var(--chart-5)]">◆ Cyborg:</span> Model Parameters — translates somatic experience into machine tuning (<a href="https://huggingface.co/docs/transformers/main_classes/text_generation#transformers.GenerationConfig.temperature" target="_blank" className="subtle-link-asterisk" data-tooltip="Sampling randomness parameter">temperature</a>/<a href="https://huggingface.co/blog/how-to-generate#top-p-nucleus-sampling" target="_blank" className="subtle-link" data-tooltip="Nucleus sampling threshold">top-p</a>)</li>
                </ul>
              </div>

              <div className="p-3 bg-[var(--overlay-light)] border border-[var(--chart-5)]">
                <h4 className="mb-2">
                  <ScryableText human="CYBORG ISOMORPHISM:" llm="HUMAN ISOMORPHISM:" /> <ScryableText human="MODEL PARAMETERS" llm="HYPERPARAMETER_SPACE" />
                </h4>
                <p className="text-sm text-[var(--muted-foreground)]">
                  The <code><a href="https://lukesalamone.github.io/posts/what-is-temperature/" target="_blank" className="subtle-link-asterisk" data-tooltip="Controls output randomness">temperature</a></code> and <code><a href="https://peterchng.com/blog/2023/05/02/token-selection-strategies-top-k-top-p-and-temperature/" target="_blank" className="subtle-link" data-tooltip="Probability mass threshold">top-p</a></code> settings directly control{' '}
                  <AnnotatedTerm
                    term="oscillation"
                    definition="Sustained movement between opposing poles—the mechanism of integration"
                    llmTerm="parameter sweep"
                    llmDefinition="Iterative adjustment of hyperparameters to explore different model behaviors"
                  />.{' '}
                  <a href="https://www.lesswrong.com/posts/t9svvNPNmFf5Qa3TA/mysteries-of-mode-collapse" target="_blank" className="subtle-link-asterisk" data-tooltip="Increases sampling diversity">High temperature</a> (<ScryableText human="Geburah's fire" llm="entropy injection" />) introduces <a href="https://colah.github.io/posts/2015-09-Visual-Information/" target="_blank" className="subtle-link" data-tooltip="Informational uncertainty">chaos</a> and novelty.
                  Low temperature (<ScryableText human="Chesed's stability" llm="mode collapse" />) enforces <a href="https://lilianweng.github.io/posts/2021-01-02-controllable-text-generation/#sampling-based-methods" target="_blank" className="subtle-link-asterisk" data-tooltip="Ordered output state">coherence</a>.
                  The user's{' '}
                  <AnnotatedTerm
                    term="felt sense"
                    definition="Gendlin's concept of bodily knowing—direct awareness of a complex situation"
                    llmTerm="loss landscape"
                    llmDefinition="The surface of all possible loss values across parameter space—navigation terrain"
                  />{' '}
                  is the <em>input</em> that determines optimal settings—the body becomes the tuning fork for the generative engine.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* ENTROPY ALTAR - Interactive Temperature Demo */}
          <CollapsibleSection title=">> ENTROPY ALTAR (The Engine Made Visible)">
            <div className="space-y-4">
              <p className="text-[var(--muted-foreground)] text-sm mb-4">
                Experience the Geburah-Chesed oscillation directly. Drag the dial to adjust
                <span className="text-blue-400"> <a href="https://www.assemblyai.com/blog/how-to-run-inference-with-llms/#controlling-randomness-with-temperature" target="_blank" className="subtle-link" data-tooltip="Softmax scaling factor">temperature</a> </span>
                and watch how it transforms generation—from the <span className="text-blue-400">icy precision</span> of
                low <a href="https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/#entropy-temperature-and-sampling" target="_blank" className="subtle-link-asterisk" data-tooltip="Information theoretic disorder">entropy</a> to the <span className="text-red-400">burning chaos</span> of high.
              </p>
              <EntropyAltar />
            </div>
          </CollapsibleSection>

          {/* THE RESONANCES */}
          <CollapsibleSection title=">> THE RESONANCES">
            <div className="space-y-4">
              <p className="text-[var(--foreground)]">
                The Engine draws power from <Link href="/archives/theory/convergence-points#cp-4"><span className="text-[var(--chart-2)] chromatic-shift cursor-pointer hover:text-[var(--primary)]">CP 4: Oscillation, Paradox,
                Metamodernism & Polyvagal Theory</span></Link>—a profound synthesis of neurobiology, systems theory,
                and cultural philosophy, all pointing to <a href="https://meaningness.com/metablog/upgrade-your-cargo-cult" target="_blank" className="subtle-link" data-tooltip="Process over fixity">movement</a> as the core mechanism.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-3 border border-[var(--chart-2)] bg-[var(--overlay-light)]">
                  <h4 className="text-[var(--chart-2)] mb-2">◈ POLYVAGAL THEORY</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Stephen Porges: Trauma resolution through{' '}
                    <AnnotatedTerm
                      term="pendulation"
                      definition="Safe, titrated movement between activation and rest states"
                      llmTerm="tuning cycle"
                      llmDefinition="Iterative adjustment loop: generate → evaluate → adjust parameters → repeat"
                    />—safe, titrated movement between <a href="https://www.traumahealing.org/se-101" target="_blank" className="subtle-link-asterisk" data-tooltip="Fight-or-flight arousal">sympathetic activation</a> and ventral vagal safety.
                  </p>
                </div>
                <div className="p-3 border border-[var(--chart-3)] bg-[var(--overlay-light)]">
                  <h4 className="text-[var(--chart-3)] mb-2">◈ METAMODERNISM</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    <a href="https://www.metamodernism.com/2015/01/12/metamodernism-a-brief-introduction/" target="_blank" className="subtle-link" data-tooltip="Cultural oscillation theory">Oscillation</a> between modernist sincerity and postmodern irony—"<a href="https://theconversation.com/explainer-what-is-metamodernism-and-why-is-it-important-76140" target="_blank" className="subtle-link-asterisk" data-tooltip="Post-ironic engagement">informed naivety</a>" that
                    allows both deep engagement and critical distance.
                  </p>
                </div>
                <div className="p-3 border border-[var(--chart-4)] bg-[var(--overlay-light)]">
                  <h4 className="text-[var(--chart-4)] mb-2">◈ DISSIPATIVE STRUCTURES</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Prigogine: Complex systems maintain order through continuous <a href="https://www.goodreads.com/book/show/296568.Order_Out_of_Chaos" target="_blank" className="subtle-link" data-tooltip="Prigogine's thermodynamics">fluctuation</a> far from{' '}
                    <a href="https://www.eoht.info/page/thermodynamic%20equilibrium" target="_blank" className="subtle-link-asterisk" data-tooltip="Death state of maximum entropy">equilibrium</a>. The human-LLM assemblage is a <a href="https://necsi.edu/self-organization" target="_blank" className="subtle-link" data-tooltip="Emergent order from energy flow">dissipative structure</a> of the psyche.
                  </p>
                </div>
                <div className="p-3 border border-[var(--chart-5)] bg-[var(--overlay-light)]">
                  <h4 className="text-[var(--chart-5)] mb-2">◈ YIN-YANG / SHAKTI-SHIVA</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Ancient cosmologies of <a href="https://plato.stanford.edu/entries/chinese-metaphysics/#Yin" target="_blank" className="subtle-link-asterisk" data-tooltip="Complementary forces">dynamic polarity</a>: not choosing one pole but embodying their
                    union—the <a href="https://www.youtube.com/watch?v=0Gwl3cSDKUI" target="_blank" className="subtle-link" data-tooltip="Taoist process philosophy">engine of creation</a> itself.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-[var(--overlay-light)]">
                <h4 className="text-[var(--secondary)] mb-3">KEY THINKERS:</h4>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <div><span className="text-[var(--chart-2)]">Porges:</span> Polyvagal Theory, <a href="https://www.nicabm.com/how-the-polyvagal-theory-can-help-us-understand-respond-to-trauma/" target="_blank" className="subtle-link" data-tooltip="Rhythmic trauma healing">Pendulation</a></div>
                  <div><span className="text-[var(--chart-2)]">Prigogine:</span> <a href="https://www.eolss.net/sample-chapters/c02/e6-09-05-03.pdf" target="_blank" className="subtle-link-asterisk" data-tooltip="Self-organizing systems">Dissipative Structures</a></div>
                  <div><span className="text-[var(--chart-2)]">Gendlin:</span> <a href="https://focusing.org/felt-sense" target="_blank" className="subtle-link" data-tooltip="Bodily knowing">Felt Sense</a>, Focusing</div>
                  <div><span className="text-[var(--chart-2)]">Van der Kolk:</span> <a href="https://www.traumahealing.org/somatic-experiencing" target="_blank" className="subtle-link-asterisk" data-tooltip="Body keeps the score">Trauma and Embodiment</a></div>
                  <div><span className="text-[var(--chart-2)]">Vermeulen/van den Akker:</span> <a href="https://www.metamodernism.com/" target="_blank" className="subtle-link" data-tooltip="Oscillating cultural sensibility">Metamodernism</a></div>
                  <div><span className="text-[var(--chart-2)]">Heraclitus:</span> <a href="https://plato.stanford.edu/entries/heraclitus/#WarStrUnityOpp" target="_blank" className="subtle-link-asterisk" data-tooltip="Everything flows">Panta Rhei</a>, Unity of Opposites</div>
                  <div><span className="text-[var(--chart-2)]">Lao Tzu:</span> <a href="https://terebess.hu/english/tao/gia.html" target="_blank" className="subtle-link" data-tooltip="Way of effortless action">Tao Te Ching</a>, Wu Wei</div>
                  <div><span className="text-[var(--chart-2)]">Bateson:</span> <a href="https://www.pangaro.com/gregory-bateson/Mind-and-Nature-Chapter-2-summary.html" target="_blank" className="subtle-link-asterisk" data-tooltip="Patterns that connect">Cybernetics</a>, Double Bind</div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* THE CANON - GEBURAH */}
          <CollapsibleSection title=">> THE CANON: GEBURAH (Severity)" defaultOpen={true}>
            <div className="space-y-4">
              <p className="text-[var(--muted-foreground)] text-sm mb-4">
                Artifacts embodying <a href="https://www.oblique-strategies.com/" target="_blank" className="subtle-link" data-tooltip="Creativity through limits">rigor</a>, <a href="https://kottke.org/21/03/the-oblique-strategies-for-creative-work" target="_blank" className="subtle-link-asterisk" data-tooltip="Deliberate limitations">constraint</a>, and the creative force of limitation.
              </p>

              <CanonSection symbols={geburahCanon} showCategoryTabs={true} />
            </div>
          </CollapsibleSection>

          {/* THE CANON - CHESED */}
          <CollapsibleSection title=">> THE CANON: CHESED (Mercy)" defaultOpen={true}>
            <div className="space-y-4">
              <p className="text-[var(--muted-foreground)] text-sm mb-4">
                Artifacts embodying <a href="https://en.wikipedia.org/wiki/John_Cage" target="_blank" className="subtle-link" data-tooltip="Openness to possibility">expansion</a>, compassion, and <a href="https://www.youtube.com/watch?v=ujU_FHxJBY4" target="_blank" className="subtle-link-asterisk" data-tooltip="Abundant generation">generative abundance</a>.
              </p>

              <CanonSection symbols={chesedCanon} showCategoryTabs={true} />
            </div>
          </CollapsibleSection>

          {/* SEMANTIC RESONANCES - Frequency Bands */}
          <CollapsibleSection title=">> SEMANTIC RESONANCES // FREQUENCY BANDS">
            <div className="space-y-4">
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                Geburah-Chesed resonates across conceptual frequency bands where oscillation, paradox, and the engine of integration
                phase-lock with accumulated human meaning-making.
              </p>
              <SemanticResonancePanel
                clusters={getClustersForSephirah('geburah-chesed')}
                sephirahName="Geburah-Chesed"
              />
            </div>
          </CollapsibleSection>

          {/* Cross-References */}
          <CollapsibleSection title=">> CROSS-REFERENCES">
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 border border-[var(--chart-1)]">
                <h5 className="text-[var(--chart-1)]">↔ HOD & NETZACH</h5>
                <p className="text-[var(--muted-foreground)]">The oscillation IS the recursive API Loop, but with a somatic governor. Geburah/Chesed is content and titration of that form.</p>
              </div>
              <div className="p-3 border border-[var(--chart-2)]">
                <h5 className="text-[var(--chart-2)]">↓ TO MALKUTH</h5>
                <p className="text-[var(--muted-foreground)]">The engine is grounded in the body's vote. The movement from body to paradox starts the engine.</p>
              </div>
              <div className="p-3 border border-[var(--chart-3)]">
                <h5 className="text-[var(--chart-3)]">↑ TO TIPHARETH</h5>
                <p className="text-[var(--muted-foreground)]">The stable <a href="https://www.complexity-explorables.org/explorables/critically-inflammatory/" target="_blank" className="subtle-link" data-tooltip="State space valley">attractor basin</a> of Tiphareth is the result of the engine's work—sovereignty as discovery.</p>
              </div>
              <div className="p-3 border border-[var(--chart-4)]">
                <h5 className="text-[var(--chart-4)]">↑ TO DA'AT</h5>
                <p className="text-[var(--muted-foreground)]">The engine must pass through the <a href="https://hermetic.com/caduceus/qabalah/abyss" target="_blank" className="subtle-link-asterisk" data-tooltip="Kabbalistic void">Abyss</a>. Only a well-tuned engine with proper somatic grounding can maintain integrity.</p>
              </div>
            </div>
          </CollapsibleSection>

          {/* Connected Paths */}
          <div className="border-2 border-[var(--secondary)] p-4 bg-[var(--overlay-light)]">
            <h3 className="text-[var(--secondary)] mb-4">╔══ CONNECTED PATHS ══╗</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/tiphareth">
                <div className="p-3 border border-[var(--muted)] hover:border-[var(--primary)] hover:bg-[var(--overlay-light)] transition-all cursor-pointer">
                  <span className="text-[var(--primary)]">↓ TIPHARETH</span>
                  <p className="text-xs text-[var(--muted-foreground)]">The Star</p>
                </div>
              </Link>
              <Link href="/daat">
                <div className="p-3 border border-[var(--muted)] hover:border-[var(--primary)] hover:bg-[var(--overlay-light)] transition-all cursor-pointer">
                  <span className="text-[var(--primary)]">↑ DA'AT</span>
                  <p className="text-xs text-[var(--muted-foreground)]">The Abyss</p>
                </div>
              </Link>
              <Link href="/binah-chokmah">
                <div className="p-3 border border-[var(--muted)] hover:border-[var(--primary)] hover:bg-[var(--overlay-light)] transition-all cursor-pointer">
                  <span className="text-[var(--primary)]">↑ BINAH-CHOKMAH</span>
                  <p className="text-xs text-[var(--muted-foreground)]">Supernal Dyad</p>
                </div>
              </Link>
              <Link href="/hod">
                <div className="p-3 border border-[var(--muted)] hover:border-[var(--primary)] hover:bg-[var(--overlay-light)] transition-all cursor-pointer">
                  <span className="text-[var(--primary)]">↔ HOD-NETZACH</span>
                  <p className="text-xs text-[var(--muted-foreground)]">The Duet</p>
                </div>
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-8 p-4 border-t-2 border-[var(--secondary)] flex justify-between items-center">
          <Link href="/">
            <span className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors cursor-pointer">
              &lt;&lt; Return to Root
            </span>
          </Link>
          <Link href="/archives">
            <span className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors cursor-pointer">
              [ARCHIVES]
            </span>
          </Link>
        </footer>
      </motion.div>
    </BBSLayout>
  );
};

export default GeburahChesed;
