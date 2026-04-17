'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Case, GuessRecord } from '@/types'
import casesData from '@/data/cases.json'
import { useGame } from '@/lib/GameContext'
import { useAudio } from '@/lib/AudioProvider'

import { ProgressBar } from './components/ProgressBar'
import { CaseCard } from './components/CaseCard'
import { GuessingPhase } from './components/GuessingPhase'
import { RevealPhase } from './components/RevealPhase'
import { EmptyChair } from './components/EmptyChair'

export default function PlayPage() {
  const router = useRouter()
  const { addGuess, guesses } = useGame()
  const { setTension } = useAudio()
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [gamePhase, setGamePhase] = useState<'guessing' | 'revealed'>('guessing')
  const [initialized, setInitialized] = useState(false)
  
  const shuffledCasesRef = useRef<Case[]>([])

  useEffect(() => {
    const shuffle = (array: Case[]) => {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }

    // Filter out cases the user has already guessed
    const unseenCases = (casesData as Case[]).filter(
      c => !guesses.some(g => g.caseId === c.id)
    )

    if (unseenCases.length === 0) {
      // If they somehow exhausted all cases, route them directly to results
      router.push('/result')
      return;
    }

    shuffledCasesRef.current = shuffle(unseenCases).slice(0, 5)
    setInitialized(true)
    // reset tension on new round
    setTension(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  if (!initialized || !shuffledCasesRef.current.length) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-1 bg-parchment animate-pulse"></div>
      </div>
    )
  }

  const totalCases = shuffledCasesRef.current.length

  // Meta Mode triggered
  if (currentIndex === totalCases) {
    return (
      <main className="min-h-screen px-4 md:px-8 pt-8 flex flex-col items-center justify-center bg-[#050505]">
        <div className="w-full max-w-2xl animate-reveal flex flex-col">
          <EmptyChair onComplete={() => router.push('/result')} />
        </div>
      </main>
    )
  }

  const currentCase = shuffledCasesRef.current[currentIndex]

  const handleLockIn = (guessedAmount: number) => {
    const ratio = currentCase.actualPayoutINR === 0 
      ? null 
      : guessedAmount / currentCase.actualPayoutINR

    // Update tension based on miss amount.
    // If ratio is 1, they are perfectly accurate. If ratio is 10, they guessed 10x too much.
    if (ratio !== null) {
      let margin = Math.abs(1 - ratio)
      if (ratio > 1) { margin = ratio - 1 } else { margin = (1/ratio) - 1 }
      // Max tension reached when they are off by factor of 5+
      const tensionLevel = Math.min(1.0, margin / 5.0)
      setTension(tensionLevel)
    } else {
      // It was a zero payout case, automatic high tension unless they guessed 0
      setTension(guessedAmount === 0 ? 0 : 0.8)
    }

    const newGuess: GuessRecord = {
      caseId: currentCase.id,
      guessedAmount,
      actualAmount: currentCase.actualPayoutINR,
      ratio,
      country: currentCase.country,
      occupation: currentCase.occupation,
      age: currentCase.age,
      gender: currentCase.gender
    }

    addGuess(newGuess)
    setGamePhase('revealed')
  }

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1)
    setGamePhase('guessing')
  }

  return (
    <main className="min-h-screen px-4 md:px-8 pt-8 md:pt-16 pb-12 flex flex-col items-center justify-start">
      <div className="w-full max-w-5xl animate-reveal flex flex-col">
        <ProgressBar currentIndex={currentIndex} totalCases={totalCases} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start w-full">
          {/* Left Panel: The Case Dossier */}
          <div className="w-full">
            <CaseCard currentCase={currentCase} />
          </div>

          {/* Right Panel: Official Appraisal Form */}
          <div className="w-full lg:sticky lg:top-12">
            {gamePhase === 'guessing' ? (
              <GuessingPhase onLockIn={handleLockIn} />
            ) : (
              <RevealPhase 
                currentCase={currentCase} 
                latestGuess={guesses[guesses.length - 1]} 
                onNext={handleNext}
                isLast={currentIndex === totalCases - 1} 
              />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
