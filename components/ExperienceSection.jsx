function ExperienceSection() {
  const experiences = [
    {
      year: "2026 March — PRESENT",
      company: "Kindlebit Solutions",
      role: "Frontend Developer",
      work: [
        "Building AI chatbot interfaces with real-time streaming conversation UI",
        "Developing a dual-panel legal platform for a US-based law firm",
        "Implementing JWT authentication and protected routing systems",
        "Integrating REST APIs with Redux-based state management",
        "Creating reusable scalable component architectures using Tailwind CSS",
        "Optimizing frontend performance with lazy loading and code splitting",
      ],
      stack: ["React", "Redux", "Tailwind", "JWT", "REST APIs", "Socket.io"],
    },
  ];

  return (
    <section className="relative z-10 mx-auto mt-20 sm:mt-24 w-full max-w-5xl px-0">
      <div className="mb-8 sm:mb-10 text-center">
        <p className="mb-2 text-[10px] sm:text-xs tracking-[0.5em] text-cyan-300">
          SYSTEM LOGS
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
          Experience
        </h1>
      </div>

      <div className="grid gap-6 sm:gap-8">
        {experiences.map((exp) => (
          <div
            key={exp.company}
            className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-black/30 p-5 sm:p-8 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_0_50px_rgba(34,211,238,0.08)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-fuchsia-500/5 to-transparent pointer-events-none" />

            <div className="relative z-10 mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-1 text-[10px] sm:text-xs tracking-[0.3em] text-cyan-300">
                  {exp.year}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {exp.company}
                </h2>
                <p className="mt-1 text-sm sm:text-base text-zinc-400">
                  {exp.role}
                </p>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-cyan-200 backdrop-blur-md">
                <div className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
                Present
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {exp.work.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 sm:p-4 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.03]"
                >
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
                  <p className="text-sm leading-7 text-zinc-300">{item}</p>
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
              {exp.stack.map((tech) => (
                <div
                  key={tech}
                  className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs text-fuchsia-200 backdrop-blur-md"
                >
                  {tech}
                </div>
              ))}
            </div>

            <div className="absolute left-0 top-0 h-16 w-16 rounded-tl-3xl border-l border-t border-cyan-400/30 pointer-events-none" />
            <div className="absolute bottom-0 right-0 h-16 w-16 rounded-br-3xl border-b border-r border-fuchsia-400/20 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
