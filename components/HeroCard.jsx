function HeroCard() {
  return (
    <div className="flex justify-center transition duration-300 hover:scale-[1.03]">
      <div
        className="
          relative
          w-150
          overflow-hidden
          rounded-2xl
          border border-cyan-400/20
          bg-black/30
          p-6
          backdrop-blur-xl
          shadow-[0_0_40px_rgba(0,255,255,0.08)]
        "
      >
        {/* Glow */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-cyan-400/10
            via-fuchsia-500/5
            to-transparent
            pointer-events-none
          "
        />

        {/* Top bar */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1
              className="
                text-2xl
                font-black
                tracking-wide
                text-white
              "
            >
              Aditya Pandey
            </h1>

            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              Frontend Developer
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="
            mb-5
            h-px
            w-full
            bg-gradient-to-r
            from-transparent
            via-cyan-400/50
            to-transparent
          "
        />

        {/* Content */}
        <p
          className="
            text-sm
            leading-7
            text-zinc-300
          "
        >
          Building clean interfaces, scalable apps, and currently diving into
          backend systems, AI engineering, and immersive web experiences.
        </p>

        {/* Bottom tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {["React", "Next.js", "GSAP", "Three.js"].map((tech) => (
            <span
              key={tech}
              className="
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/5
                px-3
                py-1
                text-xs
                text-blue-200
                backdrop-blur-md
              "
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Corner accents */}
        <div className="absolute left-0 top-0 h-16 w-16 border-l border-t border-cyan-400/40 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 h-16 w-16 border-b border-r border-fuchsia-400/30 rounded-br-2xl" />
      </div>
    </div>
  );
}

export default HeroCard;
