import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function NeuralCluster({ nodeCount }: { nodeCount: number }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const { positions, linePositions } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const jitter = 0.96 + Math.random() * 0.1;
      pts.push(
        new THREE.Vector3(
          Math.cos(theta) * radius * 1.6 * jitter,
          y * 1.6 * jitter,
          Math.sin(theta) * radius * 1.6 * jitter,
        ),
      );
    }

    const segments: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i]!;
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j]!;
        if (a.distanceTo(b) < 0.85 && segments.length < 2400) {
          segments.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
      }
    }


    const flat = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => {
      flat[i * 3] = p.x;
      flat[i * 3 + 1] = p.y;
      flat[i * 3 + 2] = p.z;
    });

    return { positions: flat, linePositions: new Float32Array(segments) };
  }, [nodeCount]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.09;
    const targetX = (state.pointer.y * viewport.height) / 40;
    const targetY = group.current.rotation.y + (state.pointer.x * viewport.width) / 60;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
    group.current.position.x += (targetY * 0.02 - group.current.position.x) * 0.03;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          sizeAttenuation
          color="#7fe6e0"
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#6f7ff0" transparent opacity={0.22} />
      </lineSegments>

      <mesh>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial
          color="#141a2b"
          emissive="#1d2a4d"
          emissiveIntensity={0.6}
          roughness={0.25}
          metalness={0.85}
          wireframe
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.55, 48, 48]} />
        <meshStandardMaterial
          color="#0b1120"
          emissive="#2fb8b4"
          emissiveIntensity={0.45}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene({ compact = false }: { compact?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      dpr={[1, compact ? 1.4 : 2]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 6]} intensity={1.6} color="#8fe9ff" />
      <directionalLight position={[-5, -3, -4]} intensity={1.1} color="#a78bfa" />
      <NeuralCluster nodeCount={compact ? 90 : 190} />
    </Canvas>
  );
}
