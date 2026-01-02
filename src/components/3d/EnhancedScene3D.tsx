import React, { Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Float, 
  MeshDistortMaterial, 
  Sparkles, 
  Html, 
  ContactShadows,
  MeshReflectorMaterial,
  Stars,
  useProgress,
  PresentationControls
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface EnhancedScene3DProps {
  fabricImage?: string | null;
  designImage?: string | null;
  accessories?: { id: number; name: string }[];
  variant?: 'default' | 'studio' | 'showcase';
}

/**
 * Realistic Fabric Plane with Wave Animation
 */
const RealisticFabric: React.FC<{ color?: string }> = ({ color = "#e8a5c9" }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Fabric wave animation using GSAP-style approach
  useFrame((state) => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const positions = geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = 
          Math.sin(x * 2 + state.clock.elapsedTime * 1.5) * 0.1 +
          Math.sin(y * 3 + state.clock.elapsedTime * 1.2) * 0.08;
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0.5, 0]} rotation={[-0.2, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[3, 4, 48, 48]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.6}
          metalness={0.05}
          thickness={0.5}
          transmission={0.1}
          clearcoat={0.3}
          sheen={1}
          sheenColor={new THREE.Color("#ffd4e8")}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
};

/**
 * Enhanced Dress Model with Physics-like Movement
 */
const EnhancedDressModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const skirtRef = useRef<THREE.Mesh>(null);
  const bodiceRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (groupRef.current) {
      // GSAP entrance animation
      gsap.from(groupRef.current.position, {
        y: -3,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      });
      gsap.from(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: "power3.out"
      });
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
    if (skirtRef.current) {
      // Simulate fabric sway
      skirtRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Skirt - flowing cone shape */}
      <mesh ref={skirtRef} position={[0, -0.5, 0]} castShadow>
        <coneGeometry args={[1.8, 3.5, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#e8a5c9"
          roughness={0.5}
          metalness={0.05}
          sheen={0.8}
          sheenColor={new THREE.Color("#ffd4e8")}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Bodice - fitted top */}
      <mesh ref={bodiceRef} position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.75, 1.2, 32]} />
        <meshPhysicalMaterial
          color="#d68fb8"
          roughness={0.4}
          metalness={0.1}
          sheen={1}
          sheenColor={new THREE.Color("#ffb8d9")}
        />
      </mesh>

      {/* Neckline detail */}
      <mesh position={[0, 2.2, 0.2]} castShadow>
        <torusGeometry args={[0.3, 0.05, 16, 32]} />
        <meshStandardMaterial
          color="#ffd700"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Waist embellishment */}
      <mesh position={[0, 1.0, 0.65]} castShadow>
        <torusGeometry args={[0.08, 0.03, 16, 32]} />
        <meshStandardMaterial
          color="#ffd700"
          roughness={0.1}
          metalness={0.95}
          emissive="#ffd700"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Sparkle particles */}
      <Sparkles 
        count={100} 
        scale={4} 
        size={3} 
        speed={0.8} 
        color="#ffd700"
        opacity={0.8}
      />
    </group>
  );
};

/**
 * Animated Accessory Orbs with Trail Effect
 */
const AnimatedAccessories: React.FC<{ accessories: { id: number; name: string }[] }> = ({ accessories }) => {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current && accessories.length > 0) {
      gsap.from(groupRef.current.children, {
        scale: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(2)"
      });
    }
  }, [accessories.length]);

  return (
    <group ref={groupRef}>
      {accessories.map((acc, index) => {
        const angle = (index / accessories.length) * Math.PI * 2;
        const radius = 2.2;
        return (
          <Float key={acc.id} speed={4} rotationIntensity={2} floatIntensity={1.5}>
            <mesh 
              position={[
                Math.cos(angle) * radius, 
                Math.sin(angle * 0.5) * 1.2 + 0.5, 
                Math.sin(angle) * radius
              ]}
              castShadow
            >
              <dodecahedronGeometry args={[0.18, 0]} />
              <meshPhysicalMaterial
                color={index % 3 === 0 ? "#ffd700" : index % 3 === 1 ? "#c0c0c0" : "#e8a5c9"}
                roughness={0.15}
                metalness={0.9}
                clearcoat={1}
                clearcoatRoughness={0.1}
                emissive={index % 3 === 0 ? "#ffd700" : "#c0c0c0"}
                emissiveIntensity={0.2}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
};

/**
 * Ground Reflector for Studio Look
 */
const StudioGround: React.FC = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
    <circleGeometry args={[8, 64]} />
    <MeshReflectorMaterial
      blur={[300, 100]}
      resolution={1024}
      mixBlur={1}
      mixStrength={40}
      roughness={1}
      depthScale={1.2}
      minDepthThreshold={0.4}
      maxDepthThreshold={1.4}
      color="#1a1a2e"
      metalness={0.5}
      mirror={0.5}
    />
  </mesh>
);

/**
 * Loading Progress Indicator
 */
const Loader: React.FC = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={175.93}
              strokeDashoffset={175.93 * (1 - progress / 100)}
              className="text-primary transition-all duration-300"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
            {Math.round(progress)}%
          </span>
        </div>
        <span className="text-sm text-muted-foreground">Loading 3D Scene...</span>
      </div>
    </Html>
  );
};

/**
 * Camera Animation Controller
 */
const CameraController: React.FC = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    gsap.from(camera.position, {
      z: 12,
      y: 5,
      duration: 2.5,
      ease: "power3.out"
    });
  }, [camera]);

  return null;
};

/**
 * Main Enhanced 3D Scene
 */
export const EnhancedScene3D: React.FC<EnhancedScene3DProps> = ({ 
  fabricImage, 
  designImage, 
  accessories = [],
  variant = 'default'
}) => {
  return (
    <div className="w-full h-full min-h-[450px] rounded-2xl overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10 shadow-2xl">
      <Canvas
        shadows
        camera={{ position: [0, 1, 6], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<Loader />}>
          {/* Camera Animation */}
          <CameraController />
          
          {/* Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 8, 5]} 
            intensity={1.5} 
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={20}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#f8b4d9" />
          <spotLight 
            position={[0, 10, 0]} 
            intensity={1} 
            angle={0.4}
            penumbra={0.8}
            castShadow
            color="#fff5f8"
          />
          
          {/* Main Content */}
          {fabricImage ? (
            <RealisticFabric />
          ) : (
            <EnhancedDressModel />
          )}
          
          {/* Accessories */}
          {accessories.length > 0 && (
            <AnimatedAccessories accessories={accessories} />
          )}
          
          {/* Ground and Shadows */}
          {variant === 'studio' && <StudioGround />}
          <ContactShadows
            position={[0, -2.4, 0]}
            opacity={0.6}
            scale={12}
            blur={2}
            far={4}
          />
          
          {/* Ambient Particles */}
          <Sparkles 
            count={80} 
            scale={12} 
            size={1.5} 
            speed={0.4} 
            opacity={0.4}
            color="#ffd700"
          />
          
          {/* Background Stars for Showcase */}
          {variant === 'showcase' && (
            <Stars radius={50} depth={50} count={1000} factor={3} fade speed={1} />
          )}
          
          {/* Environment */}
          <Environment preset="studio" />
          
          {/* Controls */}
          <PresentationControls
            global
            snap
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            {null}
          </PresentationControls>
          
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={12}
            autoRotate
            autoRotateSpeed={0.6}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EnhancedScene3D;
