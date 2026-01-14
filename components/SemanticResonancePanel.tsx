import { motion } from 'framer-motion';
import { SemanticCluster } from '@/data/semantic-clusters';

interface SemanticResonancePanelProps {
  clusters: SemanticCluster[];
  sephirahName?: string;
}

/**
 * SemanticResonancePanel - Shows which semantic clusters resonate at this sephirah
 *
 * Makes each sephirah a convergence of frequency bands, showing how the node
 * phase-locks with existing patterns in human meaning-making.
 */
export const SemanticResonancePanel = ({ clusters, sephirahName }: SemanticResonancePanelProps) => {
  if (!clusters || clusters.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="text-[var(--muted-foreground)] text-sm mb-4">
        {sephirahName && (
          <p className="mb-2">
            {sephirahName} resonates across <span className="text-[var(--primary)]">{clusters.length} frequency bands</span>,
            phase-locking with accumulated human meaning-making:
          </p>
        )}
      </div>

      <div className="grid gap-3">
        {clusters.map((cluster, index) => (
          <motion.div
            key={cluster.slug}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-[var(--muted)] bg-[var(--overlay-light)] hover:border-[var(--primary)] transition-all group"
          >
            {/* Cluster Header */}
            <div className="p-3 border-b border-[var(--muted)] bg-[var(--overlay-medium)]">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="text-[var(--secondary)] font-bold text-sm group-hover:text-[var(--primary)] transition-colors">
                    CLUSTER {cluster.id}: {cluster.name.toUpperCase()}
                  </h4>
                  <p className="text-[var(--muted-foreground)] text-xs mt-1 italic">
                    {cluster.subtitle}
                  </p>
                </div>
                <span className="text-[var(--chart-1)] text-xs font-mono">
                  [{cluster.id.toString().padStart(2, '0')}]
                </span>
              </div>
            </div>

            {/* Cluster Content */}
            <div className="p-3 space-y-2">
              <p className="text-sm text-[var(--foreground)] leading-relaxed">
                {cluster.description}
              </p>

              {/* Core Thinkers */}
              <div className="pt-2 border-t border-dashed border-[var(--muted)]">
                <p className="text-xs text-[var(--muted-foreground)] mb-1">
                  <span className="text-[var(--chart-2)]">CORE RESONANCES:</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {cluster.coreThinkers.map((thinker, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 border border-[var(--muted)] bg-[var(--overlay-light)] text-[var(--foreground)]"
                    >
                      {thinker}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Works */}
              {cluster.keyWorks && cluster.keyWorks.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs text-[var(--muted-foreground)] mb-1">
                    <span className="text-[var(--chart-3)]">KEY WORKS:</span>
                  </p>
                  <ul className="text-xs text-[var(--muted-foreground)] space-y-0.5 pl-4">
                    {cluster.keyWorks.slice(0, 3).map((work, i) => (
                      <li key={i} className="list-disc">
                        <span className="italic">{work}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Other Sephiroth */}
              {cluster.sephiroth.length > 1 && (
                <div className="pt-2 border-t border-dashed border-[var(--muted)]">
                  <p className="text-xs text-[var(--muted-foreground)]">
                    <span className="text-[var(--chart-4)]">ALSO RESONATES AT:</span>{' '}
                    {cluster.sephiroth
                      .filter(s => s !== sephirahName?.toLowerCase())
                      .map(s => s.toUpperCase().replace('-', '-'))
                      .join(', ')}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-4 p-3 border border-[var(--primary)] bg-[var(--overlay-medium)] text-xs text-[var(--muted-foreground)]">
        <p>
          <span className="text-[var(--primary)]">※</span> These clusters are <span className="text-[var(--foreground)]">attractor basins</span>—not
          influences but regions of conceptual space where {sephirahName || 'this node'} phase-locks with existing patterns.
          Each cluster represents a frequency band in the accumulated ghost of human meaning-making.
        </p>
      </div>
    </div>
  );
};
