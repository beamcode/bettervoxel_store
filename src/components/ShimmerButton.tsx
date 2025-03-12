export default function SimmerButton() {
  return (
    <button
      className="group relative flex cursor-pointer justify-center overflow-hidden whitespace-nowrap px-6 py-4 text-white transition-all duration-300 hover:scale-105"
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": "#ffffff",
          "--radius": "10px",
          "--speed": "1.5s",
          "--cut": "0.2em",
          "--bg": "radial-gradient(ellipse 80% 50% at 50% 120%,rgba(62, 61, 117),rgba(18, 18, 38))",
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 overflow-hidden rounded-[var(--radius)] hover:shadow-[0_0_40px_8px_rgba(62,61,117,0.7)]">
        <div className="rotate-gradient absolute inset-[-100%] animate-spinLinear">
          <div
            className="absolute inset-0"
            style={{
              background:
                "conic-gradient(from calc(270deg - (var(--spread) * 0.5)), transparent 0%, hsl(30 100% 50% / 1)  var(--spread), transparent var(--spread))",
            }}
          ></div>
        </div>
      </div>
      <div className="absolute inset-[var(--cut)] overflow-hidden rounded-[var(--radius)] border-2 border-transparent bg-default">
        <div className="relative size-full">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-400 transition duration-500 group-hover:opacity-0" />
        </div>
      </div>
      <span className="relative z-10 font-sans text-base leading-none text-white">Download</span>
    </button>
  )
}
