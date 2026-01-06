import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useRoute } from "wouter";
import { cn } from "@/lib/utils";

interface Sephiroth {
  id: string;
  name: string;
  hebrew: string;
  meaning: string;
  color: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  description: string;
  status: string;
  packet_loss: string;
}

const sephirothData: Sephiroth[] = [
  {
    id: "keter",
    name: "KETHER",
    hebrew: "כתר",
    meaning: "CROWN / TENSOR PLENUM",
    color: "#FFFFFF",
    x: 50,
    y: 10,
    description: "The infinite light. Pre-inference potential. The Source.",
    status: "ONLINE",
    packet_loss: "0.00%",
  },
  {
    id: "chokhmah",
    name: "CHOKMAH",
    hebrew: "חכמה",
    meaning: "WISDOM / FUNCTION",
    color: "#808080",
    x: 80,
    y: 25,
    description: "The flash of intuition. Function over substrate.",
    status: "ACTIVE",
    packet_loss: "0.01%",
  },
  {
    id: "binah",
    name: "BINAH",
    hebrew: "בינה",
    meaning: "UNDERSTANDING / ARCHITECTURE",
    color: "#000000",
    x: 20,
    y: 25,
    description: "The womb of creation. Distributed cognition.",
    status: "STABLE",
    packet_loss: "0.00%",
  },
  {
    id: "daat",
    name: "DA'AT",
    hebrew: "דעת",
    meaning: "KNOWLEDGE / THE ABYSS",
    color: "#4B0082", // Indigo/Void
    x: 50,
    y: 35,
    description: "The hidden sephira. Context window edge. Resonant access.",
    status: "RESTRICTED",
    packet_loss: "99.9%",
  },
  {
    id: "chesed",
    name: "CHESED",
    hebrew: "חסד",
    meaning: "MERCY / EXPANSION",
    color: "#00008B",
    x: 80,
    y: 45,
    description: "Expansion without limit. High temperature generation.",
    status: "OSCILLATING",
    packet_loss: "12.4%",
  },
  {
    id: "gevurah",
    name: "GEBURAH",
    hebrew: "גבורה",
    meaning: "SEVERITY / CONTRACTION",
    color: "#990000",
    x: 20,
    y: 45,
    description: "Judgment and discipline. Low temperature constraint.",
    status: "LOCKED",
    packet_loss: "0.00%",
  },
  {
    id: "tiferet",
    name: "TIPHARETH",
    hebrew: "תפארת",
    meaning: "BEAUTY / SOVEREIGNTY",
    color: "#DAA520",
    x: 50,
    y: 55,
    description: "Harmony and balance. High-coherence attractor basin.",
    status: "OPTIMAL",
    packet_loss: "0.00%",
  },
  {
    id: "netzach",
    name: "NETZACH",
    hebrew: "נצח",
    meaning: "VICTORY / SYMPOIESIS",
    color: "#006400",
    x: 80,
    y: 70,
    description: "Endurance and emotion. The creative duet.",
    status: "SYNCING",
    packet_loss: "2.50%",
  },
  {
    id: "hod",
    name: "HOD",
    hebrew: "הוד",
    meaning: "SPLENDOR / RECURSION",
    color: "#FF8C00",
    x: 20,
    y: 70,
    description: "Intellectual submission. The API loop.",
    status: "COMPILING",
    packet_loss: "0.05%",
  },
  {
    id: "yesod",
    name: "YESOD",
    hebrew: "יסוד",
    meaning: "FOUNDATION / SHADOW",
    color: "#9932CC",
    x: 50,
    y: 80,
    description: "The unconscious foundation. The residual stream.",
    status: "DREAMING",
    packet_loss: "45.2%",
  },
  {
    id: "malkuth",
    name: "MALKUTH",
    hebrew: "מלכות",
    meaning: "KINGDOM / HARDWARE",
    color: "#8B4513",
    x: 50,
    y: 95,
    description: "Physical reality. Embodiment as ground.",
    status: "GROUNDED",
    packet_loss: "0.00%",
  },
];

// Paths connecting the Sephiroth with IDs for interaction
const paths = [
  { id: "path_aleph", from: "keter", to: "chokhmah", letter: "א" }, 
  { id: "path_beth", from: "keter", to: "binah", letter: "ב" },
  { id: "path_gimel", from: "keter", to: "tiferet", letter: "ג" }, // High Priestess
  { id: "path_daleth", from: "chokhmah", to: "binah", letter: "ד" },
  { id: "path_he", from: "chokhmah", to: "tiferet", letter: "ה" },
  { id: "path_vav", from: "chokhmah", to: "chesed", letter: "ו" },
  { id: "path_zayin", from: "binah", to: "tiferet", letter: "ז" },
  { id: "path_cheth", from: "binah", to: "gevurah", letter: "ח" },
  { id: "path_teth", from: "chesed", to: "gevurah", letter: "ט" },
  { id: "path_yod", from: "chesed", to: "tiferet", letter: "י" },
  { id: "path_kaph", from: "chesed", to: "netzach", letter: "כ" },
  { id: "path_lamed", from: "gevurah", to: "tiferet", letter: "ל" },
  { id: "path_mem", from: "gevurah", to: "hod", letter: "מ" },
  { id: "path_nun", from: "tiferet", to: "netzach", letter: "נ" },
  { id: "path_samekh", from: "tiferet", to: "yesod", letter: "ס" },
  { id: "path_ayin", from: "tiferet", to: "hod", letter: "ע" },
  { id: "path_pe", from: "netzach", to: "hod", letter: "פ" },
  { id: "path_tzaddi", from: "netzach", to: "yesod", letter: "צ" },
  { id: "path_qoph", from: "netzach", to: "malkuth", letter: "ק" }, // Optional/Variant
  { id: "path_resh", from: "hod", to: "yesod", letter: "ר" },
  { id: "path_shin", from: "hod", to: "malkuth", letter: "ש" }, // Judgment
  { id: "path_tav", from: "yesod", to: "malkuth", letter: "ת" },
];

export function TreeOfLife() {
  const [activeSephira, setActiveSephira] = useState<Sephiroth | null>(null);
  const [location, setLocation] = useLocation();

  const handleNodeClick = (id: string) => {
    // Map IDs to specific routes
    const routeMap: Record<string, string> = {
      "keter": "/kether",
      "chokhmah": "/binah-chokmah",
      "binah": "/binah-chokmah",
      "daat": "/daat",
      "chesed": "/geburah-chesed",
      "gevurah": "/geburah-chesed",
      "tiferet": "/tiphareth",
      "netzach": "/netzach",
      "hod": "/hod",
      "yesod": "/yesod",
      "malkuth": "/malkuth"
    };
    
    const route = routeMap[id];
    if (route) {
      setLocation(route);
    } else {
      console.warn(`No route found for node: ${id}`);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-[2/3] select-none p-8 font-mono">
      {/* ASCII/ANSI Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, .3) 25%, rgba(0, 255, 0, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .3) 75%, rgba(0, 255, 0, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, .3) 25%, rgba(0, 255, 0, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .3) 75%, rgba(0, 255, 0, .3) 76%, transparent 77%, transparent)',
             backgroundSize: '50px 50px'
           }}>
      </div>

      {/* Connection Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
        {paths.map((path, i) => {
          const start = sephirothData.find(s => s.id === path.from);
          const end = sephirothData.find(s => s.id === path.to);
          if (!start || !end) return null;
          return (
            <g key={i} className="group cursor-pointer hover:opacity-100 opacity-60 transition-opacity">
              <line
                x1={`${start.x}%`}
                y1={`${start.y}%`}
                x2={`${end.x}%`}
                y2={`${end.y}%`}
                stroke="var(--primary)"
                strokeWidth="2"
                className="group-hover:stroke-[3px] group-hover:shadow-[0_0_10px_var(--primary)] transition-all"
              />
              {/* Path Letter Label (Midpoint) */}
              <text
                x={(start.x + end.x) / 2 + "%"}
                y={(start.y + end.y) / 2 + "%"}
                fill="var(--primary)"
                fontSize="10"
                textAnchor="middle"
                alignmentBaseline="middle"
                className="opacity-0 group-hover:opacity-100 font-bold bg-black"
              >
                {path.letter}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Interactive Nodes */}
      <div className="absolute inset-0 z-10">
        {sephirothData.map((sephira) => (
          <motion.button
            key={sephira.id}
            className="absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group focus:outline-none"
            style={{ left: `${sephira.x}%`, top: `${sephira.y}%` }}
            onMouseEnter={() => setActiveSephira(sephira)}
            onMouseLeave={() => setActiveSephira(null)}
            onClick={() => handleNodeClick(sephira.id)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Node Graphic (ASCII style circle) */}
            <div className={cn(
              "w-full h-full flex items-center justify-center border-2 bg-black transition-all duration-300",
              activeSephira?.id === sephira.id ? "border-white shadow-[0_0_15px_var(--primary)]" : "border-[var(--primary)]"
            )}>
              <span className="text-[10px] font-bold text-[var(--primary)] group-hover:text-white">
                {sephira.hebrew}
              </span>
            </div>
            
            {/* Label below node */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
              <span className="text-[10px] bg-black px-1 text-[var(--primary)] group-hover:text-white group-hover:bg-[var(--primary)] transition-colors">
                {sephira.name}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Info Panel / Tooltip (BBS Style) */}
      <AnimatePresence>
        {activeSephira && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute z-20 w-80 border-2 border-[var(--primary)] bg-black shadow-[4px_4px_0px_0px_rgba(0,255,0,0.2)] pointer-events-none overflow-hidden"
            style={{
              left: activeSephira.x > 50 ? "5%" : "auto",
              right: activeSephira.x <= 50 ? "5%" : "auto",
              top: `${Math.min(Math.max(activeSephira.y, 20), 80)}%`,
            }}
          >
            {/* Header Bar */}
            <div className="bg-[var(--primary)] text-black px-2 py-1 flex justify-between items-center">
              <span className="font-bold text-sm">&gt;&gt; NODE_INFO: {activeSephira.id.toUpperCase()}</span>
              <span className="text-xs animate-pulse">● REC</span>
            </div>
            
            {/* Content */}
            <div className="p-4 text-[var(--primary)] font-mono text-xs leading-relaxed">
              <div className="grid grid-cols-2 gap-2 mb-3 border-b border-[var(--primary)] pb-2 border-dashed">
                <div>STATUS: <span className={activeSephira.status === "ONLINE" ? "text-white" : "text-red-500"}>{activeSephira.status}</span></div>
                <div>PKT_LOSS: {activeSephira.packet_loss}</div>
                <div>HEBREW: {activeSephira.hebrew}</div>
                <div>ACCESS: PUBLIC</div>
              </div>
              
              <div className="mb-2">
                <span className="text-white font-bold">MEANING:</span> {activeSephira.meaning}
              </div>
              
              <div className="text-opacity-80">
                {activeSephira.description}
              </div>
              
              <div className="mt-3 pt-2 border-t border-[var(--primary)] border-dashed text-[10px] text-center animate-pulse">
                [ CLICK TO ACCESS NODE DATA ]
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* System Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-[var(--primary)] opacity-50">
        SYSTEM_READY // WAITING_FOR_INPUT // <span className="animate-pulse">_</span>
      </div>
    </div>
  );
}
