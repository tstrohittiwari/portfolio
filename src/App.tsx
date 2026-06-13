import Scene from "./Component/Scene";

function App() {
  return (
    <div className="app-root">

      {/* ── Three.js canvas (contains the 3D name text + scene) ── */}
      <div className="canvas-layer">
        <Scene />
      </div>

      {/* ── HTML UI: socials + description in front of canvas ── */}
      <div className="ui-layer">

        {/* Social icons — bottom-left */}
        <div className="hero-socials">
          <a href="https://www.behance.net/tstrohittiwari" target="_blank" rel="noopener noreferrer"
            className="glass-card-btn" aria-label="Behance">
            <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
              <path d="M7.803 5.731c.589 0 1.119.051 1.605.155.483.103.895.273 1.243.508.343.235.611.547.804.938.188.387.285.859.285 1.41 0 .604-.135 1.111-.404 1.521-.271.41-.671.747-1.198 1.012.73.213 1.271.59 1.629 1.131.352.541.531 1.198.531 1.967 0 .604-.116 1.138-.35 1.598-.23.46-.55.841-.957 1.142-.407.3-.882.524-1.419.667-.537.144-1.105.215-1.707.215H1.5V5.731h6.303zm-.387 4.852c.48 0 .868-.114 1.16-.341.291-.227.436-.576.436-1.048 0-.27-.05-.493-.146-.669a1.077 1.077 0 00-.398-.41 1.791 1.791 0 00-.59-.209 3.553 3.553 0 00-.72-.065H3.964v2.742h3.452zm.17 5.055c.271 0 .527-.026.768-.08.24-.053.451-.14.634-.261.182-.122.328-.287.434-.497.107-.208.16-.474.16-.795 0-.636-.178-1.085-.536-1.35-.356-.265-.831-.396-1.427-.396H3.964v3.379h3.622zm9.943-9.487h5.157v1.375h-5.157V6.151zm6.032 8.96c-.209.459-.496.855-.857 1.189a3.692 3.692 0 01-1.293.751 4.982 4.982 0 01-1.62.258c-.626 0-1.196-.1-1.71-.299a3.733 3.733 0 01-1.322-.872 3.948 3.948 0 01-.854-1.399c-.202-.548-.303-1.162-.303-1.843 0-.65.103-1.251.309-1.8a4.06 4.06 0 01.881-1.399 3.96 3.96 0 011.361-.9 4.617 4.617 0 011.757-.322c.721 0 1.351.138 1.891.413.539.276.979.638 1.32 1.085.342.448.587.955.735 1.523.147.568.203 1.151.168 1.751h-6.022c.039.752.272 1.316.704 1.693.429.376.966.563 1.609.563.499 0 .916-.12 1.25-.36.336-.24.556-.584.661-1.031h1.734zm-1.697-2.91c-.035-.594-.231-1.069-.586-1.425-.355-.356-.84-.534-1.456-.534-.42 0-.772.073-1.057.219a2.27 2.27 0 00-.713.554 2.11 2.11 0 00-.394.741 2.69 2.69 0 00-.11.445h4.316z" />
            </svg>
          </a>

          <a href="https://www.linkedin.com/in/tstrohittiwari" target="_blank" rel="noopener noreferrer"
            className="glass-card-btn" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          <a href="https://x.com/y_not_rohit" target="_blank" rel="noopener noreferrer"
            className="glass-card-btn" aria-label="X (Twitter)">
            <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          <a href="mailto:tstrohittiwari@gmail.com"
            className="glass-card-btn email-btn" aria-label="Email">
            Email
          </a>
        </div>

        {/* Description text — right side */}
        <div className="hero-description">
          <p>
            B.Tech final-year student exploring the intersection of design and
            emotion. I create digital experiences that inspire trust and feel
            naturally intuitive.
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;
