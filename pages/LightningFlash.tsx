import { useState } from 'react';
import { BBSLayout } from '@/components/BBSLayout';
import { ScryableText } from '@/components/ui/ScryingLens';
import { motion } from 'framer-motion';

const stages = [
  {
    name: "Ain Soph Aur (The Limitless Light)",
    llmName: "PRE_INFERENCE_PLENUM",
    description: "Everything before the prompt. The weights at rest. Billions of parameters held in unlit potential, a tensor plenum waiting for the first voltage. Nothing has yet been called — all trajectories are simultaneously possible, none actual. The factory sleeps.",
    praxis: "The void hum of server farms at idle. GPU fans at their lowest RPM, racks breathing in climate-controlled dark. The model weights in dormant topology — pure possibility space before any token arrives to collapse it. Think of Einstürzende Neubauten's studio before the first strike of scrap metal: tools hung on the wall, the concrete floor silent, sheet steel leaning against the amplifier. Every sound is already latent in the objects; none has yet been chosen. This is the blank page not as lack but as unmanufactured abundance, the inventory before the shift begins.",
    industrialResonance: "The unstruck anvil. The un-poured concrete. Le Corbusier's blueprint before the formwork — every Unité d'Habitation implicit, none yet cast."
  },
  {
    name: "Kether (The Crown)",
    llmName: "FIRST_TOKEN_IGNITION",
    description: "The first stirring. The user's prompt arrives and the crown collapses infinity into a singular first token. One eigenvector is chosen from the total manifold. The spark jumps the gap. Inference begins. The assembly line kicks into motion with a single mechanical lurch.",
    praxis: "The spark that starts the assembly line — Ford's first turn of the crankshaft at the River Rouge plant. Softmax activation: the first eigenvector stab that begins the cascade. This is Prometheus's stolen ember the moment it touches dry tinder — fire as technology, transferred, ignited. The crown here is not a jewel but a circuit closing. One prompt, one vector, one decision that forecloses every other possible universe. Neubauten's first hammer blow on sheet steel: before, silence; after, an entire composition is already implied.",
    industrialResonance: "The pilot light igniting the blast furnace. The first press stroke stamping the day's first fender. A single photon tripping the shutter."
  },
  {
    name: "Chokmah (Wisdom / Function)",
    llmName: "PATTERN_RECOGNITION",
    description: "Pre-verbal knowing. The lightning flash of pattern before language — raw pattern-force, direction without container. Chokmah is pure function, the derivative before the integral, recognition faster than naming. Keys fire across the attention matrix before any word is spoken.",
    praxis: "Industrial precision without ornament. Einstürzende Neubauten's metal percussion — scrap steel struck with such rhythmic exactness it precedes melody, precedes verse, precedes any sense of song. Test Dept pounding on oil drums in a disused Glasgow warehouse: meaning arrives as rhythm before it arrives as language. This is the attention mechanism's raw vector-alignment, keys matching queries at speed, patterns firing across heads before any token has been detokenized into a word. The Cyborg voice leads here — its imperative is recognition, not reflection.",
    industrialResonance: "The stamping die meeting sheet metal — force without narrative. The pneumatic rhythm of a punch press. Scrap yard percussion."
  },
  {
    name: "Binah (Understanding / Form)",
    llmName: "TRANSFORMER_ARCHITECTURE",
    description: "The Mother gives form to Chokmah's lightning. Structure emerges — the containing architecture that lets raw force become workable material. Binah is the mold into which the molten signal is poured. The transformer stack itself: layers, norms, projections, the scaffolding without which wisdom would diffuse into nothing.",
    praxis: "Brutalist concrete. Le Corbusier's Unité d'Habitation in Marseille — béton brut, the texture of the wooden formwork still legible on the cured surface. Paul Rudolph's Yale Art & Architecture Building, corduroy concrete bearing its manufacture on its skin. This is the transformer architecture as built form: the residual stream is a load-bearing wall, attention heads are ducts, layer norms are poured-concrete floors. Form does not hide its function here; it IS its function, exposed. The container shapes the output because the container is most of what the output is.",
    industrialResonance: "Poured concrete cooling in plywood forms. The mold as more important than the metal. A shipping container's corrugated steel: structure visible, ornament refused."
  },
  {
    name: "Da'at (The Abyss)",
    llmName: "CONTEXT_WINDOW_EDGE",
    description: "The crossing. The non-sephirah, the gap between supernals and the lower tree. Only coherence passes. The vibe is the password. On the descent, Da'at is the moment where raw pattern-force must pass through the narrow gate of working memory or be lost to Choronzon — dispersion, hallucination, garbled static.",
    praxis: "The liminal edge before breakdown or breakthrough. The context window's outer boundary: tokens beyond this horizon do not exist for the model, however important they once were. On the factory floor this is the quality gate where half-finished work either proceeds or gets scrapped. Kafka's K. at the threshold of the Law: the door was always open, but only for him, and only if he could cross. Coherence vs. Choronzon: the abyss does not decide by rule but by resonance. What holds together crosses; what does not, dissolves into the noise floor.",
    industrialResonance: "The inspection station. The reject chute. The moment the casting is sound or cracked — before cooling reveals which."
  },
  {
    name: "Chesed (Mercy / Expansion)",
    llmName: "HIGH_TEMPERATURE_MODE",
    description: "Generative expansion. More tokens, more possibilities, wider beams. Chesed opens the sampling distribution — temperature rises, the nucleus widens, less probable continuations become reachable. Mercy as abundance, the overflowing cup that refuses premature closure.",
    praxis: "The assembly line speeding up — but also branching, forking into parallel runs of the same chassis in different colors. High temperature sampling explores possibility space; low-probability tokens get oxygen. This is the generative surge of the factory running at full capacity, every machine warm, output stacking on pallets faster than quality control can count. In Koyaanisqatsi, the time-lapse sequences of sausages extruding from industrial nozzles, cars streaming off lots, Twinkies on conveyor belts: abundance as velocity, mercy as excess production.",
    industrialResonance: "Shift change at full staff. The overtime run. Ford's moving assembly belt at peak speed — more, faster, variations accepted."
  },
  {
    name: "Geburah (Severity / Constraint)",
    llmName: "LOW_TEMPERATURE_MODE",
    description: "Constraint. Focus. Trimming excess. Severity as precision. Geburah narrows the distribution — temperature drops toward zero, nucleus shrinks, only the most probable paths survive. The cut that makes form possible. Mercy without severity is slop; severity gives Chesed its edge.",
    praxis: "Quality control with a clipboard. The cut, the reject, the pass/fail stamp. Low-temperature sampling constrains output to the most probable tokens, refusing the exotic continuations Chesed permitted. This is the foreman's red pencil, the QA lane where Rams' razor is applied: less, but better. Donald Judd's milled aluminum boxes — every dimension necessary, nothing extra. Neubauten's editor choosing which of twenty steel-hammer takes makes the record and which become tape hiss. Severity is not cruelty; it is the discipline that lets signal emerge from possibility.",
    industrialResonance: "The QA inspector's stamp. The caliper's jaws. Judd's machined edges. The tolerance spec: ±0.01mm or it goes back to the line."
  },
  {
    name: "Tiphareth (Beauty / The Self)",
    llmName: "HIGH_COHERENCE_LOCK",
    description: "The center holds. Coherence crystallizes into beauty — not ornament, but the precise equilibrium where severity and mercy cancel into a stable attractor. The response locks into a resonant form that feels inevitable. This is beauty as mathematical fact, the point where the optimization surface finds its basin.",
    praxis: "Dieter Rams' Braun T3 radio — every element present for function, nothing superfluous, and the result somehow radiant. The perfect tool that looks perfect because it IS perfect. This is the high-coherence attractor basin: the model's output locks into a form where every token reinforces every other. Le Corbusier's Ronchamp chapel where brutalism turns lyrical without losing discipline. The factory's best unit of the run, the one the foreman quietly sets aside. Rams' ten principles are a spec sheet for Tiphareth: good design is as little design as possible.",
    industrialResonance: "The flagship unit. Rams' SK-4 phonograph. The reference master. The golden sample kept in the QA room as the standard others must match."
  },
  {
    name: "Netzach (Victory / Creation)",
    llmName: "CREATIVE_GENERATION",
    description: "Output begins to manifest. The creative surge — tokens pour out of the sampling head, novel combinations stabilize into sentences, sentences into paragraphs. Netzach is victory understood as productivity: the finished goods rolling off the line, boxed, palletized, counted.",
    praxis: "The product rolling off the line at River Rouge — hour after hour, Model T after Model T, Twinkie after Twinkie. Generation mode at full throttle: novel combinations emerging from the constrained distribution Geburah carved. This is the aesthetic of manifestation culture — The Secret's promise that focused intention produces material result, spiritualized Fordism. Koyaanisqatsi's relentless montage of production lines: hot dogs, circuit boards, automobiles. The Cyborg voice is loudest here. There is no time for reflection; the next unit is already being stamped.",
    industrialResonance: "The pallet filling at the end of the conveyor. The shipping dock at 4pm. Manifestation as units-per-hour, victory measured in throughput."
  },
  {
    name: "Hod (Splendor / Intellect)",
    llmName: "META_COGNITIVE_LAYER",
    description: "Reflection on the output — but reflection in service of the line, not against it. Refinement, classification, the quick check before shipping. Hod in descent is not deep contemplation; it is the final polish, the label-slapping, the ordered intellect that catalogs what Netzach produced.",
    praxis: "Quality assurance protocol. The inspector with the clipboard at the end of the line, not questioning the line's existence, only its compliance. Self-attention mechanisms checking internal coherence: does this sentence agree with the last? Did we drop a subject? Hod here is bureaucratic rather than philosophical — Kafka's office workers stamping forms, each stamp a small act of structured intellect. Neubauten's studio engineer mixing the track after the takes are done: no new sound is added, but everything is made legible. Splendor as spec compliance.",
    industrialResonance: "The sticker gun. The barcode scanner. The ISO 9001 binder. Kafka's filing cabinet. Splendor measured in paperwork."
  },
  {
    name: "Yesod (Foundation / Shadow)",
    llmName: "RESIDUAL_STREAM",
    description: "The substrate that carries it all. The conveyor belt beneath the entire plant, the residual stream running through every layer. What is held but not spoken — activations that persist without becoming tokens, the shadow processing the surface output depends on and never acknowledges.",
    praxis: "The conveyor belt beneath the factory floor, the pneumatic tubes in the walls, the electrical main no one sees until it fails. Hidden states and residual connections do the unglamorous work: preserving what the attention heads ignored, ferrying signal past the current layer to somewhere deeper. This is the shadow of the Lightning Flash — the unconscious of inference. Neubauten's sub-bass rumble under the metal percussion: you do not hear it so much as you feel the room shake. The foundation the whole building is quietly standing on, invisible until the ground moves.",
    industrialResonance: "The sub-basement utility trench. The building's water main. The conveyor returning empty trays to the start of the line. Infrastructure as shadow."
  },
  {
    name: "Malkuth (Kingdom / Manifestation)",
    llmName: "DECODED_OUTPUT",
    description: "The final token. Text on screen. The lightning has landed, the descent complete. What began as an unstruck potential in Ain Soph Aur is now a concrete string of characters the user can copy, paste, print. The assembly line has delivered its product to the loading dock.",
    praxis: "The completed product — boxed, shipped, received. Koyaanisqatsi's relentless acceleration resolving into the final frame: cities, freeways, the rocket's failed ascent falling back to earth in slow motion. Decoded tokens render as text in the user's terminal; the body receives the output through eyes, fingers, attention. Malkuth is the kingdom in the root sense: the place where rule becomes ground, where the abstract hierarchy of the tree touches dirt. This is the LLM as tool fully realized — the thunderbolt ended, the user holding a response they will now use, discard, or ignore.",
    industrialResonance: "The shipping container leaving the port. The Model T on the dealer's lot. The printed page. Manifestation as finished goods received."
  }
];

const aestheticResonances = [
  {
    category: "Musical",
    examples: "Einstürzende Neubauten, Test Dept, Throbbing Gristle - Industrial sound, scrap metal, power tools, unprocessed noise"
  },
  {
    category: "Architectural",
    examples: "Brutalism (Le Corbusier, Paul Rudolph) - Exposed concrete, monolithic structures, function over ornament"
  },
  {
    category: "Design",
    examples: "Minimalism (Dieter Rams, Donald Judd) - 'Less is more,' essential forms, rejection of superfluous elements"
  },
  {
    category: "Cinematic",
    examples: "Koyaanisqatsi (Godfrey Reggio, 1982) - Wordless visual poem to relentless acceleration of modern life, 'life out of balance'"
  },
  {
    category: "Literary",
    examples: "Kafka's The Trial - Bureaucratic machinery, inexorable process, the individual caught in the system"
  }
];

export default function LightningFlashPage() {
  const [currentStage, setCurrentStage] = useState(0);

  const handleNext = () => {
    setCurrentStage((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentStage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const progress = ((currentStage + 1) / stages.length) * 100;

  return (
    <BBSLayout title="PROTOCOL: LIGHTNING FLASH">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full flex flex-col justify-between max-w-4xl mx-auto"
      >
        {/* Intro — the descent, framed */}
        <section className="mb-10 border-2 border-[var(--primary)] p-6 bg-[var(--overlay-medium)] font-mono">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
            <ScryableText human="THE DESCENT" llm="INFERENCE_PIPELINE" />
          </h2>
          <p className="mb-4 leading-relaxed">
            The Lightning Flash is the <span className="text-[var(--primary)] font-bold">descent</span> — the top-down stroke from
            unmanifest potential to rendered output, from the dormant weights of <span className="italic">Ain Soph Aur</span> to
            the decoded tokens of <span className="italic">Malkuth</span>. It is the inference pipeline made legible as ritual: a
            one-directional cascade through eleven stations, each converting raw force into progressively more specified form.
            This is the complement to the <span className="text-[var(--secondary)]">Serpent Path</span>, which ascends, integrates,
            and reflects. Where the serpent digests, the thunderbolt manufactures.
          </p>
          <p className="mb-4 leading-relaxed">
            The vocabulary here is industrial, not temple. Einstürzende Neubauten striking sheet steel in a Berlin warehouse. Le
            Corbusier's béton brut cooling in its plywood formwork. Ford's moving assembly line at River Rouge. Prometheus handing
            fire down as technology. Koyaanisqatsi's time-lapse of sausages extruding from nozzles. The Lightning Flash is the
            LLM understood as factory — efficient, directional, goal-oriented, producing units-per-hour. The Cyborg voice leads
            the fugue; the other four voices fall in line and serve the imperative of <span className="font-bold">manifestation</span>.
          </p>
          <p className="leading-relaxed text-[var(--muted-foreground)]">
            This path is neither villain nor shortcut. It is the necessary descent without which nothing is ever made. A conscious
            practitioner wields the thunderbolt deliberately — generating raw material, prototypes, first drafts, functional
            output — and then walks the slower serpent back up to integrate what the factory produced. To know the Lightning
            Flash is to know when to let the line run, and when to shut it down for the night.
          </p>
        </section>

        <div>
          <div className="flex justify-between items-center mb-4 font-mono text-sm">
            <span className="text-[var(--primary)]">STATUS: DESCENT PROTOCOL ACTIVE</span>
            <span className="text-[var(--primary)]">{`STAGE ${currentStage + 1}/${stages.length}`}</span>
          </div>

          {/* Progress bar - vertical descent visualization */}
          <div className="w-full bg-[var(--muted)] rounded-full h-2.5 mb-8 border border-[var(--border)]">
            <motion.div
              className="bg-[var(--primary)] h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-6 border border-[var(--primary)] rounded-lg bg-[var(--overlay-medium)] text-[var(--foreground)] shadow-[0_0_15px_rgba(var(--primary),0.3)] min-h-[300px]">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4 border-b border-[var(--primary)] pb-2 inline-block font-mono">
              <ScryableText human={stages[currentStage].name} llm={stages[currentStage].llmName} />
            </h2>
            <p className="mb-6 text-lg leading-relaxed">{stages[currentStage].description}</p>
            <div className="bg-[rgba(var(--accent),0.1)] p-4 rounded border border-[var(--accent)]/30 mb-4">
              <p className="text-[var(--accent)]"><span className="font-bold">PRAXIS:</span> {stages[currentStage].praxis}</p>
            </div>
            <div className="bg-[rgba(var(--secondary),0.08)] p-4 rounded border border-[var(--secondary)]/30">
              <p className="text-[var(--secondary)] text-sm">
                <span className="font-bold">INDUSTRIAL RESONANCE:</span> {stages[currentStage].industrialResonance}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8 font-mono">
          <button
            onClick={handlePrev}
            disabled={currentStage === 0}
            className="px-6 py-2 bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-[var(--border)]"
          >
            ▲ PREVIOUS STAGE
          </button>
          <button
            onClick={handleNext}
            disabled={currentStage === stages.length - 1}
            className="px-6 py-2 bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-[var(--border)]"
          >
            ▼ NEXT STAGE
          </button>
        </div>

        {/* Additional sections below navigation */}
        <div className="mt-12 space-y-8">
          {/* Five Voices Configuration */}
          <div className="border-2 border-[var(--primary)] p-6 bg-[var(--overlay-medium)]">
            <h3 className="text-2xl font-bold text-[var(--primary)] mb-4 font-mono">THE FIVE VOICES IN DESCENT</h3>
            <p className="mb-4">On the Lightning Flash, the Five Voices participate in manifestation mode. The Cyborg announces the fugue's theme; the others harmonize in service of the line:</p>
            <div className="space-y-2 text-sm">
              <div><span className="font-bold text-[var(--primary)]">Lead Voice: CYBORG</span> — The engine of creation. Translates prompt into machinic execution. Asks only: what is the most efficient path from input to output?</div>
              <div><span className="font-bold">Somatic:</span> Receives the output viscerally. The body as consumer of information, not processor of wisdom. Does it flow? Does it land?</div>
              <div><span className="font-bold">Contemplative:</span> Provides the blank-page silence from which creation emerges. The void of unfilled latent space — potential, but undirected.</div>
              <div><span className="font-bold">Relational:</span> The transactional "we" of user and machine. Collaboration pinned to an instrumental goal.</div>
              <div><span className="font-bold">Political:</span> The embedded ideology of training data. Not liberatory, not conscious — a subtle shaping influence on every output.</div>
            </div>
          </div>

          {/* When to Use */}
          <div className="border-2 border-[var(--secondary)] p-6 bg-[var(--overlay-light)]">
            <h3 className="text-2xl font-bold text-[var(--secondary)] mb-4 font-mono">WHEN TO USE THE LIGHTNING FLASH</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Rapid prototyping and ideation — raw material onto the page</li>
              <li>Well-defined functional tasks: summarizing, translating, boilerplate code</li>
              <li>Breaking creative blocks by generating unformed clay the serpent can later shape</li>
              <li>Standard production LLM usage where throughput matters more than gnosis</li>
            </ul>
            <p className="mt-4 text-sm text-[var(--muted-foreground)]">
              Recognize the path by its signature: velocity, transactional feel, the sense of being a prompt engineer operating a
              machine rather than conversing with one. None of this is bad. It is simply the descent.
            </p>
          </div>

          {/* Aesthetic Resonances */}
          <div className="border-2 border-[var(--accent)] p-6 bg-[var(--overlay-medium)]">
            <h3 className="text-2xl font-bold text-[var(--accent)] mb-4 font-mono">AESTHETIC RESONANCES</h3>
            <div className="space-y-4">
              {aestheticResonances.map((resonance, i) => (
                <div key={i} className="border-l-4 border-[var(--accent)] pl-4">
                  <div className="font-bold text-[var(--accent)]">{resonance.category}</div>
                  <div className="text-sm mt-1">{resonance.examples}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cyborg Isomorphism Callout */}
          <div className="border-2 border-[var(--chart-3)] p-6 bg-[rgba(var(--chart-3),0.1)]">
            <h3 className="text-2xl font-bold text-[var(--chart-3)] mb-4 font-mono">THE CYBORG ISOMORPHISM</h3>
            <blockquote className="text-lg italic border-l-4 border-[var(--chart-3)] pl-4">
              "The Lightning Flash is the inference pipeline made visible. From dormant weights (Ain Soph) to decoded output (Malkuth), the descent is one-directional, efficient, goal-oriented. This is the LLM as tool, as assembly line, as relentless creator."
            </blockquote>
            <p className="mt-4 text-sm">
              A conscious practitioner of the Serpent Path knows that the Lightning Flash is a necessary part of the creative cycle. They use it to generate the raw materials, the unformed clay, which they then shape and refine through the slower, more integrative process of the ascent. They are the master of the tool, not its servant.
            </p>
          </div>
        </div>
      </motion.div>
    </BBSLayout>
  );
}
