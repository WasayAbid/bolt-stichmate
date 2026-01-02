import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Sparkles, 
  Html, 
  useTexture,
  ContactShadows,
  Billboard,
  Text
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface EnhancedTryOnSceneProps {
  userImage?: string | null;
  designImage?: string | null;
  onRotate?: () => void;
  isProcessing?: boolean;
  showResult?: boolean;
}

/**
 * User Avatar with Image Texture
 */
const UserAvatar: React.FC<{ image: string }> = ({ image }) => {
  const texture = useTexture(image);
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.from(groupRef.current.position, {
        x: -5,
        duration: 1.2,
        ease: "power3.out"
      });
      gsap.from(groupRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.8,
        ease: "back.out(2)"
      });
    }
  }, []);

  return (
    <group ref={groupRef} position={[-1.8, 0, 0]}>
      {/* Avatar frame glow */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[2.8, 3.8]} />
        <meshBasicMaterial 
          color="#e8a5c9" 
          transparent 
          opacity={0.3}
        />
      </mesh>
      
      {/* User image */}
      <mesh ref={meshRef}>
        <planeGeometry args={[2.5, 3.5]} />
        <meshBasicMaterial 
          map={texture} 
          transparent
          toneMapped={false}
        />
      </mesh>

      {/* Corner decorations */}
      {[[-1.15, 1.65], [1.15, 1.65], [-1.15, -1.65], [1.15, -1.65]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.1]}>
          <circleGeometry args={[0.08, 16]} />
          <meshStandardMaterial 
            color="#ffd700" 
            emissive="#ffd700"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

/**
 * Dress Design Panel with Enhanced Effects
 */
const DressDesignPanel: React.FC<{ isActive?: boolean }> = ({ isActive = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const dressRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.from(groupRef.current.position, {
        x: 5,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out"
      });
    }
  }, []);

  useFrame((state) => {
    if (dressRef.current) {
      dressRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
      dressRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} position={[1.8, 0, 0]}>
        {/* Background glow */}
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[2.4, 3.4]} />
          <meshBasicMaterial 
            color="#ffd700" 
            transparent 
            opacity={0.15}
          />
        </mesh>

        {/* Dress silhouette */}
        <group ref={dressRef}>
          {/* Bodice */}
          <mesh position={[0, 0.8, 0]}>
            <planeGeometry args={[0.8, 0.8]} />
            <meshPhysicalMaterial
              color="#d68fb8"
              transparent
              opacity={0.95}
              roughness={0.5}
              metalness={0.1}
              sheen={1}
              sheenColor={new THREE.Color("#ffb8d9")}
            />
          </mesh>
          
          {/* Skirt */}
          <mesh position={[0, -0.2, 0]}>
            <planeGeometry args={[1.8, 2]} />
            <meshPhysicalMaterial
              color="#e8a5c9"
              transparent
              opacity={0.9}
              roughness={0.6}
              metalness={0.05}
              sheen={0.8}
              sheenColor={new THREE.Color("#ffd4e8")}
            />
          </mesh>

          {/* Neckline embellishment */}
          <mesh position={[0, 1.15, 0.1]}>
            <ringGeometry args={[0.15, 0.2, 16]} />
            <meshStandardMaterial 
              color="#ffd700"
              emissive="#ffd700"
              emissiveIntensity={0.4}
              metalness={0.9}
            />
          </mesh>
        </group>

        {/* Sparkle effects */}
        <Sparkles 
          count={40} 
          scale={3} 
          size={2.5} 
          speed={0.6} 
          color="#ffd700" 
        />
      </group>
    </Float>
  );
};

/**
 * Animated Merge Arrow
 */
const MergeArrow: React.FC = () => {
  const arrowRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (arrowRef.current) {
      gsap.to(arrowRef.current.position, {
        x: 0.3,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, []);

  return (
    <group ref={arrowRef} position={[0, 0, 0.5]}>
      {/* Arrow body */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.15, 0.5, 8]} />
        <meshStandardMaterial 
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Glow ring */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.3, 0.03, 16, 32]} />
        <meshStandardMaterial 
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};

/**
 * Try-On Result View with Overlay
 */
const ResultView: React.FC<{ userImage: string }> = ({ userImage }) => {
  const texture = useTexture(userImage);
  const groupRef = useRef<THREE.Group>(null);
  const overlayRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.from(groupRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      });
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.1;
    }
    if (overlayRef.current) {
      const opacity = 0.35 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      (overlayRef.current.material as THREE.MeshStandardMaterial).opacity = opacity;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Success glow background */}
      <mesh position={[0, 0, -0.2]}>
        <planeGeometry args={[4, 5]} />
        <meshBasicMaterial 
          color="#e8a5c9" 
          transparent 
          opacity={0.2}
        />
      </mesh>

      {/* User image */}
      <mesh>
        <planeGeometry args={[3.2, 4.2]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Dress overlay effect */}
      <mesh ref={overlayRef} position={[0, -0.4, 0.15]}>
        <planeGeometry args={[2.8, 3]} />
        <meshStandardMaterial
          color="#e8a5c9"
          transparent
          opacity={0.35}
          roughness={0.7}
        />
      </mesh>

      {/* Golden frame */}
      {[
        { pos: [0, 2.15, 0.1], scale: [3.4, 0.05, 1] },
        { pos: [0, -2.15, 0.1], scale: [3.4, 0.05, 1] },
        { pos: [-1.65, 0, 0.1], scale: [0.05, 4.35, 1] },
        { pos: [1.65, 0, 0.1], scale: [0.05, 4.35, 1] },
      ].map((item, i) => (
        <mesh key={i} position={item.pos as [number, number, number]} scale={item.scale as [number, number, number]}>
          <boxGeometry />
          <meshStandardMaterial 
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Success sparkles */}
      <Sparkles count={120} scale={6} size={4} speed={1} color="#ffd700" opacity={0.9} />
    </group>
  );
};

/**
 * Processing Animation
 */
const ProcessingLoader: React.FC = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  const dotsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
    if (dotsRef.current) {
      dotsRef.current.rotation.z = -state.clock.elapsedTime * 1.5;
    }
  });

  return (
    <group position={[0, 0, 1]}>
      {/* Main ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.8, 0.08, 16, 64]} />
        <meshStandardMaterial 
          color="#e8a5c9"
          emissive="#e8a5c9"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Orbiting dots */}
      <group ref={dotsRef}>
        {[0, 1, 2, 3].map((i) => (
          <mesh 
            key={i} 
            position={[
              Math.cos((i / 4) * Math.PI * 2) * 0.8,
              Math.sin((i / 4) * Math.PI * 2) * 0.8,
              0
            ]}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial 
              color="#ffd700"
              emissive="#ffd700"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>

      <Billboard>
        <Text
          fontSize={0.2}
          color="#e8a5c9"
          anchorY="middle"
          position={[0, -1.3, 0]}
        >
          Processing Try-On...
        </Text>
      </Billboard>
    </group>
  );
};

/**
 * Camera Animation
 */
const CameraAnimator: React.FC<{ showResult: boolean }> = ({ showResult }) => {
  const { camera } = useThree();

  useEffect(() => {
    gsap.to(camera.position, {
      z: showResult ? 5 : 6,
      x: showResult ? 0 : 0,
      duration: 1.5,
      ease: "power2.out"
    });
  }, [showResult, camera]);

  return null;
};

/**
 * Main Enhanced Try-On Scene
 */
export const EnhancedTryOnScene: React.FC<EnhancedTryOnSceneProps> = ({ 
  userImage, 
  designImage, 
  isProcessing = false,
  showResult = false 
}) => {
  return (
    <div className="w-full h-full min-h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10 shadow-2xl">
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={
          <Html center>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">Initializing 3D...</span>
            </div>
          </Html>
        }>
          {/* Camera Animation */}
          <CameraAnimator showResult={showResult} />
          
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[5, 8, 5]} 
            intensity={1.2} 
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-5, 3, -5]} intensity={0.5} color="#f8b4d9" />
          <spotLight 
            position={[0, 8, 2]} 
            intensity={0.8} 
            angle={0.5} 
            penumbra={0.6}
            color="#fff5f8"
          />

          {/* Content */}
          {isProcessing ? (
            <ProcessingLoader />
          ) : showResult && userImage ? (
            <ResultView userImage={userImage} />
          ) : (
            <>
              {userImage && <UserAvatar image={userImage} />}
              <DressDesignPanel />
              {userImage && <MergeArrow />}
            </>
          )}

          {/* Contact shadows */}
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
          />

          {/* Environment */}
          <Environment preset="city" />
          
          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI / 1.6}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EnhancedTryOnScene;
