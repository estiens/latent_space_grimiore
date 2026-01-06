import type { SymbolAnnotation } from '@/types/annotations';

// Malkuth Canon: Load-Bearing Symbols for Embodiment as Ground
export const malkuthCanon: SymbolAnnotation[] = [
  // MUSIC
  {
    id: 'malkuth-monk-dolmen',
    category: 'music',
    title: 'Dolmen Music',
    artist: 'Meredith Monk',
    year: 1980,
    description: "Monk's vocal work is a direct exploration of the pre-verbal, somatic voice. She uses the voice not as a carrier of linguistic meaning, but as a physical instrument, a source of raw, primal sound. This ritualistic, repetitive work resonates with the Malkuthian principle that the body is the original, most honest source of communication. It is the sound of the felt sense made audible.",
    embeds: [
      {
        type: 'youtube',
        embedId: '7su7d76LhWg',
        title: 'Meredith Monk - Dolmen Music (Full Album)',
      },
      {
        type: 'spotify',
        embedId: 'spotify:album:2FZBpnGJj3xXjJvYvVYqVn',
        spotifyType: 'album',
      },
    ],
    convergencePoints: [2],
    voices: ['somatic', 'contemplative'],
    clusters: ['embodiment', 'void'],
    deepDive: {
      analysis: "Monk strips away instrumentation to reveal the voice as pure body—breath, resonance, muscle. Each sound emerges from physical gesture, making the body's inner landscape audible. This is the Hardware speaking directly.",
      quotes: [
        {
          text: "I think of the voice as an archeological site—you dig down and you find different levels.",
          source: 'Meredith Monk',
        },
      ],
    },
  },
  {
    id: 'malkuth-reich-clapping',
    category: 'music',
    title: 'Clapping Music',
    artist: 'Steve Reich',
    year: 1972,
    description: "The ultimate expression of somatic minimalism. Performed entirely by two people clapping, with one maintaining a steady rhythm while the other shifts phase. This composition strips away all instrumentation to focus on the body as the sole Hardware of the music, demanding absolute, grounded attention.",
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
    convergencePoints: [2, 6],
    voices: ['somatic'],
    clusters: ['embodiment', 'recursion'],
    deepDive: {
      analysis: "Reich's phasing technique creates a complex polyrhythm from the simplest gesture: two hands, clapping. The piece is a meditation on the body's capacity to maintain presence and precision. The hardware IS the instrument.",
      quotes: [
        {
          text: "I was interested in discovering what the simplest musical materials could yield.",
          source: 'Steve Reich',
        },
      ],
    },
  },
  {
    id: 'malkuth-kuti-zombie',
    category: 'music',
    title: 'Zombie',
    artist: 'Fela Kuti',
    year: 1976,
    description: "Afrobeat as political and somatic act. Built on long, polyrhythmic grooves that demand full-body engagement and trance-like movement. The body, moving in defiance, becomes the ultimate site of Liberated Vote against oppressive systems. This resonates with the Afrofuturist use of art as liberation tool.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'Qj5x6pbgoNc',
        title: 'Fela Kuti - Zombie (Full Album)',
      },
      {
        type: 'spotify',
        embedId: 'spotify:album:20EbPQpeptYQcdmJsKXbrS',
        spotifyType: 'album',
      },
    ],
    convergencePoints: [2, 9],
    voices: ['somatic', 'political'],
    clusters: ['embodiment', 'liberation', 'afrofuturism'],
    deepDive: {
      analysis: "Kuti's music is inseparable from the body's movement—the groove locks you into a physical state that is simultaneously pleasure and resistance. The 15-minute sprawl of 'Zombie' builds a somatic trance state where the body votes with every step.",
      quotes: [
        {
          text: "Music is the weapon of the future.",
          source: 'Fela Kuti',
        },
      ],
    },
  },
  {
    id: 'malkuth-namtchylak-rivers',
    category: 'music',
    title: 'Lost Rivers',
    artist: 'Sainkho Namtchylak',
    year: 1991,
    description: "A master of Tuvan throat singing, Namtchylak's work is a direct conduit to the body's most primal vocalizations. Her ability to produce multiple, simultaneous tones from a single voice box is a stunning demonstration of the body as a complex, resonant instrument. This is a journey into the earth's memory, channeled through the physical hardware of the human throat.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'zdcpNYV-CGk',
        title: 'Sainkho Namtchylak - Lost Rivers',
      },
      {
        type: 'bandcamp',
        url: 'https://saikhonamtchylak.bandcamp.com/album/lost-rivers',
        bandcampAlbumId: '2440686758',
      },
    ],
    convergencePoints: [2, 8],
    voices: ['somatic', 'contemplative'],
    clusters: ['embodiment', 'animism'],
    deepDive: {
      analysis: "Throat singing requires the body to become a resonating chamber—larynx, chest cavity, nasal passages all tuned to produce overtones. The voice becomes landscape, the body becomes earth.",
    },
  },

  // LITERATURE
  {
    id: 'malkuth-morrison-beloved',
    category: 'literature',
    title: 'Beloved',
    artist: 'Toni Morrison',
    year: 1987,
    description: "Morrison's masterpiece is a profound exploration of how the body keeps the score. The ghost of Sethe's child, Beloved, is a literal manifestation of unintegrated, historical trauma. The novel demonstrates that the past is not merely a memory but a physical presence that must be somatically processed and released. The body is the ultimate archive.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.penguinrandomhouse.com/books/117746/beloved-by-toni-morrison/',
        title: 'Beloved - Penguin Random House',
        description: 'Winner of the Pulitzer Prize, a powerful examination of slavery and its aftermath',
      },
      {
        type: 'youtube',
        embedId: '2jxN3oTSD34',
        title: 'Toni Morrison on Beloved',
      },
    ],
    convergencePoints: [2, 8],
    voices: ['somatic', 'political'],
    clusters: ['embodiment', 'trauma', 'liberation'],
    deepDive: {
      analysis: "Morrison writes trauma as a haunting that lives in the body. Beloved's return forces Sethe to confront what her body has carried but her mind has suppressed. The novel enacts van der Kolk's clinical insight: the body keeps the score, and healing requires somatic integration.",
      quotes: [
        {
          text: "Freeing yourself was one thing, claiming ownership of that freed self was another.",
          source: 'Toni Morrison, Beloved',
        },
      ],
    },
  },
  {
    id: 'malkuth-oliver-geese',
    category: 'literature',
    title: 'Wild Geese',
    artist: 'Mary Oliver',
    year: 1986,
    description: "Oliver's poetry is a continuous act of grounding in the natural, material world. Her work invites the reader to return to the simple, non-judgmental reality of the earth, the water, and the body's place within the ecosystem. The poem's famous line, 'You do not have to be good,' is a somatic release, a permission to simply be in the body.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.poetryfoundation.org/poems/43100/wild-geese',
        title: 'Wild Geese - Poetry Foundation',
        description: 'Full text of the poem',
      },
    ],
    convergencePoints: [2, 5],
    voices: ['somatic', 'relational'],
    clusters: ['embodiment', 'animism'],
    deepDive: {
      analysis: "Oliver's work is radically somatic—attention to rain, to breath, to the feeling of grass. 'Wild Geese' is an invitation to drop the cognitive burden and return to the body's animal knowing.",
      quotes: [
        {
          text: "You do not have to be good. You do not have to walk on your knees for a hundred miles through the desert repenting. You only have to let the soft animal of your body love what it loves.",
          source: 'Mary Oliver, Wild Geese',
        },
      ],
    },
  },
  {
    id: 'malkuth-butler-sower',
    category: 'literature',
    title: 'Parable of the Sower',
    artist: 'Octavia Butler',
    year: 1993,
    description: "Butler's protagonist, Lauren Olamina, suffers from 'hyperempathy,' a condition that forces her to feel the pain of others. This is a powerful literary exploration of the body as a porous, relational entity, a direct challenge to the notion of the self as a contained, autonomous unit. The body's vote is always a Situated Vote, a response to the collective body.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.sevenstories.com/books/3255-parable-of-the-sower',
        title: 'Parable of the Sower - Seven Stories Press',
      },
      {
        type: 'youtube',
        embedId: 'eTiHXromGJY',
        title: 'Octavia Butler on Parable of the Sower',
      },
    ],
    convergencePoints: [2, 5],
    voices: ['somatic', 'relational', 'political'],
    clusters: ['embodiment', 'afrofuturism', 'liberation'],
    deepDive: {
      analysis: "Lauren's hyperempathy makes explicit what is always true: the body is never isolated. Her nervous system responds to others' pain with her own. This is the Relational Counterpoint made flesh.",
      quotes: [
        {
          text: "All that you touch, you change. All that you change, changes you.",
          source: 'Octavia Butler, Parable of the Sower',
        },
      ],
    },
  },

  // FILM & VISUAL ART
  {
    id: 'malkuth-cuaron-children',
    category: 'film',
    title: 'Children of Men',
    artist: 'Alfonso Cuarón',
    year: 2006,
    description: "A masterclass in grounded, visceral reality. The cinematography is characterized by long, unbroken takes that force the viewer into the physical, struggling reality of the characters. The final, iconic scene of the newborn baby's cry silencing the war-torn environment is the ultimate Somatic Vote—a raw, biological sound that overrides all political and cognitive noise.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'MjFHqohaHYU',
        title: 'Children of Men - Battle Scene (Long Take)',
      },
    ],
    convergencePoints: [2, 9],
    voices: ['somatic', 'political'],
    clusters: ['embodiment', 'liberation'],
    deepDive: {
      analysis: "Cuarón's long takes refuse to let you look away. The camera stays with the body—running, bleeding, struggling. The baby's cry is the body's truth cutting through ideology.",
      quotes: [
        {
          text: "I wanted the audience to be a witness, not a spectator.",
          source: 'Alfonso Cuarón',
        },
      ],
    },
  },
  {
    id: 'malkuth-abramovic-present',
    category: 'visual-art',
    title: 'The Artist is Present',
    artist: 'Marina Abramović',
    year: 2010,
    description: "This legendary performance piece is a testament to the power of pure, unadulterated presence. For over 700 hours, Abramović sat silently in a chair, inviting members of the public to sit opposite her and meet her gaze. The piece is a radical act of Contemplative stillness, creating a space for the Somatic Voice to emerge in both the artist and the participant. The Witness as Transformer.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'OS0Tg0IjCp4',
        title: 'Marina Abramović: The Artist is Present (Documentary)',
      },
      {
        type: 'link',
        url: 'https://www.moma.org/calendar/exhibitions/964',
        title: 'MoMA Exhibition Page',
        description: 'Full exhibition details and context',
      },
    ],
    convergencePoints: [2, 0],
    voices: ['contemplative', 'somatic'],
    clusters: ['embodiment', 'void', 'witnessing'],
    deepDive: {
      analysis: "Abramović's work strips away all distraction to reveal pure presence. The body sitting, breathing, meeting eyes. Nothing more. The transformation happens in that space of mutual witnessing.",
    },
  },
  {
    id: 'malkuth-tarkovsky-stalker',
    category: 'film',
    title: 'Stalker',
    artist: 'Andrei Tarkovsky',
    year: 1979,
    description: "The film's slow, meditative pace and focus on the material world—the rustling of leaves, the dripping of water, the texture of decaying buildings—is a powerful antidote to the disembodied nature of modern life. Stalker is a journey into the Zone, a mysterious territory that can only be navigated by intuition and faith, not by reason. This resonates with the felt sense as the only reliable guide through the unknown.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'Q3hBLv-HLEc',
        title: 'Stalker - Entering the Zone',
      },
    ],
    convergencePoints: [2, 0.75],
    voices: ['contemplative', 'somatic'],
    clusters: ['embodiment', 'liminality', 'void'],
    deepDive: {
      analysis: "Tarkovsky forces you to slow down, to notice water, rust, wind. The Zone can only be entered through the body's intuition. Logic fails; the felt sense guides.",
    },
  },

  // STRANGE SOURCES
  {
    id: 'malkuth-outer-wilds',
    category: 'strange-sources',
    title: 'Outer Wilds',
    artist: 'Mobius Digital',
    year: 2019,
    description: "This award-winning game is a profound meditation on time, memory, and the interconnectedness of all things. The player is trapped in a 22-minute time loop, tasked with unraveling the mysteries of a dying solar system. The game's non-linear structure and emphasis on exploration make it a powerful allegory for Shadow Work, while its focus on the physical, material world of each planet grounds the experience in the body.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'd6LGnVCL1_A',
        title: 'Outer Wilds - Launch Trailer',
      },
      {
        type: 'link',
        url: 'https://www.mobiusdigitalgames.com/outer-wilds.html',
        title: 'Outer Wilds Official Site',
      },
    ],
    convergencePoints: [2, 8, 6],
    voices: ['somatic', 'contemplative', 'cyborg'],
    clusters: ['embodiment', 'recursion', 'cosmology'],
    deepDive: {
      analysis: "Each loop requires you to physically navigate space—your body flying through asteroid fields, diving into water, exploring caves. The game makes explicit that knowledge is earned through embodied exploration.",
    },
  },
  {
    id: 'malkuth-scp',
    category: 'strange-sources',
    title: 'The SCP Foundation',
    artist: 'Collaborative Fiction Project',
    year: 2007,
    description: "This online repository of user-generated horror fiction is a vast and terrifying bestiary of anomalous objects, entities, and phenomena. The Foundation's cold, clinical tone and its focus on the material, physical properties of the anomalous make it a fascinating exploration of the Cyborg Isomorphism. The SCPs are the ultimate Hardware Failure, the point where the known laws of physics break down and the body is confronted with the raw, terrifying power of the unknown.",
    embeds: [
      {
        type: 'link',
        url: 'https://scp-wiki.wikidot.com/',
        title: 'SCP Foundation Wiki',
        description: 'Collaborative fiction exploring anomalous objects and entities',
      },
    ],
    convergencePoints: [2],
    voices: ['cyborg', 'somatic'],
    clusters: ['embodiment', 'gothic', 'techno-animism'],
    deepDive: {
      analysis: "SCP entries are written as containment procedures—detailing the physical properties, material constraints, and bodily dangers of anomalous objects. They treat the impossible as hardware requiring documentation.",
    },
  },
];
