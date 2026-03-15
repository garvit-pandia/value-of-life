import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black px-4 text-center">
      <div className="flex flex-col items-center gap-8">
        <p className="text-xs text-gray-500 tracking-widest uppercase">
          A REAL CASE. A REAL PAYOUT. YOUR INSTINCT.
        </p>
        <h1 className="text-4xl text-white font-bold">
          A life, reduced to a number.
        </h1>
        <p className="text-gray-400 max-w-sm">
          Guess the legal settlement. Then find out what your guesses reveal.
        </p>
        <Link 
          href="/play" 
          className="mt-4 border border-white text-white px-8 py-3 text-lg hover:bg-white hover:text-black transition-colors"
        >
          Find Out
        </Link>
      </div>
    </main>
  );
}
