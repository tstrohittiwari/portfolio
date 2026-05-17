import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import Figure from "./Figure";
import Background from "./Background";

// Cinematic Camera Controller
function CameraRig() {
    useFrame((state, delta) => {
        // Parallax camera offset based on mouse
        const targetX = state.mouse.x * 0.5;
        const targetY = state.mouse.y * 0.5;

        // Smoothly interpolate camera position
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 2.5);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 2.5);

        // Keep the humanoid centered at all times by locking the lookAt
        // The figure might have its own internal offset, but the composition revolves around the center
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 1.5, 6], fov: 45 }}
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

            {/* Cinematic Camera Constraints */}
            <CameraRig />

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