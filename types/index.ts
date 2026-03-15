export interface Case {
  id: string
  country: string
  countryCode: string
  year: number
  causeOfDeath: string
  occupation: string
  age: number | null
  gender: "Male" | "Female" | "Not recorded"
  familySituation: string
  actualPayoutINR: number
  methodologyNote: string
  sourceURL: string
}

export interface GuessRecord {
  caseId: string
  guessedAmount: number
  actualAmount: number
  ratio: number | null
  country: string
  occupation: string
  age: number | null
  gender: string
}

export interface PatternResult {
  biasLine: string
  agreementLine: string
}
