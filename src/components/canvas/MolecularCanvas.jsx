import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Nodes() {
  const groupRef = useRef();
  const linesRef = useRef();

  const N = 60;
  const positions = useMemo(() => {
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  const velocities = useMemo(() => {
    const vel = [];
    for (let i = 0; i < N; i++) {
      vel.push([(Math.random() - 0.5) * 0.008, (Math.random() - 0.5) * 0.008, (Math.random() - 0.5) * 0.004]);
    }
    return vel;
  }, []);

  const nodeArr = useMemo(() => {
    const arr = [];
    for (let i = 0; i < N; i++) {
      arr.push({ x: positions[i * 3], y: positions[i * 3 + 1], z: positions[i * 3 + 2] });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06;
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.08;
    }
    for (let i = 0; i < N; i++) {
      nodeArr[i].x += velocities[i][0];
      nodeArr[i].y += velocities[i][1];
      nodeArr[i].z += velocities[i][2];
      if (Math.abs(nodeArr[i].x) > 2.8) velocities[i][0] *= -1;
      if (Math.abs(nodeArr[i].y) > 2.8) velocities[i][1] *= -1;
      if (Math.abs(nodeArr[i].z) > 2.8) velocities[i][2] *= -1;
      positions[i * 3] = nodeArr[i].x;
      positions[i * 3 + 1] = nodeArr[i].y;
      positions[i * 3 + 2] = nodeArr[i].z;
    }
    if (groupRef.current) {
      groupRef.current.children[0].geometry.attributes.position.needsUpdate = true;
    }
    // Update connection lines
    if (linesRef.current) {
      const linePos = [];
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodeArr[i].x - nodeArr[j].x;
          const dy = nodeArr[i].y - nodeArr[j].y;
          const dz = nodeArr[i].z - nodeArr[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 1.6) {
            linePos.push(nodeArr[i].x, nodeArr[i].y, nodeArr[i].z);
            linePos.push(nodeArr[j].x, nodeArr[j].y, nodeArr[j].z);
          }
        }
      }
      linesRef.current.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePos), 3));
    }
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3}>
        <PointMaterial color="#d97652" size={0.06} sizeAttenuation transparent opacity={0.9} />
      </Points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#c9a877" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

function StarsBackground() {
  const starsRef = useRef();
  const starPositions = useMemo(() => {
    const pos = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <Points ref={starsRef} positions={starPositions} stride={3}>
      <PointMaterial color="#9b9a6a" size={0.025} sizeAttenuation transparent opacity={0.5} />
    </Points>
  );
}

export default function MolecularCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ background: "transparent" }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <StarsBackground />
      <Nodes />
    </Canvas>
  );
}
