'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PatternResult } from '@/types'
import { getPattern } from '@/lib/patternEngine'
import { useGame } from '@/lib/GameContext'
import casesData from '@/data/cases.json'

export default function ResultPage() {
  const { guesses, isInitialized, resetGame } = useGame()
  const [pattern, setPattern] = useState<PatternResult | null>(null)
  const [copying, setCopying] = useState(false)

  useEffect(() => {
    if (guesses && guesses.length > 0) {
      setPattern(getPattern(guesses))
    }
  }, [guesses])

  const handleCopy = () => {
    if (!pattern) return
    const text = `TRIBUNAL ANALYSIS V-01\nSTATUS: CLASSIFIED\nCLASSIFICATION: ${pattern.biasLine}\nSUMMARY: ${pattern.agreementLine}`
    navigator.clipboard.writeText(text).then(() => {
      setCopying(true)
      setTimeout(() => setCopying(false), 2000)
    })
  }

  // If Context hasn't loaded state from session storage yet
  if (!isInitialized) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-1 bg-parchment animate-pulse"></div>
      </main>
    )
  }

  if (guesses.length === 0 || !pattern) {
    return (
      <main className="min-h-screen bg-[#050505] text-parchment flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-xl font-mono mb-8 border border-stamp-red text-stamp-red p-4 inline-block transform -rotate-2 font-bold tracking-widest">NO SESSION DETECTED</h2>
        <Link 
          href="/" 
          onClick={() => resetGame()}
          className="text-xs uppercase tracking-widest font-mono text-parchment/60 hover:text-parchment transition-colors underline decoration-parchment/30 underline-offset-4"
        >
          Return to Terminal
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#050505] text-parchment flex flex-col items-center justify-center px-4 md:px-12 relative">
      <div className="w-full max-w-3xl border-4 border-parchment p-6 md:p-16 relative bg-[#050505] z-10 animate-reveal">
        
        {/* Paper corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-r-2 border-b-2 border-parchment bg-[#050505]"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-dashed border-stamp-red rounded-full opacity-30 pointer-events-none flex items-center justify-center -rotate-12"><span className="text-[6px] font-mono font-bold text-stamp-red">FILE CLOSED</span></div>

        <div className="space-y-4 mb-12 border-b-2 border-parchment/60 pb-6">
          <p className="font-mono text-xs text-parchment/60 uppercase tracking-[0.4em]">Final Actuarial Analysis</p>
          <div className="w-full h-px bg-parchment/30"></div>
        </div>

        <div className="space-y-8 mb-16">
          <h1 className="text-3xl md:text-5xl font-serif italic font-bold leading-tight uppercase tracking-tight">
            {pattern.biasLine}
          </h1>
          <div className="bg-parchment/5 border-l-4 border-stamp-red p-6">
            <p className="font-mono text-sm md:text-base text-parchment font-light leading-relaxed">
              {pattern.agreementLine}
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col items-center gap-6 border-t-2 border-parchment/60 mt-8">
          <button
            onClick={handleCopy}
            className={`flex h-14 items-center justify-center border-2 px-12 font-mono text-sm uppercase tracking-[0.3em] font-bold transition-all duration-300 ${copying ? 'border-stamp-red text-stamp-red bg-stamp-red/10' : 'border-parchment text-parchment hover:bg-parchment hover:text-[#050505]'}`}
          >
            {copying ? '[COPIED TO CLIPBOARD]' : 'DECLASSIFY & EXPORT'}
          </button>

          {guesses.length < casesData.length && (
            <Link 
              href="/play" 
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-parchment border border-parchment/50 hover:bg-parchment hover:text-[#050505] transition-colors px-6 py-3 font-bold"
            >
              Analyze {Math.min(5, casesData.length - guesses.length)} More Cases
            </Link>
          )}

          <Link 
            href="/" 
            onClick={() => resetGame()}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-parchment/50 hover:text-stamp-red hover:underline decoration-stamp-red transition-all mt-4"
          >
            Destroy Records & Restart
          </Link>
        </div>
      </div>

      <div className="mt-8 font-mono text-[10px] text-parchment/30 tracking-[0.4em] uppercase">
        END OF TRANSMISSION
      </div>
    </main>
  )
}
