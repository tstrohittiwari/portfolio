import { useGLTF } from "@react-three/drei";

export default function Background() {
    const bg = useGLTF("/model/BG_customiser.glb");

    return (
        <primitive
            object={bg.scene}
            scale={1}
            position={[0, -6, 4]}
        />
    );
}