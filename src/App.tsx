import Scene from "./Component/Scene";

function App() {
  return (
    <div className="app-root">
      {/* ── Three.js canvas — contains the full scene + UI overlay ── */}
      <div className="canvas-layer">
        <Scene />
      </div>
    </div>
  );
}

export default App;
