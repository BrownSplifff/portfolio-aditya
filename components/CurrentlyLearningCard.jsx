function CurrentlyLearningCard() {
  const currentlyLearning = [
    {
      title: "System Design",
      desc: "Scalable architectures, distributed systems, and infrastructure thinking.",
    },
    {
      title: "Backend Architecture",
      desc: "Server-side patterns, APIs, authentication flows, and application structure.",
    },
    {
      title: "AI/ML Fundamentals",
      desc: "Neural networks, model workflows, inference pipelines, and AI systems.",
    },
    {
      title: "API Design",
      desc: "REST principles, scalable integrations, and structured data communication.",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-black/30 p-5 sm:p-6 backdrop-blur-xl shadow-[0_0_35px_rgba(0,255,255,0.06)] mt-16 sm:mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-fuchsia-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10 mb-5 sm:mb-6">
        <p className="mb-2 text-[10px] sm:text-xs tracking-[0.5em] text-cyan-300">
          CURRENT EXPLORATION
        </p>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-white">
          Learning Systems
        </h1>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {currentlyLearning.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl border border-cyan-400/10 bg-white/[0.03] p-4 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/30 hover:bg-cyan-400/[0.05] hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]"
          >
            <div className="mb-2 flex items-center gap-3">
              <div className="h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                {item.title}
              </h2>
            </div>
            <p className="pl-5 text-sm leading-7 text-zinc-400">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute left-0 top-0 h-14 w-14 sm:h-16 sm:w-16 rounded-tl-3xl border-l border-t border-cyan-400/30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-14 w-14 sm:h-16 sm:w-16 rounded-br-3xl border-b border-r border-fuchsia-400/20 pointer-events-none" />
    </div>
  );
}

export default CurrentlyLearningCard;
