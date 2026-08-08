import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Html } from '@react-three/drei';

/**
 * Integrated Sci-Fi Motherboard 3D Model with Clickable Interactive Components.
 */
export function IntegratedMotherboard({ selectedComponent, onSelectComponent }) {
  const boardRef = useRef();
  const [hovered, setHovered] = useState(null);

  useFrame((state) => {
    if (boardRef.current && !selectedComponent) {
      // Gentle floating rotation when no component is selected
      boardRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.15;
    }
  });

  const getHighlightColor = (id, defaultColor = "#334155") => {
    if (selectedComponent === id) return "#f59e0b";
    if (hovered === id) return "#38bdf8";
    return defaultColor;
  };

  return (
    <group ref={boardRef} position={[0, -0.2, 0]} rotation={[0.4, 0, 0]}>
      {/* 1. Dark Sci-Fi Cyan PCB Base Board (y = -0.11 to +0.11) */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <boxGeometry args={[6.8, 0.22, 6.8]} />
        <meshStandardMaterial color="#0c4a6e" roughness={0.15} metalness={0.85} />
      </mesh>

      {/* 2. Sci-Fi Metallic Frame Armor (Elevated: y = 0.115 to 0.145) */}
      <mesh position={[0, 0.13, 0]}>
        <boxGeometry args={[6.5, 0.03, 6.5]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* 3. Glowing Neon Cyan Traces Wireframe Grid (Elevated with polygonOffset to prevent Z-fighting) */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[6.38, 0.005, 6.38]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          polygonOffset
          polygonOffsetFactor={-2}
          polygonOffsetUnits={-2}
        />
      </mesh>

      {/* ---------------------------------------------------- */}
      {/* PCB MOUNTING HOLES & SOLDER PADS (Low-Poly Detail) */}
      {/* ---------------------------------------------------- */}
      {[
        [-3.0, -3.0], [3.0, -3.0], [-3.0, 3.0], [3.0, 3.0],
        [-3.0, 0], [3.0, 0]
      ].map(([x, z], i) => (
        <group key={`standoff-${i}`} position={[x, 0.16, z]}>
          <mesh>
            <cylinderGeometry args={[0.18, 0.18, 0.02, 8]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.015, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 8]} />
            <meshStandardMaterial color="#0f172a" metalness={0.5} />
          </mesh>
        </group>
      ))}

      {/* ---------------------------------------------------- */}
      {/* REAR I/O SHIELD & PORTS STACK (Left Edge) */}
      {/* ---------------------------------------------------- */}
      <group position={[-3.05, 0.48, -0.6]}>
        {/* I/O Armor Block */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.55, 0.6, 3.5]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} flatShading />
        </mesh>
        {/* USB 3.0 Dual Ports (Protruding outward cleanly) */}
        <mesh position={[-0.3, 0.08, -1.0]}>
          <boxGeometry args={[0.15, 0.22, 0.46]} />
          <meshStandardMaterial color="#0284c7" metalness={0.5} />
        </mesh>
        <mesh position={[-0.3, 0.08, -0.3]}>
          <boxGeometry args={[0.15, 0.22, 0.46]} />
          <meshStandardMaterial color="#0284c7" metalness={0.5} />
        </mesh>
        {/* DisplayPort / HDMI Metal Ports */}
        <mesh position={[-0.3, 0.1, 0.4]}>
          <boxGeometry args={[0.15, 0.26, 0.38]} />
          <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Ethernet RJ45 Connector */}
        <mesh position={[-0.3, 0.12, 1.0]}>
          <boxGeometry args={[0.16, 0.3, 0.42]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Audio Jacks Array (3 Colored Low-Poly Cylinders) */}
        {['#84cc16', '#06b6d4', '#ec4899'].map((col, idx) => (
          <mesh key={idx} position={[-0.3, -0.12, 0.7 + idx * 0.3]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.075, 0.075, 0.15, 8]} />
            <meshStandardMaterial color={col} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* ---------------------------------------------------- */}
      {/* VRM POWER HEATSINKS & CAPACITORS (Around CPU Socket) */}
      {/* ---------------------------------------------------- */}
      {/* VRM Heatsink - Top */}
      <mesh position={[0, 0.4, -2.65]}>
        <boxGeometry args={[2.7, 0.45, 0.55]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.15} flatShading />
      </mesh>
      {/* VRM Heatsink - Left */}
      <mesh position={[-1.65, 0.4, -1.2]}>
        <boxGeometry args={[0.55, 0.45, 2.1]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.15} flatShading />
      </mesh>
      {/* Solid Capacitors Array (Elevated above PCB) */}
      {[-0.9, -0.6, -0.3, 0, 0.3, 0.6, 0.9].map((pos, idx) => (
        <group key={`cap-${idx}`} position={[pos, 0.3, -2.15]}>
          <mesh>
            <cylinderGeometry args={[0.085, 0.085, 0.22, 6]} />
            <meshStandardMaterial color="#0284c7" metalness={0.6} roughness={0.2} />
          </mesh>
          {/* Silver Metal Cap */}
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.087, 0.087, 0.02, 6]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.05} />
          </mesh>
        </group>
      ))}

      {/* R47 Power Chokes (Cubic Inductors) */}
      {[-1.0, -0.5, 0, 0.5, 1.0].map((pos, idx) => (
        <mesh key={`choke-${idx}`} position={[pos, 0.28, -1.95]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.3} flatShading />
        </mesh>
      ))}

      {/* 8-Pin CPU Power EPS Socket (Top Left) */}
      <mesh position={[-2.3, 0.32, -2.65]}>
        <boxGeometry args={[0.55, 0.28, 0.32]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} />
      </mesh>

      {/* ---------------------------------------------------- */}
      {/* CHIPSET (PCH) SOUTHBRIDGE HEATSINK (Bottom Right) */}
      {/* ---------------------------------------------------- */}
      <group position={[1.8, 0.3, 1.8]}>
        <mesh>
          <boxGeometry args={[1.75, 0.2, 1.75]} />
          <meshStandardMaterial color="#1e293b" metalness={0.92} roughness={0.1} flatShading />
        </mesh>
        {/* Sci-Fi Diagonal Metallic Plate */}
        <mesh position={[0, 0.12, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[1.35, 0.035, 1.35]} />
          <meshStandardMaterial color="#0284c7" metalness={0.85} roughness={0.2} flatShading />
        </mesh>
        {/* Emissive Strip */}
        <mesh position={[0, 0.15, 0.48]}>
          <boxGeometry args={[1.3, 0.015, 0.08]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* ---------------------------------------------------- */}
      {/* 24-PIN ATX POWER HEADER & CONNECTOR (Right Edge) */}
      {/* ---------------------------------------------------- */}
      <group position={[2.9, 0.32, 0]}>
        <mesh>
          <boxGeometry args={[0.42, 0.34, 1.75]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        {/* Pin Notch Detailing */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.26, 0.015, 1.55]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
      </group>

      {/* SATA 6Gb/s PORTS ARRAY (Bottom Right Edge) */}
      <group position={[2.85, 0.28, 2.5]}>
        {[0, 0.35, 0.7].map((offset, i) => (
          <mesh key={i} position={[0, 0, -offset]}>
            <boxGeometry args={[0.38, 0.22, 0.26]} />
            <meshStandardMaterial color="#b91c1c" roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* ---------------------------------------------------- */}
      {/* SECONDARY PCIe EXPANSION SLOTS */}
      {/* ---------------------------------------------------- */}
      {/* PCIe x1 Small Slot */}
      <mesh position={[-0.4, 0.23, 0.2]}>
        <boxGeometry args={[1.18, 0.12, 0.2]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} />
      </mesh>
      {/* Secondary PCIe x4 Slot */}
      <mesh position={[-0.4, 0.23, 2.2]}>
        <boxGeometry args={[3.18, 0.12, 0.24]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} />
      </mesh>

      {/* ---------------------------------------------------- */}
      {/* 1. CPU & SOCKET NODE (Center Top) */}
      {/* ---------------------------------------------------- */}
      <group
        position={[0, 0.3, -1.2]}
        onClick={(e) => { e.stopPropagation(); onSelectComponent('cpu'); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('cpu'); }}
        onPointerOut={() => setHovered(null)}
        className="cursor-pointer"
      >
        {/* CPU Socket Frame Base */}
        <mesh>
          <boxGeometry args={[2.18, 0.18, 2.18]} />
          <meshStandardMaterial color={getHighlightColor('cpu', '#1e293b')} metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Metallic Retention Latch Bracket Frame (Slightly larger, non-overlapping) */}
        <mesh position={[0, 0.105, 0]}>
          <boxGeometry args={[2.04, 0.02, 2.04]} />
          <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Socket Arm Lever */}
        <mesh position={[1.08, 0.14, 0]} rotation={[0, 0, Math.PI / 12]}>
          <cylinderGeometry args={[0.022, 0.022, 1.75, 6]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.98} />
        </mesh>

        {/* Heat Spreader IHS (Elevated on top of frame) */}
        <mesh position={[0, 0.16, 0]}>
          <boxGeometry args={[1.6, 0.08, 1.6]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.05} />
        </mesh>

        {/* Glowing Energy Core */}
        <mesh position={[0, 0.21, 0]}>
          <boxGeometry args={[0.85, 0.02, 0.85]} />
          <meshBasicMaterial color={selectedComponent === 'cpu' ? "#f59e0b" : "#38bdf8"} />
        </mesh>

        <Html position={[0, 0.6, 0]} center distanceFactor={8}>
          <button
            onClick={() => onSelectComponent('cpu')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all shadow-xl pointer-events-auto cursor-pointer border ${
              selectedComponent === 'cpu'
                ? 'bg-amber-500 text-paper-950 border-amber-400 scale-110'
                : 'bg-paper-900/90 text-amber-400 border-amber-500/40 hover:bg-amber-400 hover:text-paper-950'
            }`}
          >
            [CPU Prosessor]
          </button>
        </Html>
      </group>

      {/* ---------------------------------------------------- */}
      {/* 2. RAM DUAL SLOTS (Top Right) */}
      {/* ---------------------------------------------------- */}
      <group
        position={[2.0, 0.42, -1.2]}
        onClick={(e) => { e.stopPropagation(); onSelectComponent('ram'); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('ram'); }}
        onPointerOut={() => setHovered(null)}
        className="cursor-pointer"
      >
        {[-0.35, 0.35].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            {/* Slot Channel Holder Base */}
            <mesh>
              <boxGeometry args={[0.18, 0.58, 2.65]} />
              <meshStandardMaterial color={getHighlightColor('ram', '#334155')} metalness={0.85} roughness={0.2} />
            </mesh>

            {/* Locking Clips/Latches at ends (Separated cleanly) */}
            <mesh position={[0, 0.3, 1.38]}>
              <boxGeometry args={[0.2, 0.12, 0.1]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.5} />
            </mesh>
            <mesh position={[0, 0.3, -1.38]}>
              <boxGeometry args={[0.2, 0.12, 0.1]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.5} />
            </mesh>

            {/* RAM Stick RGB Light Strip (Elevated on top) */}
            <mesh position={[0, 0.34, 0]}>
              <boxGeometry args={[0.16, 0.1, 2.6]} />
              <meshBasicMaterial color={selectedComponent === 'ram' ? "#f59e0b" : "#38bdf8"} />
            </mesh>
          </group>
        ))}

        <Html position={[0, 0.8, 0]} center distanceFactor={8}>
          <button
            onClick={() => onSelectComponent('ram')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all shadow-xl pointer-events-auto cursor-pointer border ${
              selectedComponent === 'ram'
                ? 'bg-amber-500 text-paper-950 border-amber-400 scale-110'
                : 'bg-paper-900/90 text-amber-400 border-amber-500/40 hover:bg-amber-400 hover:text-paper-950'
            }`}
          >
            [Memori RAM]
          </button>
        </Html>
      </group>

      {/* ---------------------------------------------------- */}
      {/* 3. GPU EXPANSION SLOT & CARD (Center Bottom) */}
      {/* ---------------------------------------------------- */}

      {/* PCIe Metal Armor Base Slot (On PCB) */}
      <mesh position={[-0.4, 0.22, 1.2]}>
        <boxGeometry args={[4.38, 0.12, 0.32]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* PCIe Retention Clip Latch at end */}
      <mesh position={[1.82, 0.28, 1.2]}>
        <boxGeometry args={[0.22, 0.2, 0.36]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} />
      </mesh>

      <group
        position={[-0.4, 0.65, 1.2]}
        onClick={(e) => { e.stopPropagation(); onSelectComponent('gpu'); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('gpu'); }}
        onPointerOut={() => setHovered(null)}
        className="cursor-pointer"
      >
        {/* GPU Graphics Card Main Body (Elevated cleanly above the PCIe slot) */}
        <mesh>
          <boxGeometry args={[4.2, 0.7, 1.38]} />
          <meshStandardMaterial color={getHighlightColor('gpu', '#1e293b')} metalness={0.9} roughness={0.2} flatShading />
        </mesh>

        {/* Backplate Metallic Armor */}
        <mesh position={[0, 0.37, 0]}>
          <boxGeometry args={[4.0, 0.04, 1.2]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
        </mesh>

        <Html position={[0, 0.8, 0]} center distanceFactor={8}>
          <button
            onClick={() => onSelectComponent('gpu')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all shadow-xl pointer-events-auto cursor-pointer border ${
              selectedComponent === 'gpu'
                ? 'bg-amber-500 text-paper-950 border-amber-400 scale-110'
                : 'bg-paper-900/90 text-amber-400 border-amber-500/40 hover:bg-amber-400 hover:text-paper-950'
            }`}
          >
            [GPU Kartu Grafis]
          </button>
        </Html>
      </group>

      {/* ---------------------------------------------------- */}
      {/* 4. NVME SSD SLOT (Center Middle) */}
      {/* ---------------------------------------------------- */}
      <group
        position={[-1.6, 0.28, 0.1]}
        onClick={(e) => { e.stopPropagation(); onSelectComponent('ssd'); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('ssd'); }}
        onPointerOut={() => setHovered(null)}
        className="cursor-pointer"
      >
        {/* M.2 PCB Board */}
        <mesh>
          <boxGeometry args={[2.48, 0.12, 0.78]} />
          <meshStandardMaterial color={getHighlightColor('ssd', '#059669')} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Aluminum Heatsink Cover (Elevated: y = 0.08 to 0.11) */}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[2.38, 0.035, 0.7]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.95} />
        </mesh>
        {/* Standoff Screw (Elevated on top of heatsink) */}
        <mesh position={[1.05, 0.11, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.03, 8]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
        </mesh>

        <Html position={[0, 0.48, 0]} center distanceFactor={8}>
          <button
            onClick={() => onSelectComponent('ssd')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all shadow-xl pointer-events-auto cursor-pointer border ${
              selectedComponent === 'ssd'
                ? 'bg-amber-500 text-paper-950 border-amber-400 scale-110'
                : 'bg-paper-900/90 text-amber-400 border-amber-500/40 hover:bg-amber-400 hover:text-paper-950'
            }`}
          >
            [NVMe SSD]
          </button>
        </Html>
      </group>

      {/* ---------------------------------------------------- */}
      {/* 5. POWER SUPPLY HEADER (Bottom Right) */}
      {/* ---------------------------------------------------- */}
      <group
        position={[2.2, 0.32, 1.4]}
        onClick={(e) => { e.stopPropagation(); onSelectComponent('psu'); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('psu'); }}
        onPointerOut={() => setHovered(null)}
        className="cursor-pointer"
      >
        <mesh>
          <boxGeometry args={[1.58, 0.32, 1.18]} />
          <meshStandardMaterial color={getHighlightColor('psu', '#3f3f46')} metalness={0.9} roughness={0.2} flatShading />
        </mesh>

        <Html position={[0, 0.52, 0]} center distanceFactor={8}>
          <button
            onClick={() => onSelectComponent('psu')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all shadow-xl pointer-events-auto cursor-pointer border ${
              selectedComponent === 'psu'
                ? 'bg-amber-500 text-paper-950 border-amber-400 scale-110'
                : 'bg-paper-900/90 text-amber-400 border-amber-500/40 hover:bg-amber-400 hover:text-paper-950'
            }`}
          >
            [Suplai Daya PSU]
          </button>
        </Html>
      </group>

      {/* ---------------------------------------------------- */}
      {/* 6. AIR CPU COOLER TOWER (Top Left) */}
      {/* ---------------------------------------------------- */}
      <group
        position={[-2.0, 0.52, -1.8]}
        onClick={(e) => { e.stopPropagation(); onSelectComponent('cooler'); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('cooler'); }}
        onPointerOut={() => setHovered(null)}
        className="cursor-pointer"
      >
        {/* Aluminum Heatsink Tower Body */}
        <mesh>
          <boxGeometry args={[1.5, 0.75, 1.3]} />
          <meshStandardMaterial color={getHighlightColor('cooler', '#94a3b8')} metalness={0.9} roughness={0.15} flatShading />
        </mesh>
        
        {/* Copper Heatpipes Array (4 Vertical Low-Poly Tubes) */}
        {[-0.4, -0.15, 0.15, 0.4].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 0.4, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.15, 6]} />
            <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.1} />
          </mesh>
        ))}

        {/* 120mm Cooling Fan Outer Frame */}
        <mesh position={[0, 0, 0.68]}>
          <cylinderGeometry args={[0.55, 0.55, 0.12, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#0f172a" metalness={0.6} />
        </mesh>

        {/* Cooling Fan Blades / Center Hub */}
        <mesh position={[0, 0, 0.74]}>
          <cylinderGeometry args={[0.22, 0.22, 0.02, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshBasicMaterial color={selectedComponent === 'cooler' ? "#f59e0b" : "#38bdf8"} />
        </mesh>

        <Html position={[0, 0.7, 0]} center distanceFactor={8}>
          <button
            onClick={() => onSelectComponent('cooler')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all shadow-xl pointer-events-auto cursor-pointer border ${
              selectedComponent === 'cooler'
                ? 'bg-amber-500 text-paper-950 border-amber-400 scale-110'
                : 'bg-paper-900/90 text-amber-400 border-amber-500/40 hover:bg-amber-400 hover:text-paper-950'
            }`}
          >
            [Air CPU Cooler]
          </button>
        </Html>
      </group>

      {/* Pulsing Quantum Sci-Fi Energy Particles */}
      <Sparkles count={120} scale={[6.5, 1.2, 6.5]} size={5} speed={2} color="#38bdf8" />
    </group>
  );
}
