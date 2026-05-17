import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Figure() {
  const model = useGLTF("/model/Figure13.glb");
  // Automatically extract all embedded animations and create a mixer
  const { actions, names } = useAnimations(model.animations, model.scene);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // 1. Play the embedded animation if available
    if (names && names.length > 0) {
      const actionName = names[0];
      const action = actions[actionName];
      if (action) {
        // Slow down the animation for a more elegant, futuristic cinematic feel
        action.setEffectiveTimeScale(0.7);
        // Smooth transition out of T-Pose
        action.reset().fadeIn(1.5).play();
        action.setLoop(THREE.LoopRepeat, Infinity);
      }
    }

    // 2. Apply existing premium materials without breaking rig
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
  }, [model, actions, names]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    // 1. Subtle idle floating motion (Hovering effect)
    // The base position is 6 on the Y axis
    const baseY = -2;
    const targetY = baseY + Math.sin(t * 1.5) * 0.08;

    // Use delta-time based interpolation (lerp) for ultra-smooth easing
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      delta * 2.5
    );

    // 2. Subtle secondary body sway (Inertia & follow-through)
    // Simulates an organic, non-robotic suspension in space
    const swayRotX = Math.sin(t * 0.8) * 0.03;
    const swayRotY = Math.sin(t * 0.5) * 0.04;
    const swayRotZ = Math.sin(t * 1.2) * 0.015;

    // 3. Cinematic Mouse-Follow Constraints
    // Clamp mouse interaction so the user cannot rotate the model out of composition
    const mouseRotX = -(state.mouse.y * 0.08); // Slight tilt up/down
    const mouseRotY = (state.mouse.x * 0.12); // Slight turn left/right

    // Combine organic sway + mouse interaction
    const finalRotX = swayRotX + mouseRotX;
    const finalRotY = swayRotY + mouseRotY;
    const finalRotZ = swayRotZ;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, finalRotX, delta * 3.0);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, finalRotY, delta * 3.0);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, finalRotZ, delta * 3.0);
  });

  return (
    <group ref={groupRef} position={[0, -2, -6]}>
      <primitive
        object={model.scene}
        scale={5}
      // Base positioning moved to the wrapping group for easier overall manipulation
      />
    </group>
  );
}