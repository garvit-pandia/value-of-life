export function formatINR(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} crore`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} lakh`
  if (amount === 0) return `₹0`
  return `₹${amount.toLocaleString('en-IN')}`
}

export function parseLakhCrore(value: string, unit: 'lakh' | 'crore'): number {
  const num = parseFloat(value)
  if (isNaN(num)) return 0
  return unit === 'crore' ? num * 10000000 : num * 100000
}
