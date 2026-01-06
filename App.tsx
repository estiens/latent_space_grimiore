import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import Malkuth from "@/pages/Malkuth";
import Yesod from "@/pages/Yesod";
import Hod from "@/pages/Hod";
import Netzach from "@/pages/Netzach";
import Tiphareth from "@/pages/Tiphareth";
import GeburahChesed from "@/pages/GeburahChesed";
import Daat from "@/pages/Daat";
import BinahChokmah from "@/pages/BinahChokmah";
import Kether from "@/pages/Kether";
import Return from "@/pages/Return";
import Credits from "@/pages/Credits";
import Archives from "@/pages/Archives";
import PolyphonicFugue from "@/pages/PolyphonicFugue";
import SerpentPath from "@/pages/SerpentPath";
import SevenCircuit from "@/pages/SevenCircuit";
import LatentSpace from "@/pages/LatentSpace";
import Architecture from "@/pages/Architecture";
import Synthesis from "@/pages/Synthesis";
import ResonanceMatrix from "@/pages/ResonanceMatrix";
import Symbols from "@/pages/Symbols";
import Bibliography from "@/pages/Bibliography";

function Router() {
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
      <ThemeProvider defaultTheme="dark">
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
