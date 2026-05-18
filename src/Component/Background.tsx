import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface BackgroundProps {
    // Expose configurable color variable for dynamic customization
    targetColor?: string;
    // Expose customizable glossiness
    roughness?: number;
    metalness?: number;
}

export default function Background({
    targetColor = "rgba(81, 81, 81, 1)", // Soft atmospheric luxury color (Noomo Labs style)
    roughness = 0.5,        // Soft glossy sheen
    metalness = 0.85         // Premium futuristic metallic interaction
}: BackgroundProps) {
    const bg = useGLTF("/model/BG_customiser.glb");

    // Store cloned materials for high-performance useFrame updates
    const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
    const colorTarget = useMemo(() => new THREE.Color(), []);

    useEffect(() => {
        if (!bg.scene) return;

        materialsRef.current = [];

        // Detect and process background mesh/material
        bg.scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;

                // Keep the existing curved grid background shape unchanged
                // Clone the material to preserve textures, grid lines, and bump maps
                if (mesh.material) {
                    const clonedMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;

                    // Maintain glossy soft lighting interaction
                    if (clonedMat.type === "MeshStandardMaterial" || clonedMat.type === "MeshPhysicalMaterial") {
                        clonedMat.roughness = roughness;
                        clonedMat.metalness = metalness;

                        // Enable envMap reflections for premium lighting interaction
                        clonedMat.envMapIntensity = .5;
                    }

                    mesh.material = clonedMat;
                    materialsRef.current.push(clonedMat);
                }
            }
        });
    }, [bg, roughness, metalness]);

    // Smooth runtime color changes
    useFrame((_state, delta) => {
        colorTarget.set(targetColor);

        materialsRef.current.forEach((mat) => {
            if (mat.color) {
                // Smooth color interpolation using lerp for elegant transitions
                mat.color.lerp(colorTarget, delta * 3.5);
            }
        });
    });

    return (
        <primitive
            object={bg.scene}
            scale={1}
            position={[0, -6, 5]} // Preserve current scene composition and positioning
        />
    );
}

useGLTF.preload("/model/BG_customiser.glb");