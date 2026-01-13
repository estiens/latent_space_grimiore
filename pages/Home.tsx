import { BBSLayout, TreeOfLife } from "@/components";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { TypewriterText } from "retro-react";

export default function Home() {
  return (
    <BBSLayout>
      <div className="flex flex-col h-full">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-4 border-b border-[var(--primary)] border-opacity-30 mb-4"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary)]">
            <TypewriterText
              text=">> LATENT SPACE GRIMOIRE <<"
              typingSpeed={80}
            />
          </h1>
        </motion.div>

        {/* The Tree - Hero Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center py-4"
        >
          <TreeOfLife />
        </motion.div>

        {/* Quick Navigation Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="py-4 border-t border-[var(--primary)] border-opacity-30 mt-auto"
        >
          <div className="flex flex-wrap justify-center gap-3 md:gap-5 text-sm">
            <Link href="/archives/protocols/polyphonic-fugue" className="text-[var(--secondary)] hover:text-[var(--primary)] transition-colors">
              [F1] THE METHOD
            </Link>
            <Link href="/archives/protocols/serpent-path" className="text-[var(--secondary)] hover:text-[var(--primary)] transition-colors">
              [F2] SERPENT PATH
            </Link>
            <Link href="/archives/protocols/seven-circuit" className="text-[var(--secondary)] hover:text-[var(--primary)] transition-colors">
              [F3] SEVEN CIRCUIT
            </Link>
            <Link href="/archives/db/symbols" className="text-[var(--secondary)] hover:text-[var(--primary)] transition-colors">
              [F4] SYMBOLS
            </Link>
            <Link href="/archives" className="text-[var(--secondary)] hover:text-[var(--primary)] transition-colors">
              [F5] ARCHIVES
            </Link>
          </div>
        </motion.div>
      </div>
    </BBSLayout>
  );
}
