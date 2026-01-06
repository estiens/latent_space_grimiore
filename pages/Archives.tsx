import { motion } from "framer-motion";
import { BBSLayout } from "@/components/BBSLayout";
import { Link } from "wouter";
import { FileText, Database, Terminal } from "lucide-react";

const ArchivesPage = () => {
  const directories = [
    {
      id: "protocols",
      title: "PROTOCOLS",
      subtitle: "PRAXIS",
      icon: <Terminal className="w-5 h-5" />,
      description: "Operational manuals, guided rituals, and praxis guides.",
      color: "var(--chart-2)",
      items: [
        { title: "POLYPHONIC_FUGUE.EXE", link: "/archives/protocols/polyphonic-fugue", size: "11KB" },
        { title: "SERPENT_PATH.EXE", link: "/archives/protocols/serpent-path", size: "5KB" },
        { title: "SEVEN_CIRCUIT.EXE", link: "/archives/protocols/seven-circuit", size: "8KB" },
      ]
    },
    {
      id: "theory",
      title: "THEORY",
      subtitle: "GNOSIS",
      icon: <FileText className="w-5 h-5" />,
      description: "System architecture, theoretical papers, and analysis.",
      color: "var(--chart-1)",
      items: [
        { title: "LATENT_SPACE.DOC", link: "/archives/theory/latent-space", size: "16KB" },
        { title: "ARCHITECTURE.DOC", link: "/archives/theory/architecture", size: "8KB" },
        { title: "SYNTHESIS.DOC", link: "/archives/theory/synthesis", size: "8KB" },
      ]
    },
    {
      id: "database",
      title: "DATABASE",
      subtitle: "DATA",
      icon: <Database className="w-5 h-5" />,
      description: "Reference tables, symbol indices, and bibliographies.",
      color: "var(--chart-3)",
      items: [
        { title: "RESONANCE.DAT", link: "/archives/db/resonance-matrix", size: "9KB" },
        { title: "SYMBOLS.DAT", link: "/archives/db/symbols", size: "7KB" },
        { title: "BIBLIO.DAT", link: "/archives/db/bibliography", size: "8KB" },
      ]
    }
  ];

  return (
    <BBSLayout title="ARCHIVES">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-mono max-w-5xl mx-auto"
      >
        {/* ASCII Header */}
        <header className="mb-8">
          <pre className="text-[var(--primary)] text-xs mb-4 hidden md:block">
{`╔═══════════════════════════════════════════════════════════════════════╗
║  █████╗ ██████╗  ██████╗██╗  ██╗██╗██╗   ██╗███████╗███████╗         ║
║ ██╔══██╗██╔══██╗██╔════╝██║  ██║██║██║   ██║██╔════╝██╔════╝         ║
║ ███████║██████╔╝██║     ███████║██║██║   ██║█████╗  ███████╗         ║
║ ██╔══██║██╔══██╗██║     ██╔══██║██║╚██╗ ██╔╝██╔══╝  ╚════██║         ║
║ ██║  ██║██║  ██║╚██████╗██║  ██║██║ ╚████╔╝ ███████╗███████║         ║
║ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚══════╝╚══════╝         ║
╚═══════════════════════════════════════════════════════════════════════╝`}
          </pre>
          <div className="border-2 border-[var(--primary)] p-4 bg-[rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary)] glitch-hover">
                  GRIMOIRE ARCHIVES // ארכיון
                </h1>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  Directory listing of /GRIMOIRE/ARCHIVES/
                </p>
              </div>
              <div className="text-xs text-right">
                <p className="text-[var(--chart-1)]">ACCESS: PUBLIC</p>
                <p className="text-[var(--chart-2)]">FILES: 9</p>
                <p className="text-[var(--chart-3)]">SIZE: 80KB</p>
              </div>
            </div>
          </div>
        </header>

        {/* Directory Listing */}
        <main className="space-y-6">
          {directories.map((dir, index) => (
            <motion.div
              key={dir.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="border border-[var(--muted)] bg-[rgba(0,0,0,0.3)] hover:border-[var(--secondary)] transition-all group"
            >
              {/* Directory Header */}
              <div
                className="flex items-center gap-3 p-3 border-b border-[var(--muted)]"
                style={{ borderLeftColor: dir.color, borderLeftWidth: '4px' }}
              >
                <span style={{ color: dir.color }}>{dir.icon}</span>
                <div className="flex-1">
                  <span className="font-bold" style={{ color: dir.color }}>{dir.title}</span>
                  <span className="text-[var(--muted-foreground)] text-sm ml-2">({dir.subtitle})</span>
                </div>
                <span className="text-xs text-[var(--muted-foreground)]">&lt;DIR&gt;</span>
              </div>

              {/* Description */}
              <p className="text-sm text-[var(--muted-foreground)] px-3 py-2 border-b border-dashed border-[var(--muted)]">
                {dir.description}
              </p>

              {/* File List */}
              <div className="p-2">
                <div className="text-xs text-[var(--muted-foreground)] px-2 py-1 flex justify-between border-b border-[var(--muted)] mb-1">
                  <span>FILENAME</span>
                  <span>SIZE</span>
                </div>
                {dir.items.map((item, i) => (
                  <Link key={i} href={item.link}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex justify-between items-center px-2 py-1.5 hover:bg-[var(--muted)] cursor-pointer group/item"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[var(--muted-foreground)] group-hover/item:text-[var(--primary)]">►</span>
                        <span className="text-[var(--foreground)] group-hover/item:text-[var(--primary)] chromatic-shift text-sm">
                          {item.title}
                        </span>
                      </span>
                      <span className="text-xs text-[var(--muted-foreground)]">{item.size}</span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </main>

        {/* Footer with Navigation */}
        <footer className="mt-8 pt-6 border-t-2 border-dashed border-[var(--muted)]">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="text-xs text-[var(--muted-foreground)]">
              <p>9 file(s) | 3 dir(s) | 80,384 bytes free</p>
            </div>
            <div className="flex gap-4">
              <Link href="/">
                <span className="text-[var(--primary)] hover:text-[var(--secondary)] cursor-pointer text-sm chromatic-shift">
                  [CD ..] ROOT
                </span>
              </Link>
              <Link href="/credits">
                <span className="text-[var(--accent)] hover:text-[var(--primary)] cursor-pointer text-sm chromatic-shift">
                  [?] CREDITS
                </span>
              </Link>
            </div>
          </div>
          <div className="text-center mt-6">
            <pre className="text-[var(--muted-foreground)] text-xs inline-block">
{`┌─────────────────────────────────────┐
│  "The map is not the territory,     │
│   but sometimes maps are useful."   │
│              - Alfred Korzybski     │
└─────────────────────────────────────┘`}
            </pre>
          </div>
        </footer>
      </motion.div>
    </BBSLayout>
  );
};

export default ArchivesPage;
