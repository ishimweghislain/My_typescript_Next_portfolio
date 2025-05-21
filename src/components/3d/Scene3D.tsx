'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;

      // Add pulsating effect
      const pulseFactor = Math.sin(clock.getElapsedTime() * 0.8) * 0.05 + 1;
      sphereRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
    }
  });

  return (
    <Sphere args={[1, 100, 200]} ref={sphereRef}>
      <MeshDistortMaterial
        color="#0070f3"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

const FloatingText = ({ text, position, color }: { text: string; position: [number, number, number]; color: string }) => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (textRef.current) {
      // More complex floating animation
      const time = clock.getElapsedTime();
      textRef.current.position.y = position[1] + Math.sin(time) * 0.1;
      textRef.current.position.x = position[0] + Math.sin(time * 0.5) * 0.05;
      textRef.current.position.z = position[2] + Math.cos(time * 0.3) * 0.05;

      // Subtle rotation
      textRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;

      // Pulsating effect
      const scale = 1 + Math.sin(time * 0.5) * 0.05;
      textRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      color={color}
      fontSize={0.3}
      maxWidth={2}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      anchorX="center"
      anchorY="middle"
      // Add glow effect
      outlineWidth={0.01}
      outlineColor={color.replace(')', ', 0.3)')}
    >
      {text}
    </Text>
  );
};

// Particle component for background stars
const Particles = () => {
  const particlesCount = 500;
  const positions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < particlesCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 20, // x
        (Math.random() - 0.5) * 20, // y
        (Math.random() - 0.5) * 20  // z
      );
    }
    return new Float32Array(positions);
  }, [particlesCount]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" sizeAttenuation transparent opacity={0.8} />
    </points>
  );
};

const Scene3D = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="canvas-container"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#050816']} />
        <fog attach="fog" args={['#050816', 5, 20]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#4e00ff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#00d0ff" />
        <pointLight position={[0, 0, 2]} intensity={0.8} color="#ffffff" />

        {/* Stars background */}
        <Particles />

        <group position={[0, 0, 0]}>
          <AnimatedSphere />
          <FloatingText text="Fullstack Developer" position={[0, 2, 0]} color="#ffffff" />
          <FloatingText text="Software Engineer" position={[2, 0, 0]} color="#61dafb" />
          <FloatingText text="Graphic Designer" position={[-2, 0, 0]} color="#ff6b6b" />
          <FloatingText text="Content Creator" position={[0, -2, 0]} color="#ffd166" />
        </group>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </motion.div>
  );
};

export default Scene3D;
