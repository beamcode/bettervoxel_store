function LetterSplitter({ text }: { text: string }) {
  return text.split(" ").map((word: string, wordIndex: number, arr: string | string[]) => (
    <span key={wordIndex} className="relative inline-block">
      <span className="inline-block translate-y-full">{word}</span>
      {wordIndex < arr.length - 1 ? <span>&nbsp;</span> : ""}
    </span>
  ))
}

const Hero2 = () => {
  return (
    <div className="grid gap-4">
      <h1
        // data-animate="[&>span>span]:to:y-0|stagger-0.05|ease-power2.inOut"
        className="max-w-xs text-5xl font-black tracking-tight md:max-w-md md:text-6xl xl:text-6xl"
      >
        <LetterSplitter text="Utility-based animations for the web." />
      </h1>
      <div className="flex flex-wrap gap-4">
        <div className="button bg-gray-100 font-mono text-black dark:bg-neutral-900 dark:text-white">
          npm i glazejs
        </div>
        <a
          href="/documentation"
          className="button bg-amber-300 text-amber-900 hover:bg-amber-400 hover:text-white"
        >
          Docs
        </a>
      </div>
    </div>
  )
}

export default Hero2
