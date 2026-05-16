import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function Figure() {
  const model = useGLTF("/model/Figure13.glb");

  useEffect(() => {
    model.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Apply glossy deep blue glass material
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#1e1e9c"), // Deep Blue base
          metalness: 0.6,
          roughness: 0.1,
          transmission: 0.6, // Glass-like translucency
          thickness: 1,
          envMapIntensity: 2, // Strong reflections
          clearcoat: 1, // Glossy outer layer
          clearcoatRoughness: 0.1,
        });
      }
    });
  }, [model]);

  return (
    <primitive
      object={model.scene}
      scale={1.5}
      position={[0, -1.5, 0]}
    />
  );
}