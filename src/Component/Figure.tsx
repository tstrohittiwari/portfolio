import { useGLTF, Float } from "@react-three/drei";

export default function Figure() {
  const model = useGLTF("/model/Figure13.glb");

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <primitive
        object={model.scene}
        scale={1.5}
        position={[0, -1, 0]}
      />
    </Float>
  );
}