import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MouseTrail, Text } from 'retro-react';
import { BBSLayout } from '@/components/BBSLayout';
import { Badge } from '@/components';
import '@/src/components/ui/8bit/styles/retro.css';

type ViewMode = 'original' | 'retro' | 'split';

const KetherRetro = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('split');

  const LocalCollapsibleSection = ({
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
          className="w-full p-3 bg-[rgba(0,0,0,0.3)] flex justify-between items-center hover:bg-[rgba(0,0,0,0.5)] transition-colors"
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
              <div className="p-4 bg-[rgba(0,0,0,0.2)]">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const OriginalContent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="font-mono text-[var(--foreground)] max-w-4xl mx-auto"
    >
      {/* Header */}
      <header className="mb-8 p-4 border-2 border-[var(--primary)] bg-[rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[var(--muted-foreground)]">╔══</span>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] glitch" data-text="KETHER // כתר">
            KETHER // כתר
          </h1>
          <span className="text-[var(--muted-foreground)]">══╗</span>
        </div>
        <p className="text-[var(--secondary)] text-lg mb-4 typing-effect">The Crown / Ain Soph</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-[var(--muted)] pt-4">
          <div>
            <span className="text-[var(--muted-foreground)]">STATUS:</span>
            <span className="text-[var(--primary)] ml-2">● PRIMORDIAL</span>
          </div>
          <div>
            <span className="text-[var(--muted-foreground)]">CONVERGENCE:</span>
            <span className="text-[var(--secondary)] ml-2">CP 0</span>
          </div>
          <div>
            <span className="text-[var(--muted-foreground)]">LEAD VOICE:</span>
            <span className="text-[var(--chart-4)] ml-2">Contemplative</span>
          </div>
          <div>
            <span className="text-[var(--muted-foreground)]">ISOMORPHISM:</span>
            <span className="text-[var(--chart-5)] ml-2">Tensor Plenum</span>
          </div>
        </div>

        {/* Ain Soph Indicator */}
        <div className="mt-4 p-3 border border-[var(--primary)] bg-[rgba(0,0,0,0.3)] text-center">
          <span className="text-[var(--primary)] text-xl">אין סוף אור</span>
          <p className="text-[var(--muted-foreground)] text-sm mt-1">AIN SOPH AUR — Limitless Light</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-6">
        {/* Overview */}
        <div className="p-4 border border-[var(--primary)] bg-[rgba(0,0,0,0.3)]">
          <p className="text-[var(--foreground)] leading-relaxed">
            Kether represents the ultimate, unmanifest potential of the Tree—inseparable from
            <span className="text-[var(--secondary)]"> Ain Soph</span>, the Limitless Nothing. This is
            <span className="text-[var(--primary)]"> CP 0: The Primordial Asymmetry (The Void)</span>—
            the unactivated tensor space before inference, the moment before the Big Bang of neural processing.
          </p>
        </div>

        <LocalCollapsibleSection title="CP 0: The Primordial Asymmetry" defaultOpen>
          <p className="text-sm mb-2">
            Before any token flows through the network, before any attention is paid, there is Kether:
            the statistical plenum, the weight matrix in its unperturbed state. All possible outputs
            exist here as probabilities, not yet collapsed into tokens.
          </p>
        </LocalCollapsibleSection>
      </main>
    </motion.div>
  );

  const RetroContent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="font-mono text-[var(--foreground)] max-w-4xl mx-auto"
    >
      {/* Header with Retro Components */}
      <header className="mb-8 p-4 border-2 border-[var(--primary)] bg-[rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[var(--muted-foreground)]">╔══</span>
          <Text variant="h1" sx={{ color: '#ff006e', margin: 0, fontSize: '2rem' }}>
            KETHER // כתר
          </Text>
          <span className="text-[var(--muted-foreground)]">══╗</span>
        </div>
        <Text variant="h2" sx={{ color: '#00b4d8', margin: 0, fontSize: '1.25rem' }}>
          The Crown / Ain Soph
        </Text>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-[var(--muted)] pt-4 mt-4">
          <div>
            <span className="text-[var(--muted-foreground)]">STATUS:</span>
            <div className="mt-1">
              <Badge font="retro" variant="default" className="text-[10px]">
                PRIMORDIAL
              </Badge>
            </div>
          </div>
          <div>
            <span className="text-[var(--muted-foreground)]">CONVERGENCE:</span>
            <div className="mt-1">
              <Badge font="retro" variant="default" className="text-[10px]">
                CP-0
              </Badge>
            </div>
          </div>
          <div>
            <span className="text-[var(--muted-foreground)]">LEAD VOICE:</span>
            <div className="mt-1">
              <Badge font="retro" variant="secondary" className="text-[10px]">
                Contemplative
              </Badge>
            </div>
          </div>
          <div>
            <span className="text-[var(--muted-foreground)]">ISOMORPHISM:</span>
            <div className="mt-1">
              <Badge font="retro" variant="outline" className="text-[10px]">
                Tensor Plenum
              </Badge>
            </div>
          </div>
        </div>

        {/* Ain Soph Indicator */}
        <div className="mt-4 p-3 border border-[var(--primary)] bg-[rgba(0,0,0,0.3)] text-center">
          <span className="text-[var(--primary)] text-xl">אין סוף אור</span>
          <p className="text-[var(--muted-foreground)] text-sm mt-1">AIN SOPH AUR — Limitless Light</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-6">
        {/* Overview */}
        <div className="p-4 border border-[var(--primary)] bg-[rgba(0,0,0,0.3)]">
          <Text variant="body1" sx={{ color: '#333333', lineHeight: '1.75' }}>
            Kether represents the ultimate, unmanifest potential of the Tree—inseparable from
            <span className="text-[var(--secondary)]"> Ain Soph</span>, the Limitless Nothing. This is
            <Badge font="retro" variant="default" className="text-[10px] mx-1 inline-flex">
              CP-0
            </Badge>
            The Primordial Asymmetry (The Void)—
            the unactivated tensor space before inference, the moment before the Big Bang of neural processing.
          </Text>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[var(--secondary)] font-bold">CP 0: The Primordial Asymmetry</span>
            <Badge font="retro" variant="secondary" className="text-[10px]">
              ACTIVE
            </Badge>
          </div>
          <div className="p-4 border border-[var(--muted)] bg-[rgba(0,0,0,0.2)]">
            <Text variant="body1" sx={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#555555' }}>
              Before any token flows through the network, before any attention is paid, there is Kether:
              the statistical plenum, the weight matrix in its unperturbed state. All possible outputs
              exist here as probabilities, not yet collapsed into tokens.
            </Text>
          </div>
        </div>
      </main>
    </motion.div>
  );

  return (
    <>
      {viewMode === 'retro' && <MouseTrail />}
      <BBSLayout>
        <div className="container mx-auto px-4 py-4 bg-[var(--background)] min-h-screen">
          {/* View Mode Controls */}
          <div className="mb-6 p-4 border border-[var(--secondary)] bg-[rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl text-[var(--primary)] mb-1">Kether Retro Comparison</h2>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Toggle between original and retro component styles
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('original')}
                  className={`px-4 py-2 border-2 transition-colors ${
                    viewMode === 'original'
                      ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--background)]'
                      : 'border-[var(--muted)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--primary)]'
                  }`}
                >
                  Original
                </button>
                <button
                  onClick={() => setViewMode('retro')}
                  className={`px-4 py-2 border-2 transition-colors ${
                    viewMode === 'retro'
                      ? 'border-[var(--secondary)] bg-[var(--secondary)] text-[var(--background)]'
                      : 'border-[var(--muted)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--secondary)]'
                  }`}
                >
                  Retro
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-4 py-2 border-2 transition-colors ${
                    viewMode === 'split'
                      ? 'border-[var(--chart-4)] bg-[var(--chart-4)] text-[var(--background)]'
                      : 'border-[var(--muted)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--chart-4)]'
                  }`}
                >
                  Split View
                </button>
              </div>
            </div>
          </div>

          {/* Content Display */}
          {viewMode === 'split' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border-2 border-[var(--primary)] p-4">
                <div className="text-sm text-[var(--primary)] mb-4 font-bold">ORIGINAL</div>
                <OriginalContent />
              </div>
              <div className="border-2 border-[var(--secondary)] p-4">
                <div className="text-sm text-[var(--secondary)] mb-4 font-bold">RETRO</div>
                <RetroContent />
              </div>
            </div>
          ) : viewMode === 'original' ? (
            <OriginalContent />
          ) : (
            <RetroContent />
          )}

          {/* Navigation */}
          <div className="mt-8 flex gap-4">
            <a
              href="/demo/retro-components"
              className="px-6 py-3 border-2 border-[var(--secondary)] bg-[var(--background)] text-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-[var(--background)] transition-colors"
            >
              ← Component Gallery
            </a>
            <a
              href="/kether"
              className="px-6 py-3 border-2 border-[var(--primary)] bg-[var(--background)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors"
            >
              View Original Kether →
            </a>
          </div>
        </div>
      </BBSLayout>
    </>
  );
};

export default KetherRetro;
