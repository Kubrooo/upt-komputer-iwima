import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Minimize2, Maximize2, Play, Activity, Cpu, HardDrive, Wifi, Sparkles } from 'lucide-react';

/**
 * Interactive Command Line Terminal & Live System Status Monitor HUD.
 * Floating retro interactive terminal widget that lets users execute CLI commands
 * (help, status, lab, ticket, specs, clear, matrix) and view live simulated UPT server metrics.
 */
export default function TerminalHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'UPT KOMPUTER IWIMA [OS v4.2.0-RELEASE]' },
    { type: 'system', text: 'Ketik "help" untuk melihat daftar perintah interaktif.' },
  ]);

  const [metrics, setMetrics] = useState({
    cpuLoad: 24,
    ramUsage: 48,
    activePCs: 28,
    totalPCs: 35,
    ping: 4,
  });

  const bottomRef = useRef(null);

  // Simulate subtle real-time server metric fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        cpuLoad: Math.min(85, Math.max(12, prev.cpuLoad + (Math.floor(Math.random() * 9) - 4))),
        ramUsage: Math.min(90, Math.max(35, prev.ramUsage + (Math.floor(Math.random() * 5) - 2))),
        ping: Math.min(12, Math.max(2, prev.ping + (Math.floor(Math.random() * 3) - 1))),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Listener for mobile navbar menu toggle
  useEffect(() => {
    const handleMenuToggle = (e) => {
      setIsMobileMenuOpen(!!e.detail);
    };
    window.addEventListener('mobile-menu-toggle', handleMenuToggle);
    return () => window.removeEventListener('mobile-menu-toggle', handleMenuToggle);
  }, []);

  // Listener for 3D Computer Explorer close signal
  useEffect(() => {
    const handleClosed = (e) => {
      setIsMinimized(false);
      setIsOpen(true);
      setHistory((prev) => [
        ...prev,
        { type: 'success', text: `> ${e.detail || 'specifications complete.'}` }
      ]);
    };
    window.addEventListener('3d-explorer-closed', handleClosed);
    return () => window.removeEventListener('3d-explorer-closed', handleClosed);
  }, []);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `$ ${inputVal}` }];

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let response = [];

    switch (cmd) {
      case 'help':
        response = [
          { type: 'output', text: '--- DAFTAR PERINTAH INTERAKTIF ---' },
          { type: 'output', text: '  status   : Tampilkan statistik server & jaringan UPT real-time' },
          { type: 'output', text: '  lab      : Buka & lompat ke Penjelajah Laboratorium' },
          { type: 'output', text: '  specs    : Tampilkan spesifikasi PC Utama (Core i7, GTX 1060, 16GB RAM)' },
          { type: 'output', text: '  ticket   : Lompat ke Form Bantuan Teknis' },
          { type: 'output', text: '  clear    : Bersihkan layar terminal' },
        ];
        break;
      case 'status':
        response = [
          { type: 'output', text: `[SERVER STATUS] OK — Ping: ${metrics.ping}ms` },
          { type: 'output', text: `[CPU LOAD]      ${metrics.cpuLoad}% (Intel Xeon E5 Cluster)` },
          { type: 'output', text: `[RAM USAGE]     ${metrics.ramUsage}% (128GB ECC Registered)` },
          { type: 'output', text: `[LAB WORKSPACE] ${metrics.activePCs}/${metrics.totalPCs} PC Terhubung (80% Kapasitas)` },
          { type: 'output', text: '[BANDWIDTH]     1.2 Gbps Dedicated Campus Fiber' },
        ];
        break;
      case 'lab':
        window.dispatchEvent(new CustomEvent('lazy-section-reveal', { detail: 'labs' }));
        document.querySelector('#labs')?.scrollIntoView({ behavior: 'smooth' });
        response = [
          { type: 'success', text: '>> Navigasi ke Penjelajah Laboratorium (#labs)...' },
        ];
        break;
      case 'specs':
      case '3d':
        setIsMinimized(true);
        window.dispatchEvent(new CustomEvent('launch-3d-explorer'));
        response = [
          { type: 'success', text: '>> INITIATING 3D CINEMATIC COMPUTER EXPLORER PORTAL...' },
          { type: 'output', text: '>> Entering hardware assembly space...' },
        ];
        break;
      case 'ticket':
        window.dispatchEvent(new CustomEvent('lazy-section-reveal', { detail: 'support' }));
        document.querySelector('#support')?.scrollIntoView({ behavior: 'smooth' });
        response = [
          { type: 'success', text: '>> Navigasi ke Form Tiket Bantuan (#support)...' },
        ];
        break;
      default:
        response = [
          { type: 'error', text: `Perintah "${cmd}" tidak dikenali. Ketik "help" untuk bantuan.` },
        ];
        break;
    }

    setHistory([...newHistory, ...response]);
    setInputVal('');
  };

  return (
    <div className={`fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-30 font-mono transition-all duration-300 ${
      isMobileMenuOpen ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
    }`}>
      {!isOpen ? (
        <div className="flex items-center gap-2 sm:gap-2.5 max-w-[calc(100vw-1.5rem)]">
          {/* Direct Floating 3D Hardware Explorer Trigger Button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('launch-3d-explorer'))}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-amber-500 text-paper-950 hover:bg-amber-400 font-mono font-bold transition-all duration-300 shadow-2xl shadow-amber-500/30 cursor-pointer border border-amber-400 hover:scale-105 group shrink-0"
            title="Buka Penjelajah Hardware Motherboard 3D Interaktif"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-paper-950 animate-bounce shrink-0" />
            <span className="text-[11px] sm:text-xs tracking-wider uppercase whitespace-nowrap">
              3D Spec<span className="hidden sm:inline"> Mobo</span>
            </span>
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 sm:gap-2.5 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-paper-900/95 border border-amber-500/40 text-amber-400 hover:text-paper-950 hover:bg-amber-400 hover:border-amber-400 transition-all duration-300 shadow-2xl shadow-amber-500/20 backdrop-blur-xl group cursor-pointer shrink-0"
            title="Buka Live Terminal & System Monitor UPT"
          >
            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap">
              <span className="hidden sm:inline">Live </span>Terminal
            </span>
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </button>
        </div>
      ) : (
        <div className={`w-[calc(100vw-1.5rem)] max-w-sm sm:max-w-none sm:w-[450px] bg-paper-950/95 border border-paper-700 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl transition-all duration-300 ${isMinimized ? 'h-12' : 'h-[360px] sm:h-[380px] flex flex-col'
          }`}>
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-paper-900 border-b border-paper-800 select-none">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
              <Terminal className="w-3.5 h-3.5" />
              <span>UPT-CLI Terminal HUD</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">ONLINE</span>
            </div>
            <div className="flex items-center gap-1.5 text-paper-400">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('launch-3d-explorer'))}
                className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono hover:bg-amber-500 hover:text-paper-950 transition-all cursor-pointer mr-1"
                title="Buka Penjelajah 3D"
              >
                3D Mobo 🛠️
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:text-paper-100 rounded hover:bg-paper-800 transition-colors"
                title={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:text-rose-400 rounded hover:bg-paper-800 transition-colors"
                title="Close Terminal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Live Metrics Gauge Bar */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-paper-900/60 border-b border-paper-800/80 text-[10px] text-paper-300">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-amber-400" />
                  <span>CPU: <strong className="text-paper-100">{metrics.cpuLoad}%</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HardDrive className="w-3 h-3 text-amber-400" />
                  <span>RAM: <strong className="text-paper-100">{metrics.ramUsage}%</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  <span>Ping: <strong className="text-emerald-400">{metrics.ping}ms</strong></span>
                </div>
              </div>

              {/* Terminal Logs Viewport */}
              <div className="flex-1 p-4 overflow-y-auto space-y-1.5 text-xs font-mono">
                {history.map((item, idx) => (
                  <div
                    key={idx}
                    className={`leading-relaxed ${item.type === 'user'
                        ? 'text-amber-300 font-semibold'
                        : item.type === 'success'
                          ? 'text-emerald-400'
                          : item.type === 'error'
                            ? 'text-rose-400'
                            : 'text-paper-300'
                      }`}
                  >
                    {item.text}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Terminal Quick Command Chips & Input Form */}
              <div className="p-3 bg-paper-900 border-t border-paper-800 space-y-2">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px]">
                  <span className="text-paper-400 shrink-0">Quick:</span>
                  {['status', 'specs', 'ticket', 'matrix', 'clear'].map((cmdChip) => (
                    <button
                      key={cmdChip}
                      onClick={() => {
                        setInputVal(cmdChip);
                      }}
                      className="px-2 py-0.5 rounded bg-paper-950 border border-paper-800 text-amber-400 hover:border-amber-500 transition-colors shrink-0 cursor-pointer"
                    >
                      {cmdChip}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleCommandSubmit} className="flex items-center gap-2">
                  <span className="text-amber-400 text-xs font-bold">$</span>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ketik 'status', 'specs', atau 'help'..."
                    className="w-full bg-transparent text-xs text-paper-100 placeholder-paper-400 focus:outline-none"
                  />
                  <button type="submit" className="text-amber-400 hover:text-amber-300 p-1 cursor-pointer">
                    <Play className="w-3.5 h-3.5 fill-amber-400" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
