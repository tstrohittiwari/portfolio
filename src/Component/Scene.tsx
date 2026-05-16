import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Figure from "./figure";
import Background from "./Background";

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 7], fov: 45 }}
            style={{
                width: "100vw",
                height: "100vh",
                // A beautiful CSS gradient to match the original image
                background: "linear-gradient(135deg, #d3b3e6 0%, #a3c4f2 50%, #f0c3e1 100%)"
            }}
        >
            <Environment preset="city" environmentIntensity={0.8} />

            {/* Ambient Lighting */}
            <ambientLight intensity={1.2} color="#ffffff" />

            {/* Main Key Light */}
            <directionalLight position={[2, 5, 4]} intensity={1.5} color="#ffffff" />

            {/* Blue fill light to enhance the figure's blue tint */}
            <spotLight
                position={[-4, 2, 4]}
                intensity={5}
                color="#4f46e5"
                angle={0.8}
                penumbra={1}
                distance={20}
            />

            {/* Deep Blue Rim Light from Back */}
            <spotLight
                position={[5, 2, -4]}
                intensity={8}
                color="#1e1b4b"
                angle={0.6}
                penumbra={1}
                distance={20}
            />

            {/* Models */}
            <Background />
            <Figure />

            {/* Controls */}
            <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.4} // Slower, smoother rotation
            />

            {/* Postprocessing for soft glossy/holographic glow */}
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.8}
                    mipmapBlur
                    intensity={0.6}
                />
            </EffectComposer>
        </Canvas>
    );
}