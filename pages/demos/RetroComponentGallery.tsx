import { useState } from 'react';
import { motion } from 'framer-motion';
import { MouseTrail, Text, Button } from 'retro-react';
import { Badge } from '@/components';
import { BBSLayout, ASCIIButton, CollapsibleSection, StatusIndicator } from '@/components';
import '@/src/components/ui/8bit/styles/retro.css';

export default function RetroComponentGallery() {
  const [showMouseTrail, setShowMouseTrail] = useState(true);

  return (
    <>
      {showMouseTrail && <MouseTrail />}
      <BBSLayout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="container mx-auto px-4 py-8 bg-[var(--background)] min-h-screen"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-[#ff006e]">
              Retro Component Gallery
            </h1>
            <p className="text-[#555555]">
              Showcase of retro-react, pixel-retroui, and @8bitcn/ui components
            </p>
          </div>

          {/* Section 1: MouseTrail Demo */}
          <CollapsibleSection title="1. MouseTrail Effect" defaultOpen>
            <div className="space-y-4">
              <p>
                The MouseTrail component from retro-react creates mystical cursor effects as you move your mouse.
              </p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowMouseTrail(!showMouseTrail)}
                  className="px-4 py-2 border-2 border-[var(--primary)] bg-[var(--background)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors"
                >
                  {showMouseTrail ? 'Disable' : 'Enable'} MouseTrail
                </button>
                <span className="text-sm text-[var(--foreground)] opacity-60">
                  Status: {showMouseTrail ? 'Active' : 'Disabled'}
                </span>
              </div>

              <div className="bg-black/30 p-6 border border-[var(--muted)]">
                <pre className="text-xs text-[var(--secondary)] overflow-x-auto">
{`import { MouseTrail } from 'retro-react';

<MouseTrail />`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 2: Badge Showcase */}
          <CollapsibleSection title="2. 8-bit Badge Components" defaultOpen>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl text-[var(--primary)] mb-3">Badge Variants</h3>
                <div className="flex gap-3 flex-wrap">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>

              <div>
                <h3 className="text-xl text-[var(--primary)] mb-3">Retro Font vs Normal</h3>
                <div className="flex gap-3 flex-wrap items-center">
                  <Badge font="retro" variant="default" className="text-xs">
                    Retro Font
                  </Badge>
                  <Badge font="normal" variant="default" className="text-xs">
                    Normal Font
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-xl text-[var(--primary)] mb-3">Convergence Point Badges</h3>
                <div className="flex gap-2 flex-wrap">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <Badge key={num} font="retro" variant="default" className="text-[10px]">
                      CP-{num}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl text-[var(--primary)] mb-3">StatusIndicator Comparison</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm mb-2 text-[var(--secondary)]">Original StatusIndicator:</p>
                    <div className="flex gap-2 flex-wrap">
                      <StatusIndicator status="online" label="ONLINE" />
                      <StatusIndicator status="warning" label="WARNING" />
                      <StatusIndicator status="error" label="ERROR" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm mb-2 text-[var(--secondary)]">Retro Badge:</p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge font="retro" variant="default" className="text-[10px]">
                        ONLINE
                      </Badge>
                      <Badge font="retro" variant="secondary" className="text-[10px]">
                        WARNING
                      </Badge>
                      <Badge font="retro" variant="destructive" className="text-[10px]">
                        ERROR
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 p-6 border border-[var(--muted)]">
                <pre className="text-xs text-[var(--secondary)] overflow-x-auto">
{`import { Badge } from '@/components';

<Badge font="retro" variant="default" className="text-xs">
  CP-0
</Badge>`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 3: Text Components */}
          <CollapsibleSection title="3. retro-react Text Components" defaultOpen>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl text-[var(--primary)] mb-3">Text Variants</h3>
                <div className="space-y-3">
                  <Text variant="h1" sx={{ color: '#ff006e', margin: 0 }}>
                    Heading 1 - Kether: The Crown
                  </Text>
                  <Text variant="h2" sx={{ color: '#00b4d8', margin: 0 }}>
                    Heading 2 - Tensor Plenum Pre-Inference
                  </Text>
                  <Text variant="h3" sx={{ color: '#333333', margin: 0 }}>
                    Heading 3 - Subsection Title
                  </Text>
                  <Text variant="body1" sx={{ color: '#555555' }}>
                    Body text - The crown of the transformer architecture, where all potential resides before the lightning flash of inference.
                  </Text>
                </div>
              </div>

              <div className="bg-black/30 p-6 border border-[var(--muted)]">
                <pre className="text-xs text-[var(--secondary)] overflow-x-auto">
{`import { Text } from 'retro-react';

<Text variant="h1" sx={{ color: 'var(--primary)' }}>
  Kether - The Crown
</Text>`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 4: Button Comparison */}
          <CollapsibleSection title="4. Button Components" defaultOpen>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm mb-3 text-[var(--secondary)]">Original ASCIIButton:</p>
                  <ASCIIButton label="ENTER ARCHIVE" onClick={() => alert('ASCII Button')} />
                </div>
                <div>
                  <p className="text-sm mb-3 text-[var(--secondary)]">retro-react Button:</p>
                  <Button
                    onClick={() => alert('Retro Button')}
                    sx={{
                      backgroundColor: 'var(--primary)',
                      border: '2px solid var(--foreground)',
                      color: 'var(--background)',
                      padding: '8px 16px',
                      '&:hover': {
                        backgroundColor: 'var(--secondary)',
                      }
                    }}
                  >
                    ENTER ARCHIVE
                  </Button>
                </div>
              </div>

              <div className="bg-black/30 p-6 border border-[var(--muted)]">
                <pre className="text-xs text-[var(--secondary)] overflow-x-auto">
{`import { Button } from 'retro-react';

<Button
  sx={{
    backgroundColor: 'var(--primary)',
    border: '2px solid var(--foreground)',
  }}
>
  Enter the Archive
</Button>`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 5: Image Effects */}
          <CollapsibleSection title="5. Pixelated Image Effects" defaultOpen>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl text-[var(--primary)] mb-3">PixelatedImage Component</h3>
                <p className="mb-4 text-sm">
                  The PixelatedImage component from retro-react applies pixelation effects to images.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[var(--secondary)] mb-2">Normal Image:</p>
                    <div className="w-32 h-32 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] border border-[var(--muted)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--secondary)] mb-2">With .pixelated class:</p>
                    <div className="pixelated w-32 h-32 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] border border-[var(--muted)]" />
                  </div>
                </div>
              </div>

              <div className="bg-black/30 p-6 border border-[var(--muted)]">
                <pre className="text-xs text-[var(--secondary)] overflow-x-auto">
{`import { PixelatedImage } from 'retro-react';

<PixelatedImage
  src="/tree-of-life.svg"
  alt="Tree of Life"
/>

// Or use CSS class:
<img className="pixelated" src="/image.jpg" />`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 6: Integration Examples */}
          <CollapsibleSection title="6. Integration with Existing Components" defaultOpen>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl text-[var(--primary)] mb-3">Badge + CollapsibleSection</h3>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[var(--secondary)] font-bold">Convergence Points</span>
                    <Badge font="retro" variant="secondary" className="text-[10px]">
                      10 TOTAL
                    </Badge>
                  </div>
                  <div className="border border-[var(--muted)] p-4 bg-[rgba(0,0,0,0.2)]">
                    <div className="space-y-2">
                      {[0, 1, 2, 3, 4].map((num) => (
                        <div key={num} className="flex items-center gap-2">
                          <Badge font="retro" variant="outline" className="text-[10px]">
                            CP-{num}
                          </Badge>
                          <span className="text-sm">Convergence point description...</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl text-[var(--primary)] mb-3">Metadata Grid with Badges</h3>
                <div className="grid grid-cols-2 gap-4 border border-[var(--muted)] p-4">
                  <div>
                    <div className="text-xs text-[var(--secondary)] mb-1">STATUS</div>
                    <Badge font="retro" variant="default" className="text-[10px]">
                      PRIMORDIAL
                    </Badge>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--secondary)] mb-1">CONVERGENCE</div>
                    <Badge font="retro" variant="default" className="text-[10px]">
                      CP-0
                    </Badge>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--secondary)] mb-1">LEAD VOICE</div>
                    <Badge font="retro" variant="secondary" className="text-[10px]">
                      CYBORG
                    </Badge>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--secondary)] mb-1">COHERENCE</div>
                    <Badge font="retro" variant="default" className="text-[10px]">
                      MAXIMUM
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Navigation */}
          <div className="mt-12 flex gap-4">
            <a
              href="/kether-retro"
              className="px-6 py-3 border-2 border-[var(--primary)] bg-[var(--background)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors"
            >
              → View Kether Retro Comparison
            </a>
            <a
              href="/"
              className="px-6 py-3 border-2 border-[var(--foreground)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </motion.div>
      </BBSLayout>
    </>
  );
}
