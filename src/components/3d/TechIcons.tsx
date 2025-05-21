'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, OrbitControls } from '@react-three/drei';

// Define the technology icons with their colors
const technologies = [
  { name: 'HTML', color: '#E34F26' },
  { name: 'CSS', color: '#1572B6' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#000000' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Python', color: '#3776AB' },
  { name: 'PHP', color: '#777BB4' },
  { name: 'Java', color: '#007396' },
  { name: 'C#', color: '#239120' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'MySQL', color: '#4479A1' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'GraphQL', color: '#E10098' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Git', color: '#F05032' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Firebase', color: '#FFCA28' },
  { name: 'Tailwind', color: '#38B2AC' },
  { name: 'Three.js', color: '#000000' },
  { name: 'Web3.js', color: '#F16822' },
];

// Component for a single floating technology icon
const TechIcon = ({ name, color, position, speed = 1 }: { name: string; color: string; position: [number, number, number]; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const [hovered, setHovered] = useState(false);

  // Animation for the icon
  useFrame((state) => {
    if (!ref.current) return;

    // Rotate the icon
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3 * speed) * 0.2;
    ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2 * speed) * 0.2;

    // Scale effect when hovered
    ref.current.scale.x = ref.current.scale.y = ref.current.scale.z = THREE.MathUtils.lerp(
      ref.current.scale.x,
      hovered ? 1.2 : 1,
      0.1
    );
  });

  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={0.5} // Up/down float intensity
    >
      <mesh
        ref={ref}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />

        {/* Text on each face of the cube */}
        <Text
          position={[0, 0, 0.51]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
        <Text
          position={[0, 0, -0.51]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI, 0]}
        >
          {name}
        </Text>
        <Text
          position={[0.51, 0, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI / 2, 0]}
        >
          {name}
        </Text>
        <Text
          position={[-0.51, 0, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[0, -Math.PI / 2, 0]}
        >
          {name}
        </Text>
        <Text
          position={[0, 0.51, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[-Math.PI / 2, 0, 0]}
        >
          {name}
        </Text>
        <Text
          position={[0, -0.51, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[Math.PI / 2, 0, 0]}
        >
          {name}
        </Text>
      </mesh>
    </Float>
  );
};

// Component for the cloud of technology icons
const TechCloud = () => {
  const [positions, setPositions] = useState<Array<[number, number, number]>>([]);

  // Generate random positions for the icons
  useEffect(() => {
    const newPositions: Array<[number, number, number]> = [];
    const radius = 8; // Radius of the sphere

    technologies.forEach((_, index) => {
      // Use spherical coordinates to position icons in a sphere
      const phi = Math.acos(-1 + (2 * index) / technologies.length);
      const theta = Math.sqrt(technologies.length * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      newPositions.push([x, y, z]);
    });

    setPositions(newPositions);
  }, []);

  return (
    <>
      {technologies.map((tech, index) => (
        positions[index] && (
          <TechIcon
            key={tech.name}
            name={tech.name}
            color={tech.color}
            position={positions[index]}
            speed={0.5 + Math.random() * 0.5} // Random speed for each icon
          />
        )
      ))}
    </>
  );
};



// Title component that floats in the center
const CenterTitle = () => {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    // Gentle floating animation
    ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      <Text
        position={[0, 0, 0]}
        fontSize={1.2}
        color="#ffffff"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#0070f3"
      >
        My Tech Stack
      </Text>
    </group>
  );
};

// Main component
const TechIcons = () => {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div
      className="w-full h-[500px] md:h-[600px]"
      onMouseEnter={() => setAutoRotate(false)}
      onMouseLeave={() => setAutoRotate(true)}
      onTouchStart={() => setAutoRotate(false)}
      onTouchEnd={() => setAutoRotate(true)}
    >
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <TechCloud />
        <CenterTitle />

        {/* Use OrbitControls for interactive rotation */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm pointer-events-none">
        <p>Drag to rotate | Mouse wheel to zoom</p>
      </div>
    </div>
  );
};

export default TechIcons;
