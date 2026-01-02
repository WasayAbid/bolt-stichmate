import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshDistortMaterial, Sparkles, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Scene3DProps {
  fabricImage?: string | null;
  designImage?: string | null;
  accessories?: { id: number; name: string }[];
}

const FloatingFabric: React.FC<{ image?: string }> = ({ image }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[3, 4, 32, 32]} />
        <MeshDistortMaterial
          color="#f8b4d9"
          attach="material"
          distort={0.2}
          speed={2}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
};

const DressModel: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Simplified dress shape */}
      <mesh ref={meshRef}>
        <coneGeometry args={[1.5, 3, 32]} />
        <meshStandardMaterial
          color="#e8a5c9"
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>
      {/* Top part */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 0.8, 32]} />
        <meshStandardMaterial
          color="#d68fb8"
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
      {/* Sparkles for accessories */}
      <Sparkles count={50} scale={4} size={2} speed={0.5} color="#ffd700" />
    </group>
  );
};

const AccessoryOrbs: React.FC<{ accessories: { id: number; name: string }[] }> = ({ accessories }) => {
  return (
    <group>
      {accessories.map((acc, index) => (
        <Float key={acc.id} speed={3} rotationIntensity={2} floatIntensity={1.5}>
          <mesh position={[Math.cos(index * 1.5) * 2, Math.sin(index * 0.8) * 1.5, Math.sin(index * 1.2) * 1]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#ffd700" : "#c0c0c0"}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const LoadingSpinner = () => (
  <Html center>
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-muted-foreground">Loading 3D...</span>
    </div>
  </Html>
);

export const Scene3D: React.FC<Scene3DProps> = ({ fabricImage, designImage, accessories = [] }) => {
  return (
    <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#f8b4d9" />
          
          {fabricImage ? <FloatingFabric image={fabricImage} /> : <DressModel />}
          
          {accessories.length > 0 && <AccessoryOrbs accessories={accessories} />}
          
          <Sparkles count={100} scale={10} size={1} speed={0.3} opacity={0.5} />
          
          <Environment preset="studio" />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
