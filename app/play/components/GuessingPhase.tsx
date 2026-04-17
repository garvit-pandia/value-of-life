'use client'

import { useState, useEffect, useRef } from 'react'
import { parseLakhCrore } from '@/lib/currencyUtils'

export function GuessingPhase({ onLockIn }: { onLockIn: (amount: number) => void }) {
  const [inputValue, setInputValue] = useState('')
  const [inputUnit, setInputUnit] = useState<'lakh' | 'crore'>('lakh')
  const inputRef = useRef<HTMLInputElement>(null)

  const isInvalid = !inputValue || parseFloat(inputValue) === 0 || isNaN(parseFloat(inputValue))
  const liveAmount = isInvalid ? 0 : parseLakhCrore(inputValue, inputUnit)

  useEffect(() => {
    // Focus the input immediately upon mount
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isInvalid) return
    onLockIn(liveAmount)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // Allow digits and a single decimal point
    if (/^\d*\.?\d*$/.test(val)) {
      setInputValue(val)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === 'l') {
      e.preventDefault()
      setInputUnit('lakh')
    } else if (e.key.toLowerCase() === 'c') {
      e.preventDefault()
      setInputUnit('crore')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-reveal outline outline-1 outline-parchment/20 p-5 bg-parchment/5" style={{ animationDelay: '0.2s' }}>
      <div>
        <p className="font-mono text-[10px] text-parchment border-b border-parchment/30 pb-2 uppercase tracking-[0.2em] mb-4 flex justify-between">
          <span>Official Appraisal Form</span>
          <span className="text-stamp-red">REQUIRED</span>
        </p>
        
        <div className="flex p-1 border-2 border-parchment/30 mb-4 w-full max-w-sm mx-auto">
          <button
            type="button"
            onClick={() => setInputUnit('lakh')}
            className={`h-12 flex-1 font-mono text-[11px] tracking-widest transition-all uppercase ${
              inputUnit === 'lakh' ? 'bg-parchment text-[#050505] font-bold' : 'text-parchment/50 hover:text-parchment bg-transparent'
            }`}
          >
            [L]akhs
          </button>
          <button
            type="button"
            onClick={() => setInputUnit('crore')}
            className={`h-12 flex-1 font-mono text-[11px] tracking-widest transition-all uppercase ${
              inputUnit === 'crore' ? 'bg-parchment text-[#050505] font-bold' : 'text-parchment/50 hover:text-parchment bg-transparent'
            }`}
          >
            [C]rores
          </button>
        </div>

        <div className="relative group border-b-2 border-parchment focus-within:border-stamp-red transition-colors max-w-sm mx-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-mono font-bold text-parchment/50 pointer-events-none">₹</span>
          <label htmlFor="guess-input" className="sr-only">Enter specific amount</label>
          <input
            id="guess-input"
            ref={inputRef}
            type="text"
            inputMode="decimal"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="0.00"
            className="bg-transparent text-parchment font-mono text-4xl md:text-5xl text-center w-full py-4 outline-none transition-all tracking-tight placeholder:text-parchment/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            autoFocus
          />
        </div>
        
        {/* Dynamic Value Echo */}
        <div className="h-4 mt-3 text-center">
          {!isInvalid && (
            <p className="font-mono text-[10px] text-parchment/60 uppercase tracking-widest animate-reveal">
              Translates to: <span className="text-parchment font-bold">₹ {liveAmount.toLocaleString('en-IN')} INR</span>
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isInvalid}
        className={`w-full py-6 text-sm outline outline-2 outline-offset-[-2px] uppercase tracking-[0.3em] font-mono font-bold transition-all duration-300 ${
          isInvalid 
            ? 'outline-parchment/20 text-parchment/20 cursor-not-allowed bg-transparent' 
            : 'outline-stamp-red text-stamp-red bg-transparent hover:bg-stamp-red hover:text-[#050505] shadow-[0_0_15px_rgba(255,0,0,0.2)]'
        }`}
      >
        Submit Findings
      </button>
    </form>
  )
}
