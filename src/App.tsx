import { Suspense } from "react";
import Scene from "./Component/Scene";
import Loader from "./Component/Loader";

function App() {
  return (
    <div className="app-root">
      {/* Loader — reads R3F asset progress, slides up when done */}
      <Loader />

      {/* Three.js canvas — Scene handles its own internal Suspense for assets */}
      <div className="canvas-layer">
        <Scene />
      </div>
    </div>
  );
}

export default App;
