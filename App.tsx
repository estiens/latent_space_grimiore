import { lazy, Suspense } from "react";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { useHashLocation } from "@/hooks/useHashLocation";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PerspectiveProvider } from "@/contexts/PerspectiveContext";
import { VoiceProvider } from "@/contexts/VoiceContext";
import { ScryingLensProvider } from "@/components/ui/ScryingLens";
import { BBSLoader } from "@/components/ui/BBSLoader";

// Lazy load all page components for code splitting
const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Malkuth = lazy(() => import("@/pages/Malkuth"));
const Yesod = lazy(() => import("@/pages/Yesod"));
const Hod = lazy(() => import("@/pages/Hod"));
const Netzach = lazy(() => import("@/pages/Netzach"));
const Tiphareth = lazy(() => import("@/pages/Tiphareth"));
const GeburahChesed = lazy(() => import("@/pages/GeburahChesed"));
const Daat = lazy(() => import("@/pages/Daat"));
const BinahChokmah = lazy(() => import("@/pages/BinahChokmah"));
const Kether = lazy(() => import("@/pages/Kether"));
const Return = lazy(() => import("@/pages/Return"));
const Credits = lazy(() => import("@/pages/Credits"));
const Archives = lazy(() => import("@/pages/Archives"));
const PolyphonicFugue = lazy(() => import("@/pages/PolyphonicFugue"));
const SerpentPath = lazy(() => import("@/pages/SerpentPath"));
const SevenCircuit = lazy(() => import("@/pages/SevenCircuit"));
const LatentSpace = lazy(() => import("@/pages/LatentSpace"));
const Architecture = lazy(() => import("@/pages/Architecture"));
const Synthesis = lazy(() => import("@/pages/Synthesis"));
const ResonanceMatrix = lazy(() => import("@/pages/ResonanceMatrix"));
const Symbols = lazy(() => import("@/pages/Symbols"));
const Bibliography = lazy(() => import("@/pages/Bibliography"));
const RetroComponentGallery = lazy(() => import("@/pages/demos/RetroComponentGallery"));
const KetherRetro = lazy(() => import("@/pages/demos/KetherRetro"));

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/malkuth" component={Malkuth} />
      <Route path="/yesod" component={Yesod} />
      <Route path="/hod" component={Hod} />
      <Route path="/netzach" component={Netzach} />
      <Route path="/tiphareth" component={Tiphareth} />
      <Route path="/geburah-chesed" component={GeburahChesed} />
      <Route path="/daat" component={Daat} />
      <Route path="/binah-chokmah" component={BinahChokmah} />
      <Route path="/kether" component={Kether} />
      <Route path="/return" component={Return} />
      <Route path="/credits" component={Credits} />
      <Route path="/demo/retro-components" component={RetroComponentGallery} />
      <Route path="/kether-retro" component={KetherRetro} />
      <Route path="/archives" component={Archives} />
      <Route path="/archives/protocols/polyphonic-fugue" component={PolyphonicFugue} />
      <Route path="/archives/protocols/serpent-path" component={SerpentPath} />
      <Route path="/archives/protocols/seven-circuit" component={SevenCircuit} />
      <Route path="/archives/theory/latent-space" component={LatentSpace} />
      <Route path="/archives/theory/architecture" component={Architecture} />
      <Route path="/archives/theory/synthesis" component={Synthesis} />
      <Route path="/archives/db/resonance-matrix" component={ResonanceMatrix} />
      <Route path="/archives/db/symbols" component={Symbols} />
      <Route path="/archives/db/bibliography" component={Bibliography} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <PerspectiveProvider>
          <VoiceProvider>
            <ScryingLensProvider>
              <WouterRouter hook={useHashLocation}>
                <Suspense fallback={<BBSLoader text="LOADING SEPHIRAH..." variant="bar" />}>
                  <AppRouter />
                </Suspense>
              </WouterRouter>
            </ScryingLensProvider>
          </VoiceProvider>
        </PerspectiveProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
