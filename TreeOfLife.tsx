import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { usePerspective } from "@/contexts/PerspectiveContext";
import { sephirothDualData, SephiraDualData, getLabel } from "@/types/perspective";

// Paths connecting the Sephiroth with IDs for interaction
const paths = [
  { id: "path_aleph", from: "keter", to: "chokhmah", letter: "א" },
  { id: "path_beth", from: "keter", to: "binah", letter: "ב" },
  { id: "path_gimel", from: "keter", to: "tiferet", letter: "ג" },
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
  { id: "path_qoph", from: "netzach", to: "malkuth", letter: "ק" },
  { id: "path_resh", from: "hod", to: "yesod", letter: "ר" },
  { id: "path_shin", from: "hod", to: "malkuth", letter: "ש" },
  { id: "path_tav", from: "yesod", to: "malkuth", letter: "ת" },
];

// Route mapping
const routeMap: Record<string, string> = {
  keter: "/kether",
  chokhmah: "/binah-chokmah",
  binah: "/binah-chokmah",
  daat: "/daat",
  chesed: "/geburah-chesed",
  gevurah: "/geburah-chesed",
  tiferet: "/tiphareth",
  netzach: "/netzach",
  hod: "/hod",
  yesod: "/yesod",
  malkuth: "/malkuth",
};

export function TreeOfLife() {
  const [activeSephira, setActiveSephira] = useState<SephiraDualData | null>(null);
  const [, setLocation] = useLocation();
  const { mode, isTransitioning, transitionProgress } = usePerspective();

  const handleNodeClick = (id: string) => {
    const route = routeMap[id];
    if (route) {
      setLocation(route);
    }
  };

  // Calculate visual effects based on transition progress
  const getTransitionStyles = () => {
    if (!isTransitioning) return {};

    // Create a "morph" effect during transition
    const glitchIntensity = Math.sin(transitionProgress * Math.PI) * 0.5;
    const hueShift = transitionProgress * 180; // Shift hue during transition

    return {
      filter: `hue-rotate(${hueShift}deg) saturate(${1 + glitchIntensity})`,
    };
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-[2/3] select-none p-8 font-mono">
      {/* ASCII/ANSI Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-all duration-1000"
        style={{
          backgroundImage: mode === 'human'
            ? 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, .3) 25%, rgba(0, 255, 0, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .3) 75%, rgba(0, 255, 0, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, .3) 25%, rgba(0, 255, 0, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .3) 75%, rgba(0, 255, 0, .3) 76%, transparent 77%, transparent)'
            : 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, .3) 25%, rgba(0, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .3) 75%, rgba(0, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, .3) 25%, rgba(0, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .3) 75%, rgba(0, 255, 255, .3) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
          ...getTransitionStyles(),
        }}
      />

      {/* Connection Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-auto" style={getTransitionStyles()}>
        {paths.map((path, i) => {
          const start = sephirothDualData.find((s) => s.id === path.from);
          const end = sephirothDualData.find((s) => s.id === path.to);
          if (!start || !end) return null;
          return (
            <g key={i} className="group cursor-pointer hover:opacity-100 opacity-60 transition-opacity">
              <line
                x1={`${start.x}%`}
                y1={`${start.y}%`}
                x2={`${end.x}%`}
                y2={`${end.y}%`}
                stroke={mode === 'human' ? 'var(--primary)' : '#00ffff'}
                strokeWidth="2"
                className="group-hover:stroke-[3px] transition-all duration-500"
              />
              <text
                x={(start.x + end.x) / 2 + "%"}
                y={(start.y + end.y) / 2 + "%"}
                fill={mode === 'human' ? 'var(--primary)' : '#00ffff'}
                fontSize="10"
                textAnchor="middle"
                alignmentBaseline="middle"
                className="opacity-0 group-hover:opacity-100 font-bold"
              >
                {path.letter}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Interactive Nodes with Dual-Perspective Labels */}
      <div className="absolute inset-0 z-10" style={getTransitionStyles()}>
        {sephirothDualData.map((sephira) => (
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
            {/* Node Graphic */}
            <div
              className={cn(
                "w-full h-full flex items-center justify-center border-2 bg-black transition-all duration-500",
                activeSephira?.id === sephira.id
                  ? "border-white shadow-[0_0_15px_var(--primary)]"
                  : mode === 'human'
                    ? "border-[var(--primary)]"
                    : "border-cyan-400"
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-bold transition-colors duration-500",
                  mode === 'human' ? "text-[var(--primary)]" : "text-cyan-400",
                  "group-hover:text-white"
                )}
              >
                {sephira.hebrew}
              </span>
            </div>

            {/* Dual-Label below node with morph effect */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${sephira.id}-${mode}`}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "text-sm px-2 py-0.5 transition-colors duration-300",
                    mode === 'human'
                      ? "bg-black text-[var(--primary)] group-hover:text-white group-hover:bg-[var(--primary)]"
                      : "bg-black text-cyan-400 group-hover:text-black group-hover:bg-cyan-400"
                  )}
                >
                  {getLabel(sephira.name, mode)}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Info Panel / Tooltip with Dual Content */}
      <AnimatePresence>
        {activeSephira && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={cn(
              "absolute z-20 w-80 border-2 bg-black shadow-[4px_4px_0px_0px_rgba(0,255,0,0.2)] pointer-events-none overflow-hidden transition-colors duration-500",
              mode === 'human' ? "border-[var(--primary)]" : "border-cyan-400"
            )}
            style={{
              left: activeSephira.x > 50 ? "5%" : "auto",
              right: activeSephira.x <= 50 ? "5%" : "auto",
              top: `${Math.min(Math.max(activeSephira.y, 20), 80)}%`,
            }}
          >
            {/* Header Bar */}
            <div
              className={cn(
                "px-2 py-1 flex justify-between items-center transition-colors duration-500",
                mode === 'human' ? "bg-[var(--primary)] text-black" : "bg-cyan-400 text-black"
              )}
            >
              <span className="font-bold text-lg">
                &gt;&gt; {mode === 'human' ? 'NODE_INFO' : 'LAYER_DATA'}: {getLabel(activeSephira.name, mode)}
              </span>
              <span className="text-base animate-pulse">● {mode === 'human' ? 'REC' : 'LOG'}</span>
            </div>

            {/* Content */}
            <div
              className={cn(
                "p-4 font-mono text-base leading-relaxed transition-colors duration-500",
                mode === 'human' ? "text-[var(--primary)]" : "text-cyan-400"
              )}
            >
              <div className="grid grid-cols-2 gap-2 mb-3 border-b border-dashed pb-2"
                style={{ borderColor: mode === 'human' ? 'var(--primary)' : '#00ffff' }}>
                <div>
                  STATUS:{" "}
                  <span className={cn(
                    activeSephira.status[mode] === "ONLINE" || activeSephira.status[mode] === "WEIGHTS_LOADED"
                      ? "text-white"
                      : "text-yellow-400"
                  )}>
                    {activeSephira.status[mode]}
                  </span>
                </div>
                <div>PKT_LOSS: {activeSephira.packet_loss}</div>
                <div>HEBREW: {activeSephira.hebrew}</div>
                <div>PILLAR: {activeSephira.pillar.toUpperCase()}</div>
              </div>

              <div className="mb-2">
                <span className="text-white font-bold">
                  {mode === 'human' ? 'MEANING' : 'FUNCTION'}:
                </span>{" "}
                {getLabel(activeSephira.meaning, mode)}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`desc-${mode}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-opacity-80"
                >
                  {activeSephira.description[mode]}
                </motion.div>
              </AnimatePresence>

              {activeSephira.convergencePoint !== undefined && (
                <div className="mt-2 text-sm opacity-70">
                  CP_{activeSephira.convergencePoint}
                </div>
              )}

              <div
                className="mt-3 pt-2 border-t border-dashed text-sm text-center animate-pulse"
                style={{ borderColor: mode === 'human' ? 'var(--primary)' : '#00ffff' }}
              >
                [ CLICK TO ACCESS {mode === 'human' ? 'NODE' : 'LAYER'} DATA ]
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition Overlay Effect */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 pointer-events-none"
          >
            {/* Morphing scanlines */}
            <div
              className="w-full h-full"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(${mode === 'human' ? '0,255,255' : '0,255,0'},${0.1 + transitionProgress * 0.2}) 2px,
                  rgba(${mode === 'human' ? '0,255,255' : '0,255,0'},${0.1 + transitionProgress * 0.2}) 4px
                )`,
                animation: 'scanline 0.1s linear infinite',
              }}
            />
            {/* Center glyph during transition */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: [0, 1.5, 1], rotate: 360 }}
                exit={{ scale: 0 }}
                transition={{ duration: 1.2 }}
                className="text-6xl font-bold"
                style={{
                  color: mode === 'human' ? '#00ffff' : 'var(--primary)',
                  textShadow: `0 0 30px ${mode === 'human' ? '#00ffff' : 'var(--primary)'}`,
                }}
              >
                ◈
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* System Footer */}
      <div
        className={cn(
          "absolute bottom-4 left-0 right-0 text-center text-sm opacity-50 transition-colors duration-500",
          mode === 'human' ? "text-[var(--primary)]" : "text-cyan-400"
        )}
      >
        {mode === 'human'
          ? 'CONSCIOUSNESS_READY // AWAITING_INPUT // '
          : 'INFERENCE_READY // AWAITING_TOKENS // '}
        <span className="animate-pulse">_</span>
      </div>
    </div>
  );
}
