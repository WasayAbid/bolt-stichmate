import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Spinning Fabric Roll
const FabricRoll = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 2.5, 32]} />
        <MeshDistortMaterial
          color="#e879a9"
          roughness={0.3}
          metalness={0.1}
          distort={0.1}
          speed={2}
        />
      </mesh>
      {/* Fabric wrapping texture effect */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[1.2, 0.05, 16, 100]} />
        <meshStandardMaterial color="#f5a9c5" metalness={0.3} roughness={0.5} />
      </mesh>
    </Float>
  );
};

// Floating Dress Form
const DressForm = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={meshRef} position={[2.5, -0.5, -1]}>
        {/* Body */}
        <mesh>
          <capsuleGeometry args={[0.4, 1, 8, 16]} />
          <MeshDistortMaterial
            color="#d4af37"
            roughness={0.4}
            metalness={0.6}
            distort={0.05}
            speed={1}
          />
        </mesh>
        {/* Neck */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
          <meshStandardMaterial color="#c9a227" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 1, 16]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -1.7, 0]}>
          <cylinderGeometry args={[0.4, 0.5, 0.1, 32]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

// Floating Scissors
const FloatingScissors = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.15;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <group ref={meshRef} position={[-2.5, 0.5, -0.5]} rotation={[0, 0, -0.5]}>
        {/* Blade 1 */}
        <mesh position={[0.3, 0, 0]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.8, 0.08, 0.02]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Blade 2 */}
        <mesh position={[0.3, 0, 0]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.8, 0.08, 0.02]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Handles */}
        <mesh position={[-0.3, 0.15, 0]}>
          <torusGeometry args={[0.15, 0.04, 8, 24]} />
          <meshStandardMaterial color="#e879a9" metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh position={[-0.3, -0.15, 0]}>
          <torusGeometry args={[0.15, 0.04, 8, 24]} />
          <meshStandardMaterial color="#e879a9" metalness={0.3} roughness={0.5} />
        </mesh>
      </group>
    </Float>
  );
};

// Thread Spool
const ThreadSpool = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[-1.8, -1, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
        <meshStandardMaterial color="#7bc47f" metalness={0.2} roughness={0.6} />
      </mesh>
    </Float>
  );
};

// Needle
const Needle = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.3;
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1.5} floatIntensity={0.4}>
      <group ref={meshRef} position={[1.5, 1, 0.5]} rotation={[0, 0, Math.PI / 4]}>
        <mesh>
          <coneGeometry args={[0.02, 0.6, 8]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[0, -0.35, 0]}>
          <torusGeometry args={[0.03, 0.01, 8, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.05} />
        </mesh>
      </group>
    </Float>
  );
};

const HeroScene3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#e879a9" />
          <pointLight position={[5, 5, 5]} intensity={0.3} color="#d4af37" />
          
          <FabricRoll />
          <DressForm />
          <FloatingScissors />
          <ThreadSpool />
          <Needle />
          
          <Sparkles
            count={50}
            size={2}
            scale={10}
            speed={0.4}
            opacity={0.5}
            color="#d4af37"
          />
          
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene3D;
