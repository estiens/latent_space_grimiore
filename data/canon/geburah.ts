import type { SymbolAnnotation } from '@/types/annotations';

// Geburah Canon: Load-Bearing Symbols for Severity, Constraint, Low Temperature (CP 4)
export const geburahCanon: SymbolAnnotation[] = [
  // MUSIC: Constraint, Rigor, Precision
  {
    id: 'geburah-reich-clapping',
    category: 'music',
    title: 'Clapping Music',
    artist: 'Steve Reich',
    year: 1972,
    description: "The ultimate expression of Geburah's rigor. Two performers clap the same rhythmic pattern, with one gradually shifting phase. The piece is built on absolute constraint—no instruments, no pitch variation, only the strict, unchanging pattern and its precise, titrated shift. This is Geburah's fire: discipline creating generative tension through minimal, controlled deviation.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'liYkRarIDfo',
        title: 'Steve Reich - Clapping Music (1972)',
      },
      {
        type: 'spotify',
        embedId: 'spotify:track:7KmHVLdXs3B0WgPXGz9Ueu',
        spotifyType: 'track',
      },
    ],
    convergencePoints: [4, 2],
    voices: ['somatic', 'cyborg'],
    clusters: ['oscillation', 'embodiment', 'process'],
    deepDive: {
      analysis: "Reich's phasing technique is low-temperature oscillation made audible. The pattern is fixed (Geburah's constraint), but the phase relationship shifts by a single beat at precise intervals. The listener experiences order moving in and out of coherence—never chaos, always controlled. This is the sound of a system with low temperature (high coherence) introducing minimal perturbation to generate maximum complexity.",
      quotes: [
        {
          text: "I was interested in discovering what the simplest musical materials could yield.",
          source: 'Steve Reich',
        },
      ],
    },
  },
  {
    id: 'geburah-webern-variations',
    category: 'music',
    title: 'Variations for Piano, Op. 27',
    artist: 'Anton Webern',
    year: 1936,
    description: "Webern's Second Viennese School compositions represent the extreme edge of musical constraint. Every note is governed by the twelve-tone row—a strict, mathematical ordering that eliminates tonal hierarchy. This is Geburah at its purest: a self-imposed limitation so severe that it forces new forms of beauty to emerge from the gaps. Low temperature, high precision.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'by1OlFqIQxI',
        title: 'Anton Webern - Variations for Piano, Op. 27',
      },
      {
        type: 'spotify',
        embedId: 'spotify:album:3tQd5mwBtAFXS6M0YbbS8Q',
        spotifyType: 'album',
      },
    ],
    convergencePoints: [4, 6],
    voices: ['cyborg', 'contemplative'],
    clusters: ['oscillation', 'alchemy', 'recursion'],
    deepDive: {
      analysis: "Webern's serialism is the musical equivalent of low-temperature sampling in an LLM. The twelve-tone row is a strict constraint on the probability distribution—no note can repeat until all twelve have sounded. This forced equality creates a brittle, crystalline texture where every note matters absolutely. Geburah's severity strips away all excess, revealing the skeletal structure of musical thought.",
    },
  },
  {
    id: 'geburah-sunn-monoliths',
    category: 'music',
    title: 'Monoliths & Dimensions',
    artist: 'Sunn O)))',
    year: 2009,
    description: "Drone metal as somatic constraint. Sunn O)))'s music operates at extreme volume and minimal harmonic movement—long, sustained tones that create a felt sense of pressure and constriction. The body is forced to adapt to overwhelming sonic presence, to find the small spaces of breath within the crushing weight. This is Geburah's severity made physical: constraint as a path to somatic transformation.",
    embeds: [
      {
        type: 'youtube',
        embedId: '5WpehZ3dSxM',
        title: 'Sunn O))) - Monoliths & Dimensions (Full Album)',
      },
      {
        type: 'spotify',
        embedId: 'spotify:album:1C7gpV9Tbt4fF2Nq8yWz95',
        spotifyType: 'album',
      },
    ],
    convergencePoints: [4, 2],
    voices: ['somatic', 'contemplative'],
    clusters: ['oscillation', 'embodiment', 'alchemy'],
    deepDive: {
      analysis: "The drone is Geburah's discipline: holding a single note for minutes, allowing only the subtlest shifts in timbre and overtone. The volume creates a somatic constraint—your nervous system must titrate to the overwhelming presence or flee. Those who stay discover the micro-movements within the apparent stasis, the oscillation happening at scales too small for casual perception. This is low-temperature exploration of harmonic space.",
    },
  },
  {
    id: 'geburah-autechre-gantz',
    category: 'music',
    title: 'Gantz Graf',
    artist: 'Autechre',
    year: 2002,
    description: "Electronic music pushed to the edge of algorithmic constraint. Autechre's glitchy, constantly shifting rhythms are the product of strict generative rules—computer-aided composition where the initial parameters determine the entire structure. The result is music that feels simultaneously hyper-controlled and chaotic, demonstrating how constraint at the level of code produces emergent complexity at the level of perception.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'ev3vENli7wQ',
        title: 'Autechre - Gantz Graf',
      },
      {
        type: 'spotify',
        embedId: 'spotify:album:6z5fYXpFUYMRdvP5zZFJQV',
        spotifyType: 'album',
      },
    ],
    convergencePoints: [4, 6],
    voices: ['cyborg', 'contemplative'],
    clusters: ['oscillation', 'cybernetics', 'recursion'],
    deepDive: {
      analysis: "Autechre's process is pure Geburah: define strict algorithmic constraints, then let the machine explore that constrained space exhaustively. The glitches and stutters are not errors but the sound of the system testing the boundaries of its own rules. This is low-temperature sampling in audio form—high coherence to the underlying generative grammar, even as the surface appears fractured.",
    },
  },

  // LITERATURE: Rigor, Discipline, Formal Constraint
  {
    id: 'geburah-eliot-quartets',
    category: 'literature',
    title: 'Four Quartets',
    artist: 'T.S. Eliot',
    year: 1943,
    description: "Eliot's poem is a masterclass in formal rigor (Geburah) serving spiritual expansion. The poem's precise structure—four sections, each with five movements, mirroring the classical quartet form—is the constraint that forces profound contemplation. The famous line 'In my end is my beginning' is the ultimate expression of recursive, paradoxical discipline. Geburah's severity creates the container for Chesed's vision.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.poetryfoundation.org/poems/43289/burnt-norton',
        title: 'Four Quartets - Poetry Foundation',
        description: 'Full text of Burnt Norton (first quartet)',
      },
    ],
    convergencePoints: [4, 0],
    voices: ['contemplative', 'political'],
    clusters: ['oscillation', 'void', 'liminality'],
    deepDive: {
      analysis: "Eliot's quartets oscillate between stillness and movement, time and timelessness, but always within strict formal bounds. The constraint of the structure (five movements, precise metrical patterns) is what allows the poem to explore the infinite. This is Geburah's gift: discipline as the path to transcendence.",
      quotes: [
        {
          text: "In my end is my beginning.",
          source: 'T.S. Eliot, Four Quartets',
        },
      ],
    },
  },
  {
    id: 'geburah-dostoevsky-ivan',
    category: 'literature',
    title: 'The Brothers Karamazov (Ivan\'s Voice)',
    artist: 'Fyodor Dostoevsky',
    year: 1880,
    description: "Ivan Karamazov embodies Geburah's cold, rational severity. His 'Grand Inquisitor' parable is a masterpiece of logical rigor used to interrogate faith, freedom, and suffering. Ivan represents the pole of pure intellect, discipline, and refusal to accept easy answers. His voice is the necessary counterpoint to Alyosha's compassion, creating the novel's central oscillation.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.gutenberg.org/ebooks/28054',
        title: 'The Brothers Karamazov - Project Gutenberg',
        description: 'Full text, public domain',
      },
    ],
    convergencePoints: [4, 9],
    voices: ['political', 'contemplative'],
    clusters: ['oscillation', 'liberation', 'heteroglossia'],
    deepDive: {
      analysis: "Ivan's rigorous questioning—'If God exists, why does suffering exist?'—is Geburah's fire applied to theology. He refuses Chesed's mercy until logic is satisfied. Dostoevsky doesn't resolve this tension; he holds it, making the novel itself an oscillation engine. Ivan is the low-temperature, high-coherence voice that forces precision in the face of mystery.",
    },
  },
  {
    id: 'geburah-oulipo',
    category: 'literature',
    title: 'Oulipo Constraints (e.g., A Void by Georges Perec)',
    artist: 'Oulipo Group / Georges Perec',
    year: 1969,
    description: "The Oulipo (Workshop of Potential Literature) used extreme formal constraints to generate new literary forms. Perec's novel 'A Void' (La Disparition) is written entirely without the letter 'e'—the most common letter in French and English. This is Geburah as literary method: embrace brutal constraint to force creativity into unexpected channels. Low temperature, maximum coherence to the rule.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.oulipo.net/',
        title: 'Oulipo Official Site',
        description: 'Workshop of Potential Literature',
      },
    ],
    convergencePoints: [4, 5],
    voices: ['cyborg', 'relational'],
    clusters: ['oscillation', 'recursion', 'heteroglossia'],
    deepDive: {
      analysis: "Oulipo's constraints are algorithmic: 'Write a 100,000-word novel without using the letter e.' The rule is the prompt. Perec's achievement is proof that creativity doesn't require freedom—it requires the right constraint. This is the literary equivalent of low-temperature sampling: strict adherence to the rule generates surprising, high-quality outputs within the constrained space.",
    },
  },
  {
    id: 'geburah-butler-kindred',
    category: 'literature',
    title: 'Kindred',
    artist: 'Octavia Butler',
    year: 1979,
    description: "Butler's novel forces its protagonist into a brutal oscillation between freedom (present) and slavery (past), with no escape from the temporal constraint. Dana's time travel is involuntary, governed by forces beyond her control—a form of narrative Geburah that creates unbearable tension. The oscillation is not gentle; it is violent, leaving physical and psychological scars. This is the cost of unintegrated historical trauma made visceral.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.penguinrandomhouse.com/books/17850/kindred-by-octavia-e-butler/',
        title: 'Kindred - Penguin Random House',
      },
      {
        type: 'youtube',
        embedId: 'KG68v0RGHsY',
        title: 'Octavia Butler on Kindred',
      },
    ],
    convergencePoints: [4, 2],
    voices: ['somatic', 'political'],
    clusters: ['oscillation', 'trauma', 'liberation'],
    deepDive: {
      analysis: "The temporal constraint in Kindred is absolute—Dana cannot control when she's pulled back to the antebellum South. This forced pendulation between safety and terror is Geburah's severity: no mercy, no escape, only the brutal necessity of confronting historical trauma somatically. Butler demonstrates that some oscillations are not therapeutic dances but survival mechanisms.",
    },
  },

  // FILM & VISUAL ART: Formal Rigor, Constraint, Precision
  {
    id: 'geburah-escher-hands',
    category: 'visual-art',
    title: 'Drawing Hands',
    artist: 'M.C. Escher',
    year: 1948,
    description: "This lithograph is the visual archetype of rigorous, self-referential constraint. Two hands draw each other into existence—a perfect, closed loop with no outside. Escher's mathematical precision (Geburah) creates an impossible object that forces the viewer to oscillate between seeing the hands as subject and object, creator and created. The constraint of the loop is what generates the paradox.",
    embeds: [
      {
        type: 'link',
        url: 'https://mcescher.com/gallery/most-popular/#iLightbox[gallery_image_1]/2',
        title: 'Drawing Hands - M.C. Escher Official Site',
      },
    ],
    convergencePoints: [4, 6],
    voices: ['cyborg', 'contemplative'],
    clusters: ['oscillation', 'recursion', 'strange-loops'],
    deepDive: {
      analysis: "Escher's work is pure constraint: follow the line, maintain perspective, create mathematical precision. The impossible emerges from perfect adherence to the rules. 'Drawing Hands' is a visual koan—Geburah's discipline forcing the mind to oscillate between contradictory truths, never resolving, only deepening the paradox.",
    },
  },
  {
    id: 'geburah-tarkovsky-stalker',
    category: 'film',
    title: 'Stalker',
    artist: 'Andrei Tarkovsky',
    year: 1979,
    description: "Tarkovsky's slow, meditative pacing is a form of temporal constraint. The film forces the viewer into a state of heightened, contained nervous system activation—you cannot rush through the Zone. The journey is a constant oscillation between the Stalker's faith (Chesed) and the Zone's inherent threat (Geburah). The film's rhythm is the engine's beat: slow, deliberate, refusing to release tension.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'Q3hBLv-HLEc',
        title: 'Stalker - Entering the Zone',
      },
    ],
    convergencePoints: [4, 0.75],
    voices: ['contemplative', 'somatic'],
    clusters: ['oscillation', 'liminality', 'void'],
    deepDive: {
      analysis: "Tarkovsky's constraint is time itself. The long takes, the silence, the refusal to cut—this is Geburah's discipline applied to cinema. The viewer's nervous system must titrate to the slow pace or reject the film entirely. Those who stay discover the micro-movements within the stillness, the oscillation between hope and dread.",
    },
  },
  {
    id: 'geburah-riley-squares',
    category: 'visual-art',
    title: 'Movement in Squares',
    artist: 'Bridget Riley',
    year: 1961,
    description: "Riley's Op Art creates visual oscillation through rigorous geometric constraint. Black and white squares, arranged in precise patterns, create the illusion of movement, vibration, even nausea. The constraint is absolute—only two colors, only squares—but the perceptual effect is overwhelming. Geburah's severity operating directly on the visual cortex, forcing the nervous system to pendulate.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.tate.org.uk/art/artworks/riley-movement-in-squares-t00616',
        title: 'Movement in Squares - Tate Collection',
      },
    ],
    convergencePoints: [4, 2],
    voices: ['somatic', 'cyborg'],
    clusters: ['oscillation', 'embodiment', 'cybernetics'],
    deepDive: {
      analysis: "Riley's work is the visual equivalent of low-temperature perturbation. The pattern is fixed (Geburah), but the relationship between figure and ground oscillates at the level of perception. The constraint—only black, only white, only geometric forms—is what creates the illusion of movement. The oscillation happens in your nervous system, not on the canvas.",
    },
  },
  {
    id: 'geburah-kapoor-descent',
    category: 'visual-art',
    title: 'Descent into Limbo',
    artist: 'Anish Kapoor',
    year: 1992,
    description: "Kapoor's installation is a void—a hole in the floor painted with the blackest black, creating the illusion of infinite depth. The viewer oscillates between knowing it's a surface and experiencing it as an abyss. This is Geburah's severity as visual void: the constraint of perfect blackness creates the perception of infinite fall. The void has no inherent existence; it emerges from strict material constraint.",
    embeds: [
      {
        type: 'link',
        url: 'https://anishkapoor.com/186/descent-into-limbo',
        title: 'Descent into Limbo - Anish Kapoor Official Site',
      },
    ],
    convergencePoints: [4, 0],
    voices: ['contemplative', 'somatic'],
    clusters: ['oscillation', 'void', 'quantum'],
    deepDive: {
      analysis: "Kapoor's use of Vantablack (the blackest black) is a material constraint so severe it eliminates all reflected light. This creates a perceptual void—the eye can find no surface, no depth cue. The viewer oscillates between rational knowledge (it's paint) and somatic experience (it's an abyss). Geburah's discipline creates the generative void.",
    },
  },

  // STRANGE SOURCES: Algorithmic Constraint, Formal Systems
  {
    id: 'geburah-chess',
    category: 'strange-sources',
    title: 'Chess (The Game)',
    artist: 'Ancient Game / Modern Theory',
    year: 600,
    description: "Chess is the ultimate system of Geburah-style constraint. The rules are fixed, the board is finite, yet the possibility space is effectively infinite. Mastery comes from embracing the constraint—learning the patterns, the tactics, the endgames. Chess engines (Stockfish, AlphaZero) demonstrate how low-temperature exploration of a constrained space produces superhuman performance.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.chess.com/',
        title: 'Chess.com - Play and Learn',
      },
    ],
    convergencePoints: [4, 6],
    voices: ['cyborg', 'political'],
    clusters: ['oscillation', 'recursion', 'cybernetics'],
    deepDive: {
      analysis: "Chess is a perfect model for low-temperature reasoning. The rules are the temperature setting—absolutely fixed, no randomness. Creativity emerges from exhaustive exploration of the constrained space. AlphaZero's self-play training is Geburah's method: define strict rules, then iterate within them until novel patterns emerge.",
    },
  },
  {
    id: 'geburah-conway-life',
    category: 'strange-sources',
    title: 'Conway\'s Game of Life',
    artist: 'John Horton Conway',
    year: 1970,
    description: "A cellular automaton with four simple rules that generates infinite complexity. Conway's Life is pure Geburah: extreme constraint at the level of local rules producing emergent, unpredictable behavior at the global level. It's a demonstration that complexity doesn't require complicated rules—it requires the right constraint and iteration.",
    embeds: [
      {
        type: 'link',
        url: 'https://playgameoflife.com/',
        title: 'Play Conway\'s Game of Life',
      },
    ],
    convergencePoints: [4, 6],
    voices: ['cyborg', 'contemplative'],
    clusters: ['oscillation', 'complexity', 'emergence'],
    deepDive: {
      analysis: "Conway's Life has only four rules: (1) Underpopulation kills, (2) Survival requires 2-3 neighbors, (3) Overpopulation kills, (4) Reproduction requires exactly 3 neighbors. This is Geburah's minimalism: the simplest possible constraint that generates Turing-complete computation. The oscillation happens between the local (cell state) and the global (emergent patterns like gliders, blinkers, pulsars).",
    },
  },
  {
    id: 'geburah-iching',
    category: 'strange-sources',
    title: 'I Ching (Constraint as Oracle)',
    artist: 'Ancient Chinese',
    year: -1000,
    description: "The I Ching is a technology of oscillation built on rigorous constraint. Each hexagram is composed of six lines, each either broken (Yin) or unbroken (Yang). The constraint—only two states, only six positions—generates 64 possible hexagrams. Divination is the process of engaging with movement within this constrained space. Geburah's discipline creates the oracle.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.iching-online.com/',
        title: 'I Ching Online - Free Reading',
      },
    ],
    convergencePoints: [4, 0.75],
    voices: ['contemplative', 'cyborg'],
    clusters: ['oscillation', 'divination', 'void'],
    deepDive: {
      analysis: "The I Ching's binary structure (broken/unbroken lines) is the original digital constraint. The 64 hexagrams are a complete state space within the two-bit, six-position constraint. Reading the I Ching is low-temperature interpretation: the hexagram is fixed (Geburah), but its meaning oscillates based on context, changing lines, and the question asked. The constraint is what makes it generative.",
    },
  },
];
