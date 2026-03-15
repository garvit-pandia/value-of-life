import { GuessRecord, PatternResult } from '@/types'

export function getPattern(guesses: GuessRecord[]): PatternResult {
  // Exclude zero-payout cases from ratio calculations to avoid division by zero
  const validGuesses = guesses.filter(g => g.ratio !== null && isFinite(g.ratio as number))

  const mean = validGuesses.length > 0
    ? validGuesses.reduce((s, g) => s + (g.ratio as number), 0) / validGuesses.length
    : 1

  const biasLine =
    mean > 1.5
      ? `Across ${guesses.length} cases, you overestimated payouts by an average of ${mean.toFixed(1)}x.`
      : mean < 0.5
      ? `Across ${guesses.length} cases, you underestimated payouts by an average of ${(1 / mean).toFixed(1)}x.`
      : `Across ${guesses.length} cases, your guesses roughly matched what courts decided.`

  // For agreementLine, only use cases with known demographics and non-zero payout
  const demographicGuesses = validGuesses.filter(
    g => g.age !== null && g.gender !== 'Not recorded' && g.occupation !== 'Unknown' && g.occupation !== 'Not a specific individual'
  )

  let agreementLine = ''

  if (demographicGuesses.length > 0) {
    const closest = demographicGuesses.reduce((a, b) =>
      Math.abs((a.ratio as number) - 1) < Math.abs((b.ratio as number) - 1) ? a : b
    )
    agreementLine = `You agreed most closely with the court on: a ${closest.age}-year-old ${closest.gender.toLowerCase()} ${closest.occupation.toLowerCase()} in ${closest.country}.`
  } else {
    agreementLine = `Not enough demographic data to determine agreement pattern.`
  }

  return { biasLine, agreementLine }
}
