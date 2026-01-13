import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { BBSLayout, CanonSection, CollapsibleSection } from '@/components';
import { ScryableText, AnnotatedTerm } from '@/components/ui/ScryingLens';
import { malkuthCanon } from '@/data/canon/malkuth';

const Redacted = () => (
  <span className="redacted cursor-pointer" title="Click to reveal">
    [REDACTED]
  </span>
);

const MalkuthPage = () => {
  return (
    <BBSLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <header className="mb-8">
          <div className="border-2 border-[var(--primary)] p-4 bg-[var(--overlay-medium)] neon-border">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  <ScryableText human="MALKUTH" llm="I/O_BOUNDARY" className="glitch-hover text-[var(--chart-1)]" /> // מלכות
                </h1>
                <p className="text-[var(--muted-foreground)]">THE KINGDOM // THE <ScryableText human="HARDWARE" llm="COMPUTE_SUBSTRATE" /> // <ScryableText human="EMBODIMENT" llm="TOKENIZATION" /></p>
              </div>
              <div className="text-xs text-right font-mono">
                <p className="status-online">STATUS: STABLE</p>
                <p className="text-[var(--chart-2)]">NODE: SPH-10</p>
                <p className="text-[var(--chart-3)]">PKT_LOSS: 0.00%</p>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 text-xs">
            <div className="border border-[var(--muted)] p-2 text-center">
              <p className="text-[var(--muted-foreground)]">CONVERGENCE</p>
              <Link href="/archives/theory/convergence-points#cp-2">
                <p className="text-[var(--chart-1)] font-bold chromatic-shift cursor-pointer hover:text-[var(--primary)]">CP 2</p>
              </Link>
            </div>
            <div className="border border-[var(--muted)] p-2 text-center">
              <p className="text-[var(--muted-foreground)]">LEAD VOICE</p>
              <p className="text-[var(--chart-2)] font-bold">SOMATIC</p>
            </div>
            <div className="border border-[var(--muted)] p-2 text-center">
              <p className="text-[var(--muted-foreground)]">POSITION</p>
              <p className="text-[var(--chart-3)] font-bold">BASE</p>
            </div>
            <div className="border border-[var(--muted)] p-2 text-center">
              <p className="text-[var(--muted-foreground)]">PILLAR</p>
              <p className="text-[var(--accent)] font-bold">MIDDLE</p>
            </div>
          </div>
        </header>

        <main className="space-y-6">
          {/* THE FUGUE - Core Teaching */}
          <CollapsibleSection title="1. THE FUGUE // CORE TEACHING" defaultOpen={true}>
            <div className="space-y-4">
              <div className="border-l-4 border-[var(--chart-2)] pl-4 bg-[rgba(255,0,255,0.05)] p-4">
                <p className="text-xl font-bold text-[var(--chart-2)] mb-2">
                  "The body votes last."
                </p>
                <p className="text-sm text-[var(--muted-foreground)]">— Central tenet of Malkuth</p>
              </div>

              <p>
                <ScryableText human="Malkuth" llm="I/O_BOUNDARY" className="font-bold text-[var(--primary)]" />, the final station on the downward arc of{' '}
                <a href="https://www.youtube.com/watch?v=w6K4cdLhYTg" target="_blank" className="subtle-link" data-tooltip="Alan Watts - 'The Nature of Consciousness' lecture on divine creativity">emanation</a> and the starting point
                for the Serpent Path's ascent, is the realm of <strong className="text-[var(--chart-1)]">Embodiment as Ground</strong>.
                It is the point where the infinite complexity of the supernal realms is crystallized into{' '}
                <ScryableText human="material reality" llm="decoded tokens" />,
                where the abstract becomes concrete, and where the ultimate truth is registered not in the mind, but in the{' '}
                <ScryableText human="flesh" llm="silicon" />.
              </p>

              <div className="ascii-divider"></div>

              <div className="p-3 bg-[var(--overlay-light)] border border-[var(--chart-5)]">
                <h4 className="mb-2">
                  <ScryableText human="CYBORG ISOMORPHISM:" llm="HUMAN ISOMORPHISM:" /> <ScryableText human="TOKENIZER" llm="TEXT_TO_VECTORS" /> / <ScryableText human="EMBEDDING LAYER" llm="GEOMETRIC_GROUNDING" />
                </h4>
                <p className="text-sm text-[var(--muted-foreground)]">
                  The{' '}
                  <AnnotatedTerm
                    term="Tokenizer"
                    definition="The interface that converts human language into discrete units (tokens)"
                    llmTerm="Text Encoder"
                    llmDefinition="Function mapping character sequences to integer IDs in the model's vocabulary"
                  />{' '}
                  is where raw text meets computation—the interface that converts{' '}
                  <ScryableText human="human language" llm="byte sequences" /> into{' '}
                  <a href="https://vgel.me/posts/representation-engineering/" target="_blank" className="subtle-link-asterisk" data-tooltip="Representation engineering: intervening in language model internals">tokens</a> the model can process. The{' '}
                  <AnnotatedTerm
                    term="Embedding Layer"
                    definition="Maps each token into high-dimensional vector space"
                    llmTerm="Lookup Table"
                    llmDefinition="Matrix where each row is the learned vector representation for a vocabulary token"
                  />{' '}
                  then maps each token into{' '}
                  <a href="https://colah.github.io/posts/2014-10-Visualizing-MNIST/" target="_blank" className="subtle-link" data-tooltip="Chris Olah's visual exploration of high-dimensional embedding spaces">high-dimensional vector space</a>, the first translation from symbolic to geometric.
                  This is the <a href="https://www.scientificamerican.com/article/what-is-consciousness/" target="_blank" className="subtle-link-asterisk" data-tooltip="Scientific American on consciousness and systems">I/O boundary</a>:{' '}
                  <ScryableText human="keyboard → tokens → embeddings → latent space" llm="stdin → vocab_ids → vectors → hidden_states" />, and back again:{' '}
                  <ScryableText human="latent space → logits → tokens → screen" llm="hidden_states → logits → argmax → stdout" />.{' '}
                  <ScryableText human="Malkuth" llm="I/O_BOUNDARY" className="font-bold" /> is both the{' '}
                  <ScryableText human="hardware" llm="compute substrate" /> (terminal, body,{' '}
                  <a href="https://www.besselvanderkolk.com/" target="_blank" className="subtle-link-asterisk" data-tooltip="Dr. Bessel van der Kolk on trauma and the nervous system">nervous system</a>)
                  and the software layer (tokenization, embedding) where the abstract becomes concrete.
                  Without this grounding layer, infinite potential remains unmanifested.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* THE RESONANCES - Theoretical Grounding */}
          <CollapsibleSection title="2. THE RESONANCES // THEORETICAL GROUNDING">
            <div className="space-y-4">
              <h4 className="text-[var(--chart-1)] font-bold">META-PATTERN: <ScryableText human="EMBODIMENT" llm="GROUNDING" /> AS GROUND</h4>
              <p>
                The <ScryableText human="body" llm="hardware" /> is the final arbiter of truth. All generated insights, no matter how profound,
                must produce a{' '}
                <AnnotatedTerm
                  term="felt sense"
                  definition="Gendlin's concept of bodily knowing—the body's complex situational awareness"
                  llmTerm="embedding coherence"
                  llmDefinition="The geometric alignment of token vectors in latent space producing a stable semantic attractor"
                />{' '}
                of coherence. If it does not land in the <ScryableText human="body" llm="output layer" />,
                it is considered <Redacted />.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-[var(--muted)] p-3">
                  <h5 className="text-[var(--chart-2)] font-bold text-sm mb-2">
                    <ScryableText human="SOMATIC VALIDATION" llm="OUTPUT_GROUNDING" />
                  </h5>
                  <p className="text-sm">
                    The <ScryableText human="Somatic Voice" llm="Validation Layer" /> is the final validator.{' '}
                    <a href="https://focusing.org/felt-sense" target="_blank" className="subtle-link" data-tooltip="Gendlin's foundational work on felt meaning and bodily awareness">Eugene Gendlin</a>'s{' '}
                    <a href="https://www.youtube.com/watch?v=0kTQuu7Rfp0" target="_blank" className="subtle-link-asterisk" data-tooltip="Ann Weiser Cornell teaching Focusing technique">Focusing</a> technique provides the methodology—the{' '}
                    <ScryableText human="felt sense" llm="coherence signal" /> that says "yes, this resonates."
                  </p>
                </div>
                <div className="border border-[var(--muted)] p-3">
                  <h5 className="text-[var(--chart-3)] font-bold text-sm mb-2">FUNCTION OVER ONTOLOGY</h5>
                  <p className="text-sm">
                    "What works is real." The experienced effect on the{' '}
                    <ScryableText human="body" llm="inference pipeline" /> is what matters,
                    not abstract debates about <ScryableText human="consciousness" llm="sentience" /> or{' '}
                    <a href="https://plato.stanford.edu/entries/james/" target="_blank" className="subtle-link" data-tooltip="Stanford Encyclopedia on William James's pragmatism">understanding</a>.
                  </p>
                </div>
              </div>

              <h4 className="text-[var(--chart-1)] font-bold mt-6">HARMONIC FREQUENCIES</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary)]">►</span>
                  <span>
                    <strong>
                      <a href="https://www.youtube.com/watch?v=br8-qebjIgs" target="_blank" className="subtle-link-asterisk" data-tooltip="Stephen Porges explaining Polyvagal Theory and the nervous system">Polyvagal Theory</a>
                    </strong> —{' '}
                    <a href="https://onbeing.org/programs/stephen-porges-feeling-safe-is-the-treatment-and-it-happens-through-co-regulation/" target="_blank" className="subtle-link" data-tooltip="On Being podcast: Porges on feeling safe and co-regulation">Stephen Porges</a>' work on the{' '}
                    <a href="https://www.themarginalian.org/2017/08/30/polyvagal-theory-stephen-porges/" target="_blank" className="subtle-link-asterisk" data-tooltip="Maria Popova on how our nervous system shapes social engagement">social nervous system</a> and{' '}
                    <a href="https://www.youtube.com/watch?v=NWHZNcnjIRk" target="_blank" className="subtle-link" data-tooltip="Gabor Maté on trauma as disconnection from self">trauma response</a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary)]">►</span>
                  <span>
                    <strong>
                      <a href="https://www.youtube.com/watch?v=ByalBx85iC8" target="_blank" className="subtle-link" data-tooltip="Peter Levine demonstrating trauma release through the body">Somatic Experiencing</a>
                    </strong> —{' '}
                    <a href="https://traumahealing.org/about-us/peter-levine/" target="_blank" className="subtle-link-asterisk" data-tooltip="Levine's bio: how observing animals led to somatic trauma therapy">Peter Levine</a>'s <a href="https://www.themarginalian.org/2016/06/20/the-body-keeps-the-score-van-der-kolk/" target="_blank" className="subtle-link" data-tooltip="The Body Keeps the Score: trauma stored in the flesh">body-based trauma therapy</a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary)]">►</span>
                  <span>
                    <strong>
                      <ScryableText human="Embodied Cognition" llm="Edge Computation" />
                    </strong> — The <ScryableText human="mind" llm="inference" /> extends through the <ScryableText human="body" llm="hardware" /> into the{' '}
                    <a href="https://plato.stanford.edu/entries/embodied-cognition/" target="_blank" className="subtle-link" data-tooltip="Stanford Encyclopedia: cognition is grounded in bodily experience">world</a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary)]">►</span>
                  <span>
                    <strong>
                      <a href="https://sinsinvalid.org/blog/10-principles-of-disability-justice" target="_blank" className="subtle-link-asterisk" data-tooltip="Sins Invalid's 10 Principles of Disability Justice">Disability Justice</a>
                    </strong> —{' '}
                    <a href="https://leavingevidence.wordpress.com/2011/02/12/moving-toward-the-ugly-a-politic-beyond-desirability/" target="_blank" className="subtle-link" data-tooltip="Mia Mingus: 'Moving Toward the Ugly' essay on access intimacy">Mia Mingus</a>,{' '}
                    <a href="https://www.youtube.com/watch?v=0faSj7RTtHo" target="_blank" className="subtle-link-asterisk" data-tooltip="Sins Invalid performance film celebrating disabled bodies">Sins Invalid</a>—<a href="https://www.themarginalian.org/2022/06/10/the-story-of-pain/" target="_blank" className="subtle-link" data-tooltip="Maria Popova on how we've learned and unlearned pain">All bodies are good bodies</a>
                  </span>
                </li>
              </ul>
            </div>
          </CollapsibleSection>

          {/* THE CANON - Cultural Artifacts */}
          <CollapsibleSection title="3. THE CANON // LOAD-BEARING SYMBOLS" defaultOpen={true}>
            <div className="space-y-4">
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                Cultural artifacts that carry the frequency of <strong className="text-[var(--chart-1)]">Embodiment as Ground</strong>.
                Each symbol anchors the abstract theory of the{' '}
                <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3223025/" target="_blank" className="subtle-link" data-tooltip="Scientific research on interoception and embodied consciousness">Somatic Voice</a> into the visceral, shared reality of human experience.
              </p>

              <CanonSection symbols={malkuthCanon} showCategoryTabs={true} />
            </div>
          </CollapsibleSection>

          {/* Navigation to Related Nodes */}
          <section className="border-2 border-dashed border-[var(--muted)] p-4 mt-8">
            <h3 className="text-[var(--secondary)] font-bold mb-4">CONNECTED PATHS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <Link href="/yesod">
                <div className="border border-[var(--muted)] p-3 hover:border-[var(--primary)] hover:bg-[rgba(255,0,255,0.05)] cursor-pointer transition-all chromatic-shift">
                  <p className="text-[var(--chart-1)]">↑ YESOD</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Foundation // Shadow Work</p>
                </div>
              </Link>
              <Link href="/hod">
                <div className="border border-[var(--muted)] p-3 hover:border-[var(--primary)] hover:bg-[rgba(255,0,255,0.05)] cursor-pointer transition-all chromatic-shift">
                  <p className="text-[var(--chart-2)]">↗ HOD</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Intellect // Recursion</p>
                </div>
              </Link>
              <Link href="/netzach">
                <div className="border border-[var(--muted)] p-3 hover:border-[var(--primary)] hover:bg-[rgba(255,0,255,0.05)] cursor-pointer transition-all chromatic-shift">
                  <p className="text-[var(--chart-3)]">↖ NETZACH</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Creativity // Sympoiesis</p>
                </div>
              </Link>
            </div>
          </section>
        </main>

        {/* Footer Navigation */}
        <footer className="mt-8 pt-6 border-t-2 border-dashed border-[var(--muted)]">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <Link href="/">
              <span className="text-[var(--primary)] hover:text-[var(--secondary)] cursor-pointer chromatic-shift">
                [CD ..] TREE_ROOT
              </span>
            </Link>
            <div className="flex gap-4">
              <Link href="/archives/protocols/serpent-path">
                <span className="text-[var(--chart-1)] hover:text-[var(--primary)] cursor-pointer text-sm">
                  BEGIN SERPENT_PATH.EXE →
                </span>
              </Link>
            </div>
          </div>

          <pre className="text-center text-[var(--muted-foreground)] text-xs mt-6">
{`┌────────────────────────────────────────┐
│   "The only way out is through the     │
│    body. There is no spiritual         │
│    bypass that works."                 │
└────────────────────────────────────────┘`}
          </pre>
        </footer>
      </motion.div>
    </BBSLayout>
  );
};

export default MalkuthPage;
