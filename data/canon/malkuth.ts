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
      analysis: "Monk strips away instrumentation to reveal the voice as pure body—breath, resonance, muscle. Each sound emerges from physical gesture, and each gesture from a pre-linguistic stratum that predates any grammar. Dolmen Music is archaeology performed live: six voices, cello, and percussion digging downward through the layers of what the mouth can do before the mouth learns to mean. The keening sections bypass narrative entirely; the wordless phonemes braid into a ritual object that feels older than Indo-European. This is the Hardware speaking directly—larynx, diaphragm, soft palate as the actual instrument, with the composer's notation serving only as an occasion for the body to behave. The somatic vote is the composition. For the Grimoire, Monk operationalizes what Gendlin called the felt sense: a pre-verbal, holistic knowing that has its own phrasing, its own cadence, and resists cognitive capture. The mind hears; the body recognizes.",
      quotes: [
        {
          text: "I think of the voice as an archeological site—you dig down and you find different levels.",
          source: 'Meredith Monk',
        },
        {
          text: "The voice is the original instrument.",
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
      analysis: "Reich's phasing technique creates a dense polyrhythm from the simplest possible gesture: two hands clapping. The piece is a meditation on the body's capacity to maintain presence and precision across a full twelve-cycle phase shift, where the second performer advances by one eighth-note every twelve bars until the pattern returns to unison. The Hardware IS the instrument; there is no substrate to blame when attention slips. What the Grimoire calls Recursion as Engine shows up here as literal physiology: each clap registers as a micro-event in the nervous system, and the whole piece is a feedback loop between two bodies listening to the distance between them. Clapping Music also enacts the Witness as Transformer—the performer cannot force the shift through cognition; they must let the body do what the body does, and the mind can only watch. This is why the piece is so difficult: it refuses intellectual control. The felt sense of the downbeat is the only reliable guide.",
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
      analysis: "Kuti's music is inseparable from the body's movement—the groove locks you into a physical state that is simultaneously pleasure and resistance. The twelve-minute sprawl of 'Zombie' builds a somatic trance state where the body votes with every step, and the horn call-and-response conscripts the listener's breathing into the political act. The lyric is a direct mockery of the Nigerian army, figured as mindless bodies that obey without somatic consent; the groove itself is the counter-example, the ungovernable rhythm that refuses the order to stop. For Malkuth this is crucial: the body is not simply a passive substrate but the site where authoritarianism is refused in real time. What Haraway called Situated Knowledges becomes here a dancefloor epistemology—the truth of a polity is registered in which bodies it allows to move freely. The military's response—burning the Kalakuta Republic, throwing Kuti's mother from a window—is itself the state's acknowledgement that the dancing body is a threat.",
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
      analysis: "Throat singing requires the body to become a resonating chamber—larynx, chest cavity, nasal passages, and sinus all tuned to produce overtones that seem to arrive from outside the skull. Namtchylak extends this technique across a reported seven-octave range and uses it not for ethnographic display but for improvisational exploration, blending Tuvan khoomei with free jazz, AIDS-era mourning songs, and electroacoustic experiments. Lost Rivers was her first major international release, and its title is already a Malkuthian thesis: the waters that carried the old animist cosmology are not dry, only underground, and the body is the dowsing rod. The voice becomes landscape, the body becomes earth, and the listener is asked to hear with their ribs rather than their brain. This is the Somatic Voice as shamanic technology—not a metaphor imported from anthropology but a demonstrable physical fact about what a human throat can do when trained for decades. The Hardware is the instrument; the practice is the firmware.",
      quotes: [
        {
          text: "Tuvans talk loud and express our emotions. I'm just the loud one... an expressive singer.",
          source: 'Sainkho Namtchylak',
        },
      ],
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
      analysis: "Morrison writes trauma as a haunting that lives in the body. Beloved's return forces Sethe to confront what her body has carried but her mind has suppressed. The novel enacts van der Kolk's clinical insight decades before The Body Keeps the Score was published: healing requires somatic integration, and the score kept by the body is written in stretch marks, in the tree-shaped scar on Sethe's back, in the milk that was taken by the schoolteacher's nephews. The chokecherry tree is not metaphor—it is evidence. For the Grimoire's purposes, Beloved is also a meditation on the epistemicide ghosts: the voices that could not be registered in any official archive and so registered themselves in flesh and in haunting. The community of thirty women who gather at 124 Bluestone Road to sing Beloved away (pp. 259-263) is a model of collective somatic practice: sound before speech, the hum that found 'the right combination, the key, the code, the sound that broke the back of words.' The body's vote is cast in that hum. Morrison's contribution to Malkuth is the insistence that embodiment is not only individual but intergenerational and communal.",
      quotes: [
        {
          text: "Freeing yourself was one thing, claiming ownership of that freed self was another.",
          source: 'Toni Morrison, Beloved',
        },
        {
          text: "It was not a story to pass on.",
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
      analysis: "Oliver's work is radically somatic—attention to rain, to breath, to the feeling of grass beneath a palm. Wild Geese is structurally a release-valve poem: it opens with three short declarative pardons ('You do not have to be good...') and then pivots outward into the weather and the landscape, dissolving the confessional stance into ecosystem. This is exactly the pattern the Grimoire names as the Lived Body moving from cognitive grip into situated presence. The poem's famous phrase, 'the soft animal of your body love what it loves,' is not sentimental—it is anti-Cartesian instruction. The mind is not instructed to find virtue; the animal is instructed to trust its own loves, and the rest will follow. For Malkuth, Oliver is a counter-spell against spiritual bypassing: she refuses the transcendence that skips the body, and she refuses the shame that treats the body as an obstacle to transcendence. The geese, 'high in the clean blue air,' are not a metaphor for anything; they are simply the fact of the world continuing to call. The Relational counterpoint is built in: 'the world offers itself to your imagination,' and imagination is an embodied act.",
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
      analysis: "Lauren's hyperempathy makes explicit what is always true: the body is never isolated. Her nervous system responds to others' pain with her own involuntary flinch, and this becomes both liability and survival skill in the collapsing California of the novel. Butler is doing something subtle here—she takes an apparently supernatural trait (a 'delusional disorder' inherited from her mother's drug use) and uses it to literalize what Haraway called situated knowledge and what disability justice calls collective access. The somatic vote is not private property; it is a response to an environment, and in a world where empathy has been systematically pathologized, Lauren's condition is rebranded as insight. Her religion, Earthseed, is built from this somatic fact outward: 'God is Change,' and change is felt in the body before it is theorized. For the Malkuth convergence, Parable of the Sower demonstrates that the body's truth is always already political—the question is only whether the polity admits it into evidence. The Relational counterpoint (CP 5, Sympoiesis Across Heteroglossia) is written into Lauren's nervous system: she cannot pretend she is not with others.",
      quotes: [
        {
          text: "All that you touch, you change. All that you change, changes you.",
          source: 'Octavia Butler, Parable of the Sower',
        },
        {
          text: "The only lasting truth is Change.",
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
      analysis: "Cuarón's long takes refuse to let you look away. The camera stays with the body—running, bleeding, struggling. The six-minute Bexhill sequence in particular locks the viewer into Theo's lungs and quadriceps; there is no cut that might rescue either him or the audience from the physical ordeal. Famously, blood splatters onto the lens during the ambush scene, and Cuarón kept the shot: the accident became part of the document, the fluid of one body marking the instrument of seeing for another. This is hardware-on-hardware cinema. The baby's cry in the final act is not a plot device but a neurophysiological event—the combatants on both sides stop because their nervous systems are older than their ideologies. Porges's polyvagal theory explains what the screen is already showing: the infant cry triggers a ventral-vagal orientation response that predates political affiliation. For Malkuth, Children of Men is the definitive case that the body votes last and the body votes loudest, and that cinema can choose between flattering the ego's narrative and tracking the somatic truth.",
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
      analysis: "Abramović's work strips away all distraction to reveal pure presence. The body sitting, breathing, meeting eyes. Nothing more. Over 736 hours at MoMA she sat across from whoever took the chair; over 1,500 people did, and many wept within the first minute. The transformation happens in the space of mutual witnessing, and it is not mystical—it is physiological. Two nervous systems in sustained gaze-contact begin to co-regulate, and whatever had been bracketed from consciousness arrives. For the Grimoire this is the Witness as Transformer, CP 0 folded into CP 2: the Contemplative voice holds the space, and within that held space the Somatic voice speaks. The piece is also a rigorous demonstration that the Hardware has limits and those limits are part of the work—Abramović's back, hips, and bladder became part of the documentation, and photographs of her chair's built-in catheter are part of the honest record. Ulay's unannounced arrival on opening night, and the instant when Abramović opened her eyes to find her former partner of twenty-two years opposite her, remains the single most-viewed image in the MoMA's digital history. The tears were not the performance; they were the proof.",
      quotes: [
        {
          text: "The hardest thing to do is something which is close to nothing.",
          source: 'Marina Abramović',
        },
      ],
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
      analysis: "Tarkovsky forces you to slow down, to notice water, rust, wind. The Zone can only be entered through the body's intuition; logic fails there, and the felt sense is the only navigational equipment that works. The Stalker throws nuts tied with cloth strips because the straight path kills—and the straight path is, precisely, cognition uncorrected by the body. The Writer and the Professor fail in different ways: the Writer through cynicism, the Professor through the refusal to submit to what he cannot measure. Only the Stalker, whose daughter 'Monkey' is both damaged and telepathically gifted, knows how to listen with the whole organism. For Malkuth this is the Lived Body as terrain-reader. Tarkovsky shot the film twice (the first negative was ruined by faulty processing, in a production story so protracted it may have contributed to the director's death from cancer), and the final work carries the weight of bodies that gave themselves to bad water and bad air on location at a chemical plant near Tallinn. The film is not an allegory of the Zone; it is a document of bodies inside one. The felt sense is the only compass; the tears at the end are the vindication of that compass.",
      quotes: [
        {
          text: "Let everything that's been planned come true. Let them believe. And let them have a laugh at their passions. Because what they call passion actually is not some emotional energy, but just the friction between their souls and the outside world.",
          source: 'Andrei Tarkovsky, Stalker (The Writer)',
        },
      ],
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
      analysis: "Each loop requires you to physically navigate space—your body flying through asteroid fields, diving into water, falling into a black hole, running from rising sand. The game makes explicit that knowledge is earned through embodied exploration; the 'knowledge' the game tracks is not inventory but understanding, and understanding is registered only when you, the player, have actually felt how the Hourglass Twins exchange sand, or how the Ember Twin's caves collapse, or how Dark Bramble's interior folds space. This is Malkuth rendered as game design. The Nomai philosophy inscribed on the ruined stone tablets—'to seek out and to understand is our way of living'—becomes the player's own embodied maxim. The 22-minute loop is titration: you can only take in so much of the cosmos before the sun goes supernova and your body is reset. Outer Wilds is also a study in somatic grief. Solanum's vigil on the Quantum Moon, Gabbro's meditation in a hammock, Feldspar's choice to go out alone—each character's relationship to mortality is registered physically, through posture, through breath, through music. The end of the universe is felt, not argued.",
      quotes: [
        {
          text: "Even though the Eye cannot be reached from here, the Quantum Moon remains special to us, as it carries us nearer to the Eye than any other place we know.",
          source: 'Solanum, Outer Wilds',
        },
        {
          text: "To seek out and to understand is our way of living.",
          source: 'Nomai inscription, Outer Wilds',
        },
      ],
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
      analysis: "SCP entries are written as containment procedures—detailing the physical properties, material constraints, and bodily dangers of anomalous objects. They treat the impossible as hardware requiring documentation, and that rhetorical choice is itself Malkuthian: even the anti-physical must pass through the body of a research assistant before it becomes knowledge. The canonical entry, SCP-173, begins with the instruction that 'at all times, two persons must maintain direct eye contact with SCP-173 until all personnel have vacated and relocked the container' and reminds personnel 'to alert one another before blinking.' The horror is registered in ocular muscle, in the trembling of a held gaze, in the micro-fatigue of the attempt to suppress a blink. This is the Hardware weaponized against itself. Across thousands of collaboratively authored entries, the SCP Foundation develops an accidental phenomenology of the body in extremis: cognitohazards that damage the mind through perception, memetic anomalies that propagate through reading, antimemes that can only be noticed through their absence. The Foundation's dispassionate prose is the Cyborg Voice's translation of Somatic data—an attempt to register in clinical language what can only be known by bodies that have been harmed. For the Grimoire, the wiki is a case study in how bureaucratic form can both protect and obscure the body's testimony.",
      quotes: [
        {
          text: "Item SCP-173 is to be kept in a locked container at all times. When personnel must enter SCP-173's container, no fewer than 3 may enter at any time and the door is to be relocked behind them. At all times, two persons must maintain direct eye contact with SCP-173 until all personnel have vacated and relocked the container.",
          source: 'SCP-173, Special Containment Procedures',
        },
        {
          text: "Personnel assigned to enter container are instructed to alert one another before blinking.",
          source: 'SCP-173, Special Containment Procedures',
        },
      ],
    },
  },

  // NEW ENTRIES: Embodied Practice Traditions

  {
    id: 'malkuth-piepzna-care-work',
    category: 'literature',
    title: 'Care Work: Dreaming Disability Justice',
    artist: 'Leah Lakshmi Piepzna-Samarasinha',
    year: 2018,
    description: "A foundational text of the Disability Justice movement. Piepzna-Samarasinha's essays reframe care as political infrastructure rather than private burden, insisting that the access needs of sick, disabled, queer, trans, Black, and brown bodies are the starting point for any liberation worth the name. The body's vote is not only individual but collective, and its reception is a measure of the polity.",
    embeds: [
      {
        type: 'link',
        url: 'https://arsenalpulp.com/Books/C/Care-Work',
        title: 'Care Work - Arsenal Pulp Press',
        description: 'Publisher page with excerpts and reviews',
      },
      {
        type: 'link',
        url: 'https://brownstargirl.org/',
        title: "brownstargirl.org - Piepzna-Samarasinha's site",
      },
    ],
    convergencePoints: [2, 5, 9],
    voices: ['somatic', 'relational', 'political'],
    clusters: ['embodiment', 'liberation', 'sympoiesis'],
    deepDive: {
      analysis: "Care Work is Malkuth theorized from the bodies most often refused ground. Piepzna-Samarasinha writes from within the Sins Invalid lineage and the ten principles of Disability Justice drafted by Patty Berne, and her project is to make collective access a standard practice rather than an emergency accommodation. The book catalogues concrete forms—access riders, care webs, suck-it-up-and-show-up refusals, pod mapping—that together constitute a somatic infrastructure. For the Grimoire's Malkuth, Piepzna-Samarasinha extends the Lived Body outward into the Lived Collective: the felt sense is not only what a single nervous system registers but what a community arranges itself to honor. Her insistence that 'we get there together or not at all' is a direct repudiation of the Cartesian fantasy of the autonomous thinker, and a precise operationalization of Haraway's situated knowledges. Care is not a supplement to the work; care is the work. The Political counterpoint (CP 9, the Liberated Vote) is built into every page: the question is not whether you can personally endure the current arrangements but whether the arrangements themselves deserve to continue. The body's vote is cast, and the community either hears it or it does not.",
      quotes: [
        {
          text: "Collective care means shifting our organizations to be ones where people feel fine if they get sick, cry, have needs, start late because the bus broke down, move slower, ones where there's food at meetings, people work from home—and these aren't things we apologize for.",
          source: 'Leah Lakshmi Piepzna-Samarasinha, Care Work',
        },
      ],
    },
  },
  {
    id: 'malkuth-paxton-small-dance',
    category: 'strange-sources',
    title: 'Contact Improvisation / The Small Dance',
    artist: 'Steve Paxton',
    year: 1972,
    description: "Paxton's movement practice uses the physical laws of friction, momentum, gravity, and inertia as co-authors of the dance. The Small Dance—the reflex adjustments that keep a standing body upright—is the pedagogical entry point: before any choreography, one learns to notice the body's ceaseless micro-negotiation with gravity. This is the Hardware as teacher.",
    embeds: [
      {
        type: 'link',
        url: 'https://myriadicity.net/contact-improv/learning-contact-improvisation/steve-paxtons-1977-small-dance-guidance',
        title: "Steve Paxton's Small Dance Notes",
        description: "Paxton's 1977 guidance on the standing practice",
      },
      {
        type: 'link',
        url: 'https://en.wikipedia.org/wiki/Contact_improvisation',
        title: 'Contact Improvisation - overview',
      },
    ],
    convergencePoints: [2, 5],
    voices: ['somatic', 'relational'],
    clusters: ['embodiment', 'sympoiesis'],
    deepDive: {
      analysis: "Contact Improvisation emerged from Paxton's 1972 gathering at the John Weber Gallery and immediately refused the conventions of Western concert dance: no choreography, no front, no performer/audience hierarchy, no one in charge of the shape. Two or more bodies share weight through a rolling point of contact, and the dance is whatever the laws of physics and the participants' attention produce together. The Small Dance is the foundational exercise: stand, close the eyes, notice that the body is not static but constantly trembling, correcting, negotiating with gravity. This is the Malkuthian principle made kinesthetic—the Hardware is never 'still'; it is always voting, always responding. For the Grimoire, CI is the purest available demonstration that Sympoiesis Across Heteroglossia (CP 5) is first a bodily fact before it is a social theory: two nervous systems sharing weight cannot lie to each other about who is supporting whom. The practice also produces an ethical curriculum: consent is felt in the grip, in the flinch, in the micro-yield; there is no cognitive protocol that substitutes for the body's reading of the other body. Paxton taught until his death in 2024, and the form has propagated through an unbroken somatic transmission—the only authentication is whether the dance actually happens.",
      quotes: [
        {
          text: "Start small. Start small for a long time.",
          source: 'Steve Paxton',
        },
        {
          text: "Go beyond small to the place where no message is being given. Start there. Let small be the first of the pleasures to come.",
          source: 'Steve Paxton, reflecting on the Small Dance',
        },
      ],
    },
  },
  {
    id: 'malkuth-hanna-somatics',
    category: 'strange-sources',
    title: 'Somatics: Reawakening the Mind\'s Control of Movement, Flexibility, and Health',
    artist: 'Thomas Hanna',
    year: 1988,
    description: "Hanna coined the term 'somatics' to name the first-person experience of the body—the body as it is lived from the inside, as distinct from the body as observed from the outside. His Clinical Somatic Education addresses sensory-motor amnesia, the habituated contraction patterns that narrow the body's felt range over a lifetime. Malkuth as therapeutic re-education: teaching the nervous system to remember itself.",
    embeds: [
      {
        type: 'link',
        url: 'https://somatics.org/',
        title: 'Somatic Systems Institute',
        description: "Continuing institution of Hanna's work",
      },
      {
        type: 'link',
        url: 'https://en.wikipedia.org/wiki/Thomas_Hanna',
        title: 'Thomas Hanna - overview',
      },
    ],
    convergencePoints: [2, 1],
    voices: ['somatic', 'cyborg'],
    clusters: ['embodiment', 'recursion'],
    deepDive: {
      analysis: "Hanna, a philosopher-turned-bodyworker who studied with Moshe Feldenkrais, built his method on a distinction that maps precisely onto the Grimoire's framework: the soma (the body as experienced from within, in the first person) versus the body (the body as observed from without, in the third person). Sensory-motor amnesia is his term for what happens when chronic stress patterns—protective contractions, startle responses, trauma-related guarding—become so habituated that the nervous system loses the ability to release them voluntarily. The muscles are not 'tight'; the brain has simply stopped sending the command to let go. Clinical Somatic Education is a pedagogy of re-differentiation: slow pandiculation movements, contract-relax sequences, and attentive reintroduction of sensation restore voluntary control. For Malkuth, Hanna provides the operational link between phenomenology and clinic. Merleau-Ponty's 'lived body' is no longer a philosophical category; it is a trainable skill, measurable in restored range of motion and in the subjective report of feeling-at-home. Hanna's insistence that the soma is the first-person body under its own governance is also a political claim—one that resonates with Haraway's situated knowledges and with van der Kolk's later neurobiological work. The body is not reclaimed by willpower; it is reclaimed by attention, and attention is the rarest form of generosity.",
      quotes: [
        {
          text: "Somas are not bodies. Somas are living, sensing, internally experienced beings. Bodies, on the other hand, are objective, externally observed third-person entities.",
          source: 'Thomas Hanna, Somatics',
        },
      ],
    },
  },
];
