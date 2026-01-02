import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sparkles, Html, useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

interface TryOnSceneProps {
  userImage?: string | null;
  designImage?: string | null;
  onRotate?: () => void;
}

const AvatarPlane: React.FC<{ image: string }> = ({ image }) => {
  const texture = useTexture(image);
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={[-1.5, 0, 0]}>
      <planeGeometry args={[2.5, 3.5]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

const DressOverlay: React.FC<{ image?: string }> = ({ image }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[1.5, 0, 0]}>
        {/* Dress silhouette */}
        <mesh ref={meshRef}>
          <planeGeometry args={[2, 3]} />
          <meshStandardMaterial
            color="#e8a5c9"
            transparent
            opacity={0.9}
            roughness={0.6}
          />
        </mesh>
        {/* Decorative elements */}
        <Sparkles count={30} scale={2.5} size={2} speed={0.5} color="#ffd700" />
      </group>
    </Float>
  );
};

const MergeIndicator: React.FC = () => {
  const arrowRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (arrowRef.current) {
      arrowRef.current.position.x = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group ref={arrowRef} position={[0, 0, 0.5]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.15, 0.4, 8]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

const ResultView: React.FC<{ userImage: string }> = ({ userImage }) => {
  const texture = useTexture(userImage);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* User image with dress overlay effect */}
      <mesh>
        <planeGeometry args={[3, 4]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      {/* Dress overlay glow */}
      <mesh position={[0, -0.5, 0.1]}>
        <planeGeometry args={[2.5, 2.8]} />
        <meshStandardMaterial
          color="#e8a5c9"
          transparent
          opacity={0.4}
          roughness={0.8}
        />
      </mesh>
      {/* Success sparkles */}
      <Sparkles count={80} scale={5} size={3} speed={0.8} color="#ffd700" />
    </group>
  );
};

const LoadingSpinner = () => (
  <Html center>
    <div className="flex flex-col items-center gap-2">
      <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-muted-foreground">Processing Try-On...</span>
    </div>
  </Html>
);

export const TryOnScene: React.FC<TryOnSceneProps & { isProcessing?: boolean; showResult?: boolean }> = ({ 
  userImage, 
  designImage, 
  isProcessing = false,
  showResult = false 
}) => {
  return (
    <div className="w-full h-full min-h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, 3, -5]} intensity={0.5} color="#f8b4d9" />
          <spotLight position={[0, 5, 0]} intensity={0.8} angle={0.5} penumbra={0.5} />

          {isProcessing && <LoadingSpinner />}
          
          {showResult && userImage ? (
            <ResultView userImage={userImage} />
          ) : (
            <>
              {userImage && <AvatarPlane image={userImage} />}
              <DressOverlay />
              {userImage && <MergeIndicator />}
            </>
          )}

          <Environment preset="city" />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TryOnScene;
