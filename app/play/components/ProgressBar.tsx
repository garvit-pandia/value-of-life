export function ProgressBar({ currentIndex, totalCases }: { currentIndex: number, totalCases: number }) {
  return (
    <div className="flex justify-between items-end mb-8 border-b-2 border-parchment/60 pb-2">
      <div className="text-[11px] text-parchment/60 font-mono tracking-widest uppercase">
        ARCHIVE VOL. I
      </div>
      <div className="text-[12px] text-parchment font-mono font-bold tracking-widest bg-parchment/10 px-2 py-1">
        FILE {currentIndex + 1} / {totalCases}
      </div>
    </div>
  )
}
