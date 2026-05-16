import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Figure from "./figure";
import Background from "./Background";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      {/* Fog */}
      <fog attach="fog" args={["#070710", 5, 15]} />

      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#6f5cff" />

      {/* Models */}
      <Background />
      <Figure />

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}