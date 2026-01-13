// Example integrations for new retro component libraries
// This file is for reference - copy patterns into actual components

import { MouseTrail, PixelatedImage, Text, Button } from 'retro-react';
import { Badge } from '@/components';

// ============================================================================
// Example 1: MouseTrail for Tree of Life mystical effects
// ============================================================================
// export const TreeOfLifeWithTrail = () => {
//   return (
//     <div>
//       <MouseTrail />
//       <TreeOfLife />
//     </div>
//   );
// };

// ============================================================================
// Example 2: 8bitcn Badge for Convergence Points
// ============================================================================
export const ConvergencePointBadge = ({ number }: { number: number }) => {
  return (
    <Badge font="retro" variant="default" className="text-xs">
      CP-{number}
    </Badge>
  );
};

// Multiple badges with different variants
export const SephirahMetadata = () => {
  return (
    <div className="flex gap-2 flex-wrap">
      <Badge font="retro" variant="default">
        Kether
      </Badge>
      <Badge font="retro" variant="secondary">
        Active
      </Badge>
      <Badge font="retro" variant="outline">
        Tensor Plenum
      </Badge>
    </div>
  );
};

// ============================================================================
// Example 3: PixelatedImage for Tree of Life diagram
// ============================================================================
export const PixelatedTreeDiagram = () => {
  return (
    <PixelatedImage
      src="/tree-of-life.svg"
      alt="Tree of Life"
      style={{ width: '100%', maxWidth: '600px' }}
    />
  );
};

// ============================================================================
// Example 4: retro-react Text with variants
// ============================================================================
export const RetroHeadings = () => {
  return (
    <div>
      <Text variant="h1" sx={{ color: 'var(--primary)' }}>
        Kether - The Crown
      </Text>
      <Text variant="h2" sx={{ color: 'var(--secondary)' }}>
        Tensor Plenum Pre-Inference
      </Text>
      <Text variant="body1">
        The crown of the transformer architecture, where all potential resides
        before the lightning flash of inference.
      </Text>
    </div>
  );
};

// ============================================================================
// Example 5: retro-react Button with custom styles
// ============================================================================
export const RetroButton = () => {
  return (
    <Button
      sx={{
        backgroundColor: 'var(--primary)',
        border: '2px solid var(--foreground)',
        color: 'var(--background)',
        '&:hover': {
          backgroundColor: 'var(--secondary)',
        }
      }}
    >
      Enter the Archive
    </Button>
  );
};

// ============================================================================
// Example 6: Combining Badge with existing components
// ============================================================================
// import { CollapsibleSection } from '@/components/ui/CollapsibleSection';

// Note: CollapsibleSection title prop expects string, not ReactNode
// For complex titles with badges, use manual div structure instead
// See pages/demos/RetroComponentGallery.tsx for working example

// ============================================================================
// Example 7: StatusIndicator replacement with 8bitcn Badge
// ============================================================================
// Before (old StatusIndicator):
// <StatusIndicator status="online" label="READY" />

// After (8bitcn Badge):
export const StatusBadge = ({
  status,
  label
}: {
  status: 'online' | 'warning' | 'error';
  label: string;
}) => {
  const variant = {
    online: 'default',
    warning: 'secondary',
    error: 'destructive',
  }[status];

  return (
    <Badge font="retro" variant={variant as any} className="text-[10px]">
      {label}
    </Badge>
  );
};

// ============================================================================
// Example 8: Pixelated class for images
// ============================================================================
export const PixelatedSymbolImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="pixelated w-full h-auto border border-[var(--muted)]"
    />
  );
};

// ============================================================================
// Example 9: Retro font class for emphasis
// ============================================================================
export const RetroEmphasis = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="retro text-[var(--primary)] text-sm">
      {children}
    </span>
  );
};

// ============================================================================
// Example 10: Full page with MouseTrail
// ============================================================================
import { motion } from 'framer-motion';
import { BBSLayout } from '@/components';

export const EnhancedSephirahPage = () => {
  return (
    <>
      <MouseTrail />
      <BBSLayout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen"
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
              <Text variant="h1" sx={{ margin: 0 }}>
                Kether
              </Text>
              <Badge font="retro" variant="default">
                Active
              </Badge>
            </div>

            {/* Content here */}
          </div>
        </motion.div>
      </BBSLayout>
    </>
  );
};
