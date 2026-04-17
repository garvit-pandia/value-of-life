# The Price of a Life

An interactive, research-driven experience exploring the systemic biases in how legal systems assign monetary value to human lives.

## Overview

"The Price of a Life" is a Next.js application built in the **Bureaucratic Noir** aesthetic — cold, institutional, and deliberately uncomfortable. It challenges users to estimate the legal settlements of actual wrongful death court cases. By comparing user guesses with real-world judicial verdicts, the application reveals underlying patterns and disparities in human valuation.

## Key Features

- **Bite-Sized Rounds**: Play in rounds of 5 cases at a time. Return to analyze more from the archive whenever you want.
- **Open Dossier Layout**: A two-column desktop layout keeps case details visible alongside the appraisal form — no scrolling required.
- **Instinct vs. Tribunal**: Estimate payouts in Lakhs/Crores and instantly compare them with actual court-ordered settlements.
- **Pattern Recognition Engine**: Analyzes your guessing patterns to identify systemic overestimation or underestimation biases.
- **The Empty Chair (Meta-Game)**: After evaluating others, the system turns the lens on *you* — a mandatory self-appraisal that calculates your own actuarial value.
- **Generative Audio Soundscape**: A Web Audio API–driven ambient interrogation hum that dynamically intensifies based on your guessing accuracy.
- **Mobile-First Responsive Design**: Fully usable on smartphones with properly sized touch targets, stacking layouts, and scaled typography.
- **Bureaucratic Noir Aesthetic**: Parchment-on-black dossier styling, stamp-red accents, redaction animations, and CRT noise overlays.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Context + Session Storage
- **Audio**: Web Audio API (generative soundscape)

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/garvit-pandia/value-of-life-v2.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Navigate to**: `http://localhost:3000`

## License

This project is for research and educational purposes.
