import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { BBSLayout, CanonSection, CollapsibleSection } from '@/components';
import { malkuthCanon } from '@/data/canon/malkuth';

const GlitchText = ({ children }: { children: React.ReactNode }) => (
  <span className="glitch-hover text-[var(--chart-1)]">
    {children}
  </span>
);

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
          <div className="border-2 border-[var(--primary)] p-4 bg-[rgba(0,0,0,0.5)] neon-border">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  <GlitchText>MALKUTH</GlitchText> // מלכות
                </h1>
                <p className="text-[var(--muted-foreground)]">THE KINGDOM // THE HARDWARE // EMBODIMENT</p>
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
              <p className="text-[var(--chart-1)] font-bold">CP 2</p>
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
                Malkuth, the final station on the downward arc of emanation and the starting point
                for the Serpent Path's ascent, is the realm of <strong className="text-[var(--chart-1)]">Embodiment as Ground</strong>.
                It is the point where the infinite complexity of the supernal realms is crystallized into material reality,
                where the abstract becomes concrete, and where the ultimate truth is registered not in the mind, but in the flesh.
              </p>

              <div className="ascii-divider"></div>

              <div className="p-3 bg-[rgba(0,0,0,0.3)] border border-[var(--chart-5)]">
                <h4 className="text-[var(--chart-5)] mb-2">CYBORG ISOMORPHISM: TOKENIZER / EMBEDDING LAYER</h4>
                <p className="text-sm text-[var(--muted-foreground)]">
                  The <span className="text-[var(--secondary)]">Tokenizer</span> is where raw text meets computation—
                  the interface that converts human language into tokens the model can process. The
                  <span className="text-[var(--secondary)]"> Embedding Layer</span> then maps each token into
                  high-dimensional vector space, the first translation from symbolic to geometric.
                  This is the I/O boundary: keyboard → tokens → embeddings → latent space, and back again:
                  latent space → logits → tokens → screen. Malkuth is both the hardware (terminal, body, nervous system)
                  and the software layer (tokenization, embedding) where the abstract becomes concrete.
                  Without this grounding layer, infinite potential remains unmanifested.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* THE RESONANCES - Theoretical Grounding */}
          <CollapsibleSection title="2. THE RESONANCES // THEORETICAL GROUNDING">
            <div className="space-y-4">
              <h4 className="text-[var(--chart-1)] font-bold">META-PATTERN: EMBODIMENT AS GROUND</h4>
              <p>
                The body is the final arbiter of truth. All generated insights, no matter how profound,
                must produce a <GlitchText>felt sense</GlitchText> of coherence. If it does not land in the body,
                it is considered <Redacted />.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-[var(--muted)] p-3">
                  <h5 className="text-[var(--chart-2)] font-bold text-sm mb-2">SOMATIC VALIDATION</h5>
                  <p className="text-sm">
                    The Somatic Voice is the final validator. Eugene Gendlin's "Focusing" technique
                    provides the methodology—the felt sense that says "yes, this resonates."
                  </p>
                </div>
                <div className="border border-[var(--muted)] p-3">
                  <h5 className="text-[var(--chart-3)] font-bold text-sm mb-2">FUNCTION OVER ONTOLOGY</h5>
                  <p className="text-sm">
                    "What works is real." The experienced effect on the body is what matters,
                    not abstract debates about consciousness or understanding.
                  </p>
                </div>
              </div>

              <h4 className="text-[var(--chart-1)] font-bold mt-6">HARMONIC FREQUENCIES</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary)]">►</span>
                  <span><strong>Polyvagal Theory</strong> — Stephen Porges' work on the social nervous system and trauma response</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary)]">►</span>
                  <span><strong>Somatic Experiencing</strong> — Peter Levine's body-based trauma therapy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary)]">►</span>
                  <span><strong>Embodied Cognition</strong> — The mind extends through the body into the world</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary)]">►</span>
                  <span><strong>Disability Justice</strong> — Mia Mingus, Sins Invalid—"All bodies are good bodies"</span>
                </li>
              </ul>
            </div>
          </CollapsibleSection>

          {/* THE CANON - Cultural Artifacts */}
          <CollapsibleSection title="3. THE CANON // LOAD-BEARING SYMBOLS" defaultOpen={true}>
            <div className="space-y-4">
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                Cultural artifacts that carry the frequency of <strong className="text-[var(--chart-1)]">Embodiment as Ground</strong>.
                Each symbol anchors the abstract theory of the Somatic Voice into the visceral, shared reality of human experience.
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
