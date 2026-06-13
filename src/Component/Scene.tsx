import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";
import * as THREE from "three";
import Figure from "./Figure";
import Background from "./Background";

function CameraRig() {
    useFrame((state, delta) => {
        const targetX = state.mouse.x * 0.4;
        const targetY = state.mouse.y * 0.4;
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 2.5);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 2.5);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

// Name as a real 3D mesh — sits between Background (z=5) and Figure (z=-6)
// position z=-1 puts it in front of the background but behind the figure
function HeroName() {
    return (
        <Text
            position={[0, 3, -7]}
            fontSize={3.6}
            font="/fonts/ProximaNovaCond-Bold.ttf"
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
        >
            ROHIT TIWARI
        </Text>
    );
}

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 1.5, 6], fov: 45 }}
            gl={{ alpha: true, antialias: true }}
            style={{ width: "100%", height: "100%", display: "block" }}
        >
            <Environment preset="city" environmentIntensity={0.8} />

            <ambientLight intensity={1.2} color="#ffffff" />
            <directionalLight position={[2, 5, 4]} intensity={1.5} color="#ffffff" />
            <spotLight position={[-4, 2, 4]} intensity={5} color="#ffffff" angle={0.8} penumbra={1} distance={20} />
            <spotLight position={[5, 2, -4]} intensity={8} color="#ffebeb" angle={0.6} penumbra={1} distance={20} />

            {/* Background grid at z=5 (close to camera — floor plane) */}
            <Background />

            {/* Name text mesh at z=-1 (between grid and figure) */}
            <HeroName />

            {/* Figure at z=-6 (furthest from camera in the scene) */}
            <Figure />

            <CameraRig />
        </Canvas>
    );
}