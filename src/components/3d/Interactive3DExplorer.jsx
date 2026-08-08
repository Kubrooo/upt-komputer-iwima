import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Sparkles, Cpu, CheckCircle2, RotateCcw } from 'lucide-react';
import { IntegratedMotherboard } from './ComputerModels';
import {
  playAmbientHum,
  playComponentChime,
  playElectricZap,
} from '../../utils/audioSFX';

/**
 * Detailed Hardware Specifications for Interactive Motherboard Components.
 */
const COMPONENT_DETAILS = {
  cpu: {
    id: 'cpu',
    badge: 'KOMPONEN #01',
    title: 'CENTRAL PROCESSING UNIT',
    subtitle: 'Otak Eksekusi Komputasi Multi-Thread',
    desc: 'Prosesor 16-Core 24-Thread berperforma tinggi untuk eksekusi simulasi, analisis data, rendering grafis, dan pemrosesan kode instan.',
    specs: [
      { label: 'PROSESOR', val: '13th Gen Intel Core i7-13700' },
      { label: 'CORES / THREADS', val: '16 Cores (8P + 8E) / 24 Threads' },
      { label: 'CLOCK SPEED', val: '2.10 GHz Base / 5.40 GHz Turbo' },
      { label: 'L3 CACHE', val: '30MB Intel Smart Cache' },
    ],
  },
  ram: {
    id: 'ram',
    badge: 'KOMPONEN #02',
    title: 'HIGH-SPEED DDR4 MEMORY',
    subtitle: 'Memori Utama Akses Ultrafast',
    desc: 'Modul RAM Dual-Channel 16GB (2x8GB) berfrekuensi 3200MHz yang memproses data komputasi dan tugas perkuliahan secara lancar dan stabil.',
    specs: [
      { label: 'KAPASITAS', val: '16GB (2x8GB Kit)' },
      { label: 'TIPE MEMORI', val: 'DDR4 Dual-Channel' },
      { label: 'FREKUENSI', val: '3200 MHz High-Speed' },
      { label: 'LATENCY', val: 'CL16 Low Latency' },
    ],
  },
  gpu: {
    id: 'gpu',
    badge: 'KOMPONEN #03',
    title: 'GRAPHICS PROCESSING UNIT',
    subtitle: 'Akselerasi Grafis & Visualisasi 3D',
    desc: 'Kartu grafis NVIDIA GeForce GTX 1060 6GB yang mempercepat komputasi kalkulasi fisik 3D, rendering grafis, dan pemrosesan visual presisi.',
    specs: [
      { label: 'GPU MODEL', val: 'NVIDIA GeForce GTX 1060' },
      { label: 'VRAM MEMORY', val: '6GB GDDR5 Dedicated' },
      { label: 'CUDA CORES', val: '1280 Compute Cores' },
      { label: 'AKSELERASI', val: 'NVIDIA Pascal Architecture' },
    ],
  },
  ssd: {
    id: 'ssd',
    badge: 'KOMPONEN #04',
    title: 'NVME HIGH-SPEED SSD',
    subtitle: 'Penyimpanan Data Berkecepatan Tinggi',
    desc: 'Media solid-state M.2 NVMe 512GB dengan kecepatan transfer tinggi untuk booting cepat dan load instan aplikasi perkuliahan.',
    specs: [
      { label: 'KAPASITAS', val: '512GB NVMe M.2' },
      { label: 'READ SPEED', val: '3,500 MB/s Sequential' },
      { label: 'WRITE SPEED', val: '3,000 MB/s Sequential' },
      { label: 'INTERFASE', val: 'M.2 PCIe Gen3 x4 / Gen4' },
    ],
  },
  psu: {
    id: 'psu',
    badge: 'KOMPONEN #05',
    title: 'POWER SUPPLY UNIT',
    subtitle: 'Suplai Daya Terstabilisasi 80+ Gold',
    desc: 'Power Supply 750W modular dengan sertifikasi efisiensi 80 PLUS Gold dan sistem perlindungan tegangan penuh terhadap keandalan 24/7.',
    specs: [
      { label: 'OUTPUT DAYA', val: '750 Watt Continuous' },
      { label: 'EFISIENSI', val: '80 PLUS Gold Certified' },
      { label: 'KABEL', val: 'Full Modular Braided Sleeved' },
      { label: 'PROTEKSI', val: 'OVP / OCP / SCP / OPP' },
    ],
  },
  cooler: {
    id: 'cooler',
    badge: 'KOMPONEN #06',
    title: 'TOWER AIR CPU COOLER',
    subtitle: 'Sistem Pendingin Udara Heatpipe Direct-Contact',
    desc: 'Pendingin udara CPU tipe tower dengan 4 heatpipe tembaga presisi dan kipas PWM 120mm yang senyap untuk menjaga suhu operasi prosesor tetap dingin dan stabil.',
    specs: [
      { label: 'HEATSINK', val: 'Single Tower Aluminum Fins' },
      { label: 'HEATPIPES', val: '4x Direct-Contact Copper Heatpipes' },
      { label: 'KIPAS PENDINGIN', val: '120mm PWM Silent Fan (1800 RPM)' },
      { label: 'TDP RATING', val: '150W TDP Thermal Capacity' },
    ],
  },
};

export default function Interactive3DExplorer({ onClose }) {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [muted, setMuted] = useState(false);
  const ambientSoundRef = useRef(null);

  // Sound Ambient Hum lifecycle
  useEffect(() => {
    if (!muted) {
      ambientSoundRef.current = playAmbientHum();
    }
    return () => {
      if (ambientSoundRef.current) {
        ambientSoundRef.current.stop();
      }
    };
  }, [muted]);

  const handleSelectComponent = (compKey) => {
    setSelectedComponent(compKey);
    if (!muted) {
      playComponentChime();
      playElectricZap();
    }
  };

  const selectedDetails = selectedComponent ? COMPONENT_DETAILS[selectedComponent] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 bg-[#030712] text-paper-100 flex flex-col justify-between overflow-hidden select-none font-sans"
    >
      {/* 3D WebGL Canvas Viewport */}
      <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
        <Canvas gl={{ antialias: true, alpha: false }}>
          <PerspectiveCamera makeDefault fov={45} position={[0, 0.6, 5.2]} />

          {/* High Visibility Ambient Lighting & Volumetric Atmosphere */}
          <ambientLight intensity={2.0} />
          <directionalLight position={[5, 12, 8]} intensity={4.0} color="#ffffff" castShadow />
          <directionalLight position={[-5, -4, -4]} intensity={1.8} color="#38bdf8" />
          <pointLight position={[-4, 4, 4]} intensity={6.0} color="#06b6d4" />
          <pointLight position={[4, -2, 4]} intensity={5.0} color="#fbbf24" />
          <fog attach="fog" args={['#030712', 14, 38]} />

          {/* Background Stars & Floating Particles */}
          <Stars radius={50} depth={50} count={1200} factor={4} saturation={0} fade speed={1.5} />

          {/* Integrated Sci-Fi Motherboard with Interactive Nodes */}
          <group scale={1.2}>
            <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
              <IntegratedMotherboard
                selectedComponent={selectedComponent}
                onSelectComponent={handleSelectComponent}
              />
            </Float>
          </group>

          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={3.0}
            maxDistance={8.5}
            maxPolarAngle={Math.PI / 1.7}
          />
        </Canvas>
      </div>

      {/* Glassmorphism HUD Overlay Layer */}
      <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between pointer-events-none">
        {/* Top Left: Main Title & Interactive Instructions */}
        <div className="space-y-1.5 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-paper-900/90 border border-amber-500/40 text-[11px] font-mono text-amber-400 backdrop-blur-xl shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE SYSTEM BOARD</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-serif italic text-paper-50 tracking-wide">
            Eksplorasi Komponen Motherboard UPT
          </h2>
        </div>

        {/* Top Right: Sound & Exit Controls */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => setMuted(!muted)}
            className="p-2.5 rounded-full bg-paper-900/90 border border-paper-800 text-paper-300 hover:text-amber-400 hover:border-amber-500/50 transition-all backdrop-blur-xl cursor-pointer"
            title={muted ? 'Aktifkan Suara Audio SFX' : 'Mute Suara'}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={() => onClose('specifications complete.')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-paper-950 font-mono font-bold text-xs transition-all duration-300 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <span>Keluar Terminal</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Component Selector Buttons (Bottom Center) */}
      <div className="relative z-10 p-4 sm:p-6 flex flex-col items-center pointer-events-none space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pointer-events-auto max-w-full">
          {Object.keys(COMPONENT_DETAILS).map((compKey) => {
            const comp = COMPONENT_DETAILS[compKey];
            const isSelected = selectedComponent === compKey;
            return (
              <button
                key={compKey}
                onClick={() => handleSelectComponent(compKey)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer whitespace-nowrap border backdrop-blur-xl ${isSelected
                    ? 'bg-amber-500 text-paper-950 font-bold border-amber-400 scale-105 shadow-lg shadow-amber-500/30'
                    : 'bg-paper-900/80 text-paper-300 border-paper-700/80 hover:text-paper-50 hover:border-amber-500/40'
                  }`}
              >
                {comp.title.split(' ')[0]}
              </button>
            );
          })}
          {selectedComponent && (
            <button
              onClick={() => setSelectedComponent(null)}
              className="p-1.5 rounded-xl bg-paper-800 text-paper-400 hover:text-rose-400 border border-paper-700 cursor-pointer"
              title="Reset Pilihan"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="text-[11px] font-mono text-paper-300 uppercase tracking-widest bg-paper-900/90 px-4 py-1.5 rounded-full border border-paper-700/80 backdrop-blur-md shadow-xl">
          Click Nomor Label Pada Komponen 3D Atau Tombol Di Atas Untuk Membuka Spesifikasi
        </div>
      </div>

      {/* Slide-over Specs Card Modal (When Component Selected) */}
      <AnimatePresence>
        {selectedDetails && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 left-4 right-4 sm:left-auto sm:right-8 sm:w-96 z-20 bg-paper-900/95 border border-amber-500/40 rounded-3xl p-6 shadow-2xl shadow-amber-500/20 backdrop-blur-2xl space-y-4 font-sans pointer-events-auto"
          >
            <div className="flex items-center justify-between border-b border-paper-800 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">{selectedDetails.badge}</span>
                <h3 className="text-lg font-serif font-medium text-paper-50">{selectedDetails.title}</h3>
              </div>
              <button
                onClick={() => setSelectedComponent(null)}
                className="p-1.5 rounded-full bg-paper-800 text-paper-400 hover:text-paper-100 hover:bg-paper-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs font-sans text-paper-200 leading-relaxed">
              {selectedDetails.desc}
            </p>

            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-mono text-paper-400 uppercase tracking-wider block">Spesifikasi Detail Hardware</span>
              <div className="grid grid-cols-1 gap-2">
                {selectedDetails.specs.map((sp, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-paper-950/80 border border-paper-800 text-xs font-mono">
                    <span className="text-paper-400 text-[10px]">{sp.label}</span>
                    <span className="text-amber-300 font-bold">{sp.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
