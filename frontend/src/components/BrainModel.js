// BrainModel.js
import React, { useRef, Suspense } from "react";
import { extend } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

extend(THREE);

const BrainModel = () => {
  const brainRef = useRef();
  const { scene } = useGLTF("/models/brain.glb");
  
  // Load textures
  const textures = useTexture({
    map: '/textures/gltf_embedded_0.jpg',
    aoMap: '/textures/gltf_embedded_1.jpg',
    normalMap: '/textures/gltf_embedded_3.jpg',
    roughnessMap: '/textures/gltf_embedded_4.jpg'
  });

  const brainMaterial = new THREE.MeshStandardMaterial({
    ...textures,
    color: new THREE.Color("#ffcccb"),
    roughness: 0.2,
    metalness: 0.1,
    normalScale: new THREE.Vector2(0.5, 0.5),
    envMapIntensity: 2, 
  });

  React.useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material = brainMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
          // Enable texture UV mapping
          child.geometry.attributes.uv2 = child.geometry.attributes.uv;
        }
      });
    }
  }, [scene, brainMaterial]);

  return (
    <Suspense fallback={null}>
      <primitive 
        ref={brainRef}
        object={scene} 
        scale={[1, 1, 1]}
        position={[0, 0, 0]}
        rotation={[0, Math.PI * 0.5, 0]} // Rotate to match your reference image
      />
    </Suspense>
  );
};

// Pre-load assets
useGLTF.preload("/models/brain.glb");

export default BrainModel;
