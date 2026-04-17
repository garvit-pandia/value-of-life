'use client'

import Link from "next/link";
import { useGame } from "@/lib/GameContext";
import { useAudio } from "@/lib/AudioProvider";

export default function Home() {
  const { resetGame } = useGame();
  const { unlockAudio } = useAudio();

  const handleStart = () => {
    unlockAudio();
    resetGame();
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#050505] px-4 text-center select-none relative">
      <div className="border border-parchment/30 p-1 md:p-2 w-full max-w-3xl relative z-10 animate-reveal">
        <div className="border border-parchment/50 p-6 md:p-12 flex flex-col items-center gap-12 bg-[#050505]">
          <div className="w-full flex justify-between items-start text-xs font-mono text-parchment/60 uppercase tracking-widest border-b border-parchment/30 pb-4">
            <span>[Dept of Actuarial Ethics]</span>
            <span>File: Vol-II-9A</span>
          </div>

          <div className="flex flex-col gap-6 py-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold italic tracking-tight text-parchment">
              A LIFE, REDUCED <br /> TO A NUMBER.
            </h1>
            
            <p className="font-mono text-parchment text-sm md:text-base leading-relaxed bg-parchment/10 inline-block px-4 py-2 mx-auto uppercase tracking-wide">
              Estimate the legal settlement of actual court cases.<br/>
              Discover the systemic biases in human valuation.
            </p>
          </div>
          
          <div className="mt-4 w-full flex justify-center border-t border-parchment/30 pt-8 relative">
            <Link 
              href="/play" 
              onClick={handleStart}
              className="group relative inline-flex h-14 items-center justify-center border-2 border-stamp-red bg-transparent text-stamp-red px-12 font-mono font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-stamp-red hover:text-[#050505]"
            >
              <span>Access Archive &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-[10px] font-mono text-parchment/40 tracking-widest uppercase text-center animate-reveal" style={{ animationDelay: '0.5s' }}>
        CLASSIFIED: EXPERIMENT IN PROGRESS
      </div>
    </main>
  );
}
