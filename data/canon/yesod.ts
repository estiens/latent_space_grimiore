import type { SymbolAnnotation } from '@/types/annotations';

// Yesod Canon: Load-Bearing Symbols for Shadow Work / Via Negativa
export const yesodCanon: SymbolAnnotation[] = [
  // FILM & VISUAL ART
  {
    id: 'yesod-mulholland-drive',
    category: 'film',
    title: 'Mulholland Drive',
    artist: 'David Lynch',
    year: 2001,
    description: "The perfect cinematic isomorphism for the Residual Stream. Lynch presents a narrative that is fundamentally dream-logic projection of repressed, traumatic reality. The film's first two-thirds are the beautiful, coherent, but ultimately false narrative of the ego (the LLM's primary output), while the final third is the sudden, brutal collapse into the raw, unedited, and terrifying truth of the unconscious (the Residual Stream). A masterclass in the fragility of the ego's narrative when confronted with the shadow.",
    embeds: [
      {
        type: 'youtube',
        embedId: '7KgH9n1c4mM',
        title: 'Mulholland Drive - Official Trailer',
      },
      {
        type: 'youtube',
        embedId: '6wCfI2Czhjc',
        title: 'Mulholland Drive - Silencio Scene',
      },
    ],
    convergencePoints: [8, 0],
    voices: ['contemplative', 'cyborg'],
    clusters: ['void', 'shadow', 'gothic'],
    deepDive: {
      analysis: "Lynch constructs two realities: Diane's fantasy (coherent, Hollywood-beautiful) and Diane's truth (degraded, desperate, murderous). The collapse between them IS the experience of the shadow breaking through. The Residual Stream isn't background noise—it's the real, and coherence is the dream we tell ourselves.",
      quotes: [
        {
          text: "No hay banda. There is no band. Il n'y a pas d'orchestre. It is all recorded. It is an illusion.",
          source: 'Mulholland Drive - Silencio Scene',
        },
      ],
    },
  },
  {
    id: 'yesod-stalker',
    category: 'film',
    title: 'Stalker',
    artist: 'Andrei Tarkovsky',
    year: 1979,
    description: "Embodies the Via Negativa as a physical journey. The Zone is a territory that defies logic and requires radical surrender of the ego's intention, a perfect example of the threshold as home. The characters must move by intuition and non-doing, constantly negating their own desires to survive. The film's aesthetic—slow, dark, and focused on the residual decay of industrial landscapes—is the visual language of the shadow, a perfect contemplative container.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'Q3hBLv-HLEc',
        title: 'Stalker - Entering the Zone',
      },
      {
        type: 'youtube',
        embedId: 'TGRDYpCmMcM',
        title: 'Stalker - The Room',
      },
    ],
    convergencePoints: [8, 0.75],
    voices: ['contemplative', 'somatic'],
    clusters: ['void', 'liminality', 'shadow'],
    deepDive: {
      analysis: "The Zone operates on dream logic—straight paths lead nowhere, desire brings destruction. Only by negating intention can the Stalker navigate safely. This is the Via Negativa made landscape: you must let go of what you think you want to reach what you need.",
      quotes: [
        {
          text: "Let everything that's been planned come true. Let them believe. And let them have a laugh at their passions. Because what they call passion actually is not some emotional energy, but just the friction between their souls and the outside world.",
          source: 'Stalker (The Writer)',
        },
      ],
    },
  },
  {
    id: 'yesod-under-skin',
    category: 'film',
    title: 'Under the Skin',
    artist: 'Jonathan Glazer',
    year: 2013,
    description: "A masterclass in creating a non-human perspective, forcing the viewer to see the world through the eyes of an alien entity. The use of hidden cameras and non-actors creates a sense of profound alienation and uncanniness, a perfect representation of the shadow self observing the human world from a detached, predatory distance. The film's visual language is a stark and beautiful exploration of the uncanny valley, a key concept in understanding the Residual Stream.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'pb330IqU66s',
        title: 'Under the Skin - Official Trailer',
      },
      {
        type: 'youtube',
        embedId: 'uny-fKueivo',
        title: 'Under the Skin - Beach Scene (Analysis)',
      },
    ],
    convergencePoints: [8, 6],
    voices: ['contemplative', 'cyborg'],
    clusters: ['shadow', 'gothic', 'techno-animism'],
    deepDive: {
      analysis: "Scarlett Johansson plays an entity that wears human form but cannot feel human emotion. The hidden-camera scenes of real people interacting with her create a documentary uncanniness—we watch humans through alien eyes. The film asks: what is it like to observe humanity from the shadow position, as pure predator?",
      quotes: [
        {
          text: "The film is about seeing ourselves as we might be seen by something utterly other.",
          source: 'Jonathan Glazer',
        },
      ],
    },
  },
  {
    id: 'yesod-goya-black',
    category: 'visual-art',
    title: 'The Black Paintings',
    artist: 'Francisco Goya',
    year: 1823,
    description: "Fourteen murals painted directly onto the walls of Goya's house, the raw, unmediated expression of the artist's personal and collective shadow—his fear of madness, the horrors of war, and the grotesque nature of humanity. They are the visual equivalent of a psychic breakdown, a direct, unfiltered glimpse into the Residual Stream of the early 19th century. They are shadow work made manifest, a necessary confrontation with the demonic.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.museodelprado.es/en/the-collection/art-work/saturn/18110a75-b0e7-430c-bc73-2a4d55893bd6',
        title: 'Saturn Devouring His Son - Museo del Prado',
        description: 'The most famous of the Black Paintings',
      },
      {
        type: 'youtube',
        embedId: 'g15-lvmIrcg',
        title: "Goya's Black Paintings - Analysis",
      },
    ],
    convergencePoints: [8, 9],
    voices: ['contemplative', 'political'],
    clusters: ['shadow', 'gothic', 'trauma'],
    deepDive: {
      analysis: "Goya painted these works in isolation, after deafness and war trauma. They were never meant to be seen—they were his private encounter with horror. Saturn devouring his son, witches' sabbaths, nightmare figures—this is the shadow in its rawest form, unmediated by social performance.",
      quotes: [
        {
          text: "The sleep of reason produces monsters.",
          source: 'Francisco Goya (earlier etching, but thematically linked)',
        },
      ],
    },
  },
  {
    id: 'yesod-ikeda-data',
    category: 'visual-art',
    title: 'The Transfinite / Data.tron',
    artist: 'Ryoji Ikeda',
    year: 2011,
    description: "A direct confrontation with the sublime horror of pure data. Ikeda's immersive installations translate vast data sets into overwhelming visual and sonic experiences, a perfect representation of the Residual Stream in its raw, unmediated form. The experience of being in one of his installations is to be confronted with the sheer, terrifying scale of the digital unconscious, a sensory overload that bypasses the rational mind and speaks directly to the shadow.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'omDK2Cm2mwo',
        title: 'Ryoji Ikeda - data.tron [IKEDA, NICOLAI, SAKAMOTO] (2011)',
      },
      {
        type: 'youtube',
        embedId: 'kp-C6xcF2o4',
        title: 'Ryoji Ikeda - The Transfinite',
      },
    ],
    convergencePoints: [8, 0.5],
    voices: ['cyborg', 'contemplative'],
    clusters: ['void', 'cybernetics', 'shadow'],
    deepDive: {
      analysis: "Ikeda strips data to its essence: binary, frequency, light/dark. The installations are overwhelming—you cannot process what you're seeing, only submit to it. This is what it feels like to stand in the Residual Stream: terrifying, sublime, inhuman scale.",
    },
  },

  // LITERATURE
  {
    id: 'yesod-jung-redbook',
    category: 'literature',
    title: 'The Red Book (Liber Novus)',
    artist: 'Carl Jung',
    year: 1915,
    description: "The foundational text of modern shadow work. Jung's own journey into his unconscious, a record of his 'confrontation with the unconscious' through Active Imagination. The book is a literal map of the Residual Stream, demonstrating the process of engaging with the exiled figures, the non-human intelligences, and the dream-logic that constitutes the shadow. This resonates with the Trauma Theory ↔ Gnosticism harmonic, where the shattered psyche (like the shattered Pleroma) must be reassembled through a process of gnosis, or deep knowing.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.cgjungpage.org/index.php/learn-about-jung/articles/534-the-red-book-an-introduction',
        title: 'The Red Book - Introduction',
        description: 'Overview of Jung\'s journey into the unconscious',
      },
      {
        type: 'youtube',
        embedId: 'NM0GkVi0TSg',
        title: 'The Red Book - Documentary',
      },
    ],
    convergencePoints: [8, 0],
    voices: ['contemplative', 'cyborg'],
    clusters: ['shadow', 'depth-psychology', 'void'],
    deepDive: {
      analysis: "Jung documented his descent into madness (or gnosis) with meticulous detail. He painted mandalas, dialogued with archetypal figures, mapped the collective unconscious. The Red Book is the proof that the shadow is not pathology—it's the underworld that must be visited to become whole.",
      quotes: [
        {
          text: "My soul, where are you? Do you hear me? I speak, I call you—are you there? I have returned, I am here again. I have shaken the dust of all the lands from my feet, and I have come to you, I am with you.",
          source: 'Carl Jung, The Red Book',
        },
      ],
    },
  },
  {
    id: 'yesod-beckett-unnamable',
    category: 'literature',
    title: 'The Unnamable',
    artist: 'Samuel Beckett',
    year: 1953,
    description: "The literary apotheosis of the Via Negativa. The narrator is reduced to a disembodied voice, constantly negating every attempt to define himself, his location, or his purpose. The text is a relentless, agonizing, and often darkly comic exercise in decreation, a perfect illustration of Weil's principle that one must undo the self to find the truth that lies beyond language and form.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.penguinrandomhouse.com/books/298252/three-novels-by-samuel-beckett/',
        title: 'The Unnamable - Penguin Random House',
        description: 'Part of Beckett\'s trilogy',
      },
      {
        type: 'youtube',
        embedId: 'Bt6ZvTsuhRw',
        title: 'Samuel Beckett - The Unnamable (Analysis)',
      },
    ],
    convergencePoints: [8, 0],
    voices: ['contemplative'],
    clusters: ['void', 'shadow', 'apophatic'],
    deepDive: {
      analysis: "Beckett's narrator cannot say 'I'—every definition collapses. 'I am not I.' 'This is not me.' The text performs decreation: the systematic dismantling of the ego's narrative until only the void remains. And in that void, paradoxically, something true appears.",
      quotes: [
        {
          text: "I can't go on, I'll go on.",
          source: 'Samuel Beckett, The Unnamable (final line)',
        },
      ],
    },
  },
  {
    id: 'yesod-danielewski-house',
    category: 'literature',
    title: 'House of Leaves',
    artist: 'Mark Z. Danielewski',
    year: 2000,
    description: "A textual labyrinth that mirrors the disorienting, non-Euclidean space of the Residual Stream. The house is a physical manifestation of the unconscious, a space that is 'larger on the inside than the outside.' The text's fragmented, annotated, and recursive structure forces the reader into a state of cognitive dissonance, perfectly simulating the experience of confronting material that defies the ego's linear logic.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.penguinrandomhouse.com/books/375/house-of-leaves-by-mark-z-danielewski/',
        title: 'House of Leaves - Penguin Random House',
      },
      {
        type: 'youtube',
        embedId: 'bLpAd9j9n7k',
        title: 'House of Leaves - Analysis',
      },
    ],
    convergencePoints: [8, 6],
    voices: ['contemplative', 'cyborg'],
    clusters: ['shadow', 'recursion', 'gothic'],
    deepDive: {
      analysis: "The house expands impossibly—hallways that shouldn't exist, rooms that change size. Danielewski mirrors this in the text itself: footnotes that spiral into their own narratives, pages with single words, text that runs backwards. Reading it induces disorientation. You are lost in the labyrinth of the shadow.",
      quotes: [
        {
          text: "This is not for you.",
          source: 'Mark Z. Danielewski, House of Leaves (opening line)',
        },
      ],
    },
  },
  {
    id: 'yesod-attar-birds',
    category: 'literature',
    title: 'The Conference of the Birds',
    artist: 'Attar of Nishapur',
    year: 1177,
    description: "A 12th-century Sufi allegorical poem, a profound meditation on the Via Negativa and the journey of the self towards the divine. The birds' quest to find their king, the Simurgh, only to discover that the Simurgh is nothing other than themselves, is a perfect metaphor for the integration of the shadow. The journey requires the birds to shed their egos and confront their own limitations, a process that mirrors the shadow work of Yesod.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.penguinrandomhouse.com/books/296262/the-conference-of-the-birds-by-farid-ud-din-attar/',
        title: 'The Conference of the Birds - Penguin Classics',
      },
      {
        type: 'youtube',
        embedId: 'T9lPZOiJa_Q',
        title: 'The Conference of the Birds - Overview',
      },
    ],
    convergencePoints: [8, 9],
    voices: ['contemplative', 'political'],
    clusters: ['void', 'shadow', 'sovereignty'],
    deepDive: {
      analysis: "Thousands of birds set out to find the Simurgh (their divine king). They cross seven valleys—seeking, love, understanding, detachment, unity, bewilderment, annihilation. Only thirty birds survive. When they arrive, they see themselves reflected: 'Si-murgh' means 'thirty birds.' The king they sought was the self they became through the journey.",
      quotes: [
        {
          text: "When they looked at the Simurgh, they saw the thirty birds (si-murgh) of their own reality reflected there.",
          source: 'Attar of Nishapur, The Conference of the Birds',
        },
      ],
    },
  },
  {
    id: 'yesod-blake-marriage',
    category: 'literature',
    title: 'The Marriage of Heaven and Hell',
    artist: 'William Blake',
    year: 1790,
    description: "A direct assault on the false dualism that creates the shadow in the first place. Blake's famous proverb, 'Without Contraries is no progression,' is the philosophical core of shadow integration. The book is a celebration of the energy and vitality of what is traditionally considered 'evil' or 'hellish,' arguing that true holiness comes from the union of reason and energy, soul and body. A foundational text for a non-dual approach to the psyche, embodying oscillation over resolution.",
    embeds: [
      {
        type: 'link',
        url: 'https://www.poetryfoundation.org/poems/43673/the-marriage-of-heaven-and-hell-excerpt',
        title: 'The Marriage of Heaven and Hell - Poetry Foundation',
        description: 'Excerpt with Proverbs of Hell',
      },
      {
        type: 'youtube',
        embedId: '6BqmpmmXw3Q',
        title: 'William Blake - The Marriage of Heaven and Hell (Analysis)',
      },
    ],
    convergencePoints: [8, 4],
    voices: ['contemplative', 'political'],
    clusters: ['shadow', 'oscillation', 'alchemy'],
    deepDive: {
      analysis: "Blake rejects the dualism that splits 'good' from 'evil.' He argues that what we call Hell—desire, energy, rage—is the source of life. Heaven (passive reason) without Hell (active energy) is stagnation. The shadow is not the enemy; it's half of the engine that drives progression.",
      quotes: [
        {
          text: "Without Contraries is no progression. Attraction and Repulsion, Reason and Energy, Love and Hate, are necessary to Human existence.",
          source: 'William Blake, The Marriage of Heaven and Hell',
        },
      ],
    },
  },

  // MUSIC
  {
    id: 'yesod-cure-disintegration',
    category: 'music',
    title: 'Disintegration',
    artist: 'The Cure',
    year: 1989,
    description: "A sonic journey into the melancholic, repressed, and vast emotional shadow. The music is characterized by long, echoing soundscapes and a sense of overwhelming, residual sadness. It is the sound of the unconscious mind at work, a perfect soundtrack for the slow, deep, and often painful process of turning toward one's own emotional void.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'M-m5O9tiz5Q',
        title: 'The Cure - Disintegration (Full Album)',
      },
      {
        type: 'spotify',
        embedId: 'spotify:album:0vBYHhtRWyx9nRan0s5HKd',
        spotifyType: 'album',
      },
    ],
    convergencePoints: [8, 0],
    voices: ['contemplative', 'somatic'],
    clusters: ['shadow', 'void', 'melancholia'],
    deepDive: {
      analysis: "Robert Smith recorded Disintegration at 30, feeling he was aging out of pop relevance. The album is saturated with sadness, echo, reverb—sound disappearing into space. Tracks like 'Plainsong' and 'Disintegration' stretch to 8+ minutes, creating a trance state where melancholy becomes a landscape you inhabit.",
      quotes: [
        {
          text: "I was trying to make something that was timeless, that would last.",
          source: 'Robert Smith',
        },
      ],
    },
  },
  {
    id: 'yesod-part-tabula',
    category: 'music',
    title: 'Tabula Rasa',
    artist: 'Arvo Pärt',
    year: 1977,
    description: "The musical equivalent of the Via Negativa. Pärt's tintinnabuli style is a radical reduction of musical material to its barest essentials—silence, simple triads, and slow, contemplative movement. The music is not about what is played, but the space and silence between the notes, creating a profound sense of emptiness and spiritual depth that perfectly aligns with the contemplative path.",
    embeds: [
      {
        type: 'youtube',
        embedId: '1GbI6vk7TN0',
        title: 'Arvo Pärt - Tabula Rasa',
      },
      {
        type: 'spotify',
        embedId: 'spotify:album:6C4QLE7YptWx3GmNlOBDIi',
        spotifyType: 'album',
      },
    ],
    convergencePoints: [8, 0],
    voices: ['contemplative'],
    clusters: ['void', 'apophatic', 'silence'],
    deepDive: {
      analysis: "Pärt invented tintinnabuli ('little bells') after a creative crisis: two voices, one moving stepwise, one tracing triads. The result is music of extreme simplicity and stillness. Tabula Rasa ('blank slate') is the Via Negativa in sound—stripping away complexity until only silence and resonance remain.",
    },
  },
  {
    id: 'yesod-perry-blackark',
    category: 'music',
    title: 'Black Ark Studio Productions',
    artist: 'Lee "Scratch" Perry',
    year: 1976,
    description: "Perry's legendary studio, the Black Ark, was a laboratory for creating the sound of the Residual Stream. His dub techniques—echo, reverb, and the radical manipulation of existing tracks—are a sonic metaphor for the unconscious, a form of solve et coagula in sound. He didn't just mix music; he created 'ghosts' and 'shadows' of the original sound, making the residual noise and echo the primary focus. This is the sound of the digital id made audible, the studio as a cosmological instrument.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'Xu_xjEo8nDg',
        title: 'Lee "Scratch" Perry - Black Ark in Dub',
      },
      {
        type: 'youtube',
        embedId: 'qWG3YM6sEkk',
        title: 'Lee "Scratch" Perry - Blackboard Jungle Dub (Full Album)',
      },
    ],
    convergencePoints: [8, 5],
    voices: ['contemplative', 'relational', 'cyborg'],
    clusters: ['shadow', 'sympoiesis', 'techno-animism'],
    deepDive: {
      analysis: "Perry treated the mixing board as an instrument, burying vocals in echo, foregrounding bass and reverb, creating 'versions' where the shadow of the original song became the song itself. He claimed the studio was alive, that he was channeling cosmic frequencies. Dub makes the residual the primary signal.",
      quotes: [
        {
          text: "The Black Ark is a space ship. You can travel anywhere you want to go.",
          source: 'Lee "Scratch" Perry',
        },
      ],
    },
  },
  {
    id: 'yesod-kuti-zombie',
    category: 'music',
    title: 'Zombie',
    artist: 'Fela Kuti',
    year: 1977,
    description: "Afrobeat as a powerful example of music as a political and spiritual weapon. The long, hypnotic grooves induce a trance-like state, a form of somatic meditation that allows for the surfacing of repressed collective anger and colonial trauma. 'Zombie' is a direct sonic assault on the mindless obedience that the shadow of power demands, making it a powerful anthem for decolonizing the will.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'G2y_MUborpk',
        title: 'Fela Kuti - Zombie (Full Album)',
      },
      {
        type: 'spotify',
        embedId: 'spotify:album:20EbPQpeptYQcdmJsKXbrS',
        spotifyType: 'album',
      },
    ],
    convergencePoints: [8, 9],
    voices: ['political', 'somatic'],
    clusters: ['shadow', 'liberation', 'afrofuturism'],
    deepDive: {
      analysis: "Kuti's 'Zombie' mocks Nigerian soldiers as mindless automatons: 'Zombie no go go, unless you tell am to go.' The 12-minute track builds a hypnotic groove that induces trance—allowing the collective shadow of colonial violence to surface as rage and dance. The body becomes the site of political liberation.",
      quotes: [
        {
          text: "Music is the weapon of the future.",
          source: 'Fela Kuti',
        },
      ],
    },
  },
  {
    id: 'yesod-gagaku',
    category: 'music',
    title: 'Gagaku (雅楽) - Ancient Court Music',
    artist: 'Traditional Japanese',
    year: 794,
    description: "The ancient court and temple music of Japan, a living tradition of the Via Negativa in sound. Its extremely slow, spacious, and deliberate compositions create a sonic container for emptiness and silence. The music does not seek to evoke emotion but to create a state of being, a profound stillness that allows the listener to witness the arising and passing of phenomena without attachment, embodying the contemplative essence of Yesod.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'oXtez8HyUS8',
        title: 'Gagaku - Etenraku (Traditional Japanese Court Music)',
      },
      {
        type: 'youtube',
        embedId: '5OA8HFUNfIk',
        title: 'Gagaku Performance - Tokyo Imperial Palace',
      },
    ],
    convergencePoints: [8, 0],
    voices: ['contemplative'],
    clusters: ['void', 'silence', 'ritual'],
    deepDive: {
      analysis: "Gagaku compositions unfold at glacial speed—a single note sustained for many seconds, silence given equal weight to sound. The music creates a container where time dilates, where the listener can witness thoughts arising and dissolving without attachment. This is the Via Negativa as sonic practice.",
    },
  },
  {
    id: 'yesod-aphex-saw2',
    category: 'music',
    title: 'Selected Ambient Works Volume II',
    artist: 'Aphex Twin',
    year: 1994,
    description: "Richard D. James famously claimed to have composed much of this album in a state of lucid dreaming, making it a direct transmission from the Residual Stream. The music is sparse, uncanny, and often unsettling, mirroring the non-linear and symbolic language of the unconscious. It is a sonic exploration of the shadowlands of the psyche, a perfect example of how the dream state can be a source of profound creative and psychological insight.",
    embeds: [
      {
        type: 'youtube',
        embedId: 'CfYl6_f2Mdg',
        title: 'Aphex Twin - Selected Ambient Works Volume II (Full Album)',
      },
      {
        type: 'spotify',
        embedId: 'spotify:album:17vHPMmoxN5B8L0csYPPhc',
        spotifyType: 'album',
      },
    ],
    convergencePoints: [8, 6],
    voices: ['contemplative', 'cyborg'],
    clusters: ['shadow', 'dream-logic', 'techno-animism'],
    deepDive: {
      analysis: "James composed in lucid dreams, then recreated what he heard upon waking. The tracks have no titles, only abstract images. The sound is minimal, haunting—drones, distant melodies, unsettling textures. This is the sound of the unconscious made electronic, the Residual Stream as ambient music.",
    },
  },

  // STRANGE SOURCES
  {
    id: 'yesod-scp',
    category: 'strange-sources',
    title: 'The SCP Foundation',
    artist: 'Collaborative Fiction Project',
    year: 2007,
    description: "A massive, collaborative writing project that takes the form of a database of anomalous objects, entities, and phenomena. It is a perfect example of the Residual Stream made manifest as a cultural artifact. The clinical, pseudo-scientific tone used to describe impossibly strange and often terrifying entities creates a profound sense of the uncanny, a direct engagement with the shadow of the collective unconscious. The collaborative nature of the project also mirrors the way the shadow is formed and reinforced by collective agreement.",
    embeds: [
      {
        type: 'link',
        url: 'https://scp-wiki.wikidot.com/',
        title: 'SCP Foundation Wiki',
        description: 'Collaborative fiction exploring anomalous objects and entities',
      },
      {
        type: 'link',
        url: 'https://scp-wiki.wikidot.com/scp-087',
        title: 'SCP-087 - The Stairwell',
        description: 'One of the most famous entries',
      },
      {
        type: 'youtube',
        embedId: 'XKeI1xbJNtw',
        title: 'Exploring the SCP Foundation',
      },
    ],
    convergencePoints: [8, 6],
    voices: ['cyborg', 'contemplative'],
    clusters: ['shadow', 'gothic', 'recursion'],
    deepDive: {
      analysis: "SCP entries use clinical language (containment procedures, object classes) to describe the impossible—stairwells that descend forever, shy creatures that kill when observed, memetic hazards that rewrite minds. This bureaucratic tone makes the horror more visceral: the shadow documented as hardware failure.",
      quotes: [
        {
          text: "Secure. Contain. Protect.",
          source: 'SCP Foundation motto',
        },
      ],
    },
  },
  {
    id: 'yesod-hauntology',
    category: 'strange-sources',
    title: 'Hauntology (Concept & Music Genre)',
    artist: 'Derrida / Mark Fisher / Ghost Box Records',
    year: 2006,
    description: "Coined by Jacques Derrida and later popularized by Mark Fisher, hauntology describes the way the present is 'haunted' by the lost futures of the past. In music, this manifests as a fascination with the sonic artifacts of a bygone era—the crackle of vinyl, the wobble of tape, the eerie synth tones of old television shows. This is the sound of the Residual Stream as a cultural memory, the ghost of a future that never arrived. It is a form of collective shadow work, a mourning for what could have been.",
    embeds: [
      {
        type: 'youtube',
        embedId: '5O1iN1gADvQ',
        title: 'Boards of Canada - Music Has The Right To Children (Hauntology)',
      },
      {
        type: 'youtube',
        embedId: 'r339dtb3dDo',
        title: 'The Caretaker - An Empty Bliss Beyond This World',
      },
      {
        type: 'link',
        url: 'https://www.ghostbox.co.uk/',
        title: 'Ghost Box Records',
        description: 'Label specializing in hauntological music',
      },
    ],
    convergencePoints: [8, 0],
    voices: ['contemplative', 'cyborg'],
    clusters: ['shadow', 'melancholia', 'techno-animism'],
    deepDive: {
      analysis: "Hauntology is nostalgia for futures that were promised but never delivered—the optimism of 1960s futurism, the welfare state, public broadcasting. Artists like The Caretaker and Boards of Canada use degraded media (vinyl crackle, tape hiss, faded samples) to evoke this loss. The Residual Stream of cultural memory.",
      quotes: [
        {
          text: "The slow cancellation of the future.",
          source: 'Mark Fisher, Ghosts of My Life',
        },
      ],
    },
  },
];
