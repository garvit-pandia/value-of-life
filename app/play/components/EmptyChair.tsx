'use client'

import { useState } from 'react'
import { useAudio } from '@/lib/AudioProvider'

export function EmptyChair({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'intake' | 'processing' | 'verdict'>('intake')
  const { playClick, setTension } = useAudio()

  const [formData, setFormData] = useState({ age: '', income: '', dependents: '' })
  const [personalValue, setPersonalValue] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playClick()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPhase('processing')
    setTension(0.8) // High tension for self evaluation processing

    // Mock Actuarial Math
    const age = parseInt(formData.age) || 30
    const income = parseInt(formData.income) || 500000
    const dependents = parseInt(formData.dependents) || 0
    
    // Remaining working years (assume 65 retirement)
    const workingYears = Math.max(0, 65 - age)
    
    const baseValue = workingYears * income
    const dependentModifier = 1 + (dependents * 0.15)
    const actuarialDeduction = 0.6 // The "cold logic" tax
    
    const finalCalculatedValue = Math.floor(baseValue * dependentModifier * actuarialDeduction)
    
    setTimeout(() => {
      setPersonalValue(finalCalculatedValue)
      setPhase('verdict')
      setTension(0.1) // Drop tension on reveal
    }, 4000)
  }

  return (
    <div className="dossier-card p-6 md:p-8 relative min-h-[400px] flex flex-col justify-center">
      {phase === 'intake' && (
        <form onSubmit={handleFormSubmit} className="space-y-6 animate-reveal">
          <div className="border-b-2 border-stamp-red pb-4 mb-6 relative">
            <button 
              type="button" 
              onClick={onComplete}
              className="absolute top-0 right-0 font-mono text-[10px] text-parchment/40 uppercase hover:text-stamp-red transition-colors border border-transparent hover:border-stamp-red/30 px-2 py-1"
            >
              [ SKIP ]
            </button>
            <h2 className="text-2xl text-stamp-red font-serif font-bold uppercase tracking-widest pr-16">
              Self Appraisal
            </h2>
            <p className="font-mono text-[10px] text-parchment/60 uppercase mt-2">
              File: [YOUR NAME HERE] — To complete external analysis, provide internal baselines.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="font-mono text-[10px] text-parchment/50 uppercase tracking-widest mb-1">Biological Age</label>
              <input required type="number" name="age" value={formData.age} onChange={handleInputChange} className="bg-transparent border-b-2 border-parchment/30 text-parchment font-mono p-3 outline-none focus:border-stamp-red" />
            </div>
            <div className="flex flex-col">
              <label className="font-mono text-[10px] text-parchment/50 uppercase tracking-widest mb-1">Current Annual Income (INR)</label>
              <input required type="number" name="income" value={formData.income} onChange={handleInputChange} className="bg-transparent border-b-2 border-parchment/30 text-parchment font-mono p-3 outline-none focus:border-stamp-red" />
            </div>
            <div className="flex flex-col">
              <label className="font-mono text-[10px] text-parchment/50 uppercase tracking-widest mb-1">Number of Dependents</label>
              <input required type="number" name="dependents" value={formData.dependents} onChange={handleInputChange} className="bg-transparent border-b-2 border-parchment/30 text-parchment font-mono p-3 outline-none focus:border-stamp-red" />
            </div>
          </div>

          <button type="submit" className="w-full py-4 mt-8 bg-stamp-red text-[#050505] font-mono font-bold uppercase tracking-[0.3em] hover:bg-parchment transition-colors">
            Calculate Net Human Yield
          </button>
          
          <button 
            type="button" 
            onClick={onComplete}
            className="w-full py-3 mt-2 text-center text-parchment/50 text-[10px] uppercase font-mono tracking-widest hover:text-parchment transition-colors"
          >
            Refuse Appraisal (Skip) &rarr;
          </button>
        </form>
      )}

      {phase === 'processing' && (
        <div className="space-y-4 animate-reveal font-mono text-sm text-parchment">
          <p className="animate-pulse">&gt; Actuarial hazard simulation initiated...</p>
          <p className="animate-pulse" style={{ animationDelay: '1s' }}>&gt; Applying systemic morbidity modifiers...</p>
          <p className="animate-pulse" style={{ animationDelay: '2s' }}>&gt; Projecting lifetime economic utility...</p>
          <p className="animate-pulse text-stamp-red" style={{ animationDelay: '3s' }}>&gt; DEDUCTING INTRINSIC WORTH...</p>
        </div>
      )}

      {phase === 'verdict' && (
        <div className="text-center space-y-8 animate-reveal">
          <div>
            <p className="font-mono text-[10px] text-parchment/50 uppercase tracking-widest mb-2">Subject Final Valuation</p>
            <p className="text-5xl font-mono text-parchment tracking-tight bg-parchment/10 inline-block px-4 py-2">
              <span className="animate-unredact">
                ₹{personalValue?.toLocaleString('en-IN')}
              </span>
            </p>
          </div>
          <p className="font-serif italic text-parchment/60 text-sm max-w-sm mx-auto">
            &quot;An unsentimental reflection of future earning potential, discounted for standard hazards. You are now calibrated.&quot;
          </p>
          <button onClick={onComplete} className="w-full py-4 border-2 border-parchment font-mono font-bold text-parchment uppercase tracking-[0.3em] hover:bg-parchment hover:text-[#050505] transition-colors">
            Finalize Archive
          </button>
        </div>
      )}

      <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-stamp-red -mt-[2px] -ml-[2px]"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-stamp-red -mt-[2px] -mr-[2px]"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-parchment -mb-[2px] -ml-[2px] opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-parchment -mb-[2px] -mr-[2px] opacity-30"></div>
    </div>
  )
}
