function ExperienceSection() {
  const experiences = [
    {
      year: "2026 — PRESENT",
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
    <section className="relative z-10 mx-auto mt-24 w-full max-w-6xl px-6">
      {/* Heading */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-xs tracking-[0.5em] text-cyan-300">
          SYSTEM LOGS
        </p>

        <h1 className="text-4xl font-black text-white md:text-5xl">
          Experience
        </h1>
      </div>

      {/* Experience Cards */}
      <div className="grid gap-8">
        {experiences.map((exp) => (
          <div
            key={exp.company}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-cyan-400/20
              bg-black/30
              p-8
              backdrop-blur-xl
              transition-all
              duration-500
              hover:border-cyan-400/40
              hover:shadow-[0_0_50px_rgba(34,211,238,0.08)]
            "
          >
            {/* Glow */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-cyan-400/5
                via-fuchsia-500/5
                to-transparent
                pointer-events-none
              "
            />

            {/* Header */}
            <div className="relative z-10 mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-2 text-xs tracking-[0.3em] text-cyan-300">
                  {exp.year}
                </p>

                <h2 className="text-3xl font-bold text-white">{exp.company}</h2>

                <p className="mt-1 text-zinc-400">{exp.role}</p>
              </div>

              {/* Status */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-cyan-400/20
                  bg-cyan-400/5
                  px-4
                  py-2
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-cyan-200
                  backdrop-blur-md
                "
              >
                <div className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
                Active
              </div>
            </div>

            {/* Work */}
            <div className="relative z-10 grid gap-4">
              {exp.work.map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    gap-3
                    rounded-2xl
                    border
                    border-white/5
                    bg-white/[0.03]
                    p-4
                    transition-all
                    duration-300
                    hover:border-cyan-400/20
                    hover:bg-cyan-400/[0.03]
                  "
                >
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />

                  <p className="text-sm leading-7 text-zinc-300">{item}</p>
                </div>
              ))}
            </div>

            {/* Stack */}
            <div className="relative z-10 mt-8 flex flex-wrap gap-3">
              {exp.stack.map((tech) => (
                <div
                  key={tech}
                  className="
                    rounded-full
                    border
                    border-fuchsia-400/20
                    bg-fuchsia-400/5
                    px-4
                    py-2
                    text-xs
                    text-fuchsia-200
                    backdrop-blur-md
                  "
                >
                  {tech}
                </div>
              ))}
            </div>

            {/* Corner Accents */}
            <div className="absolute left-0 top-0 h-20 w-20 rounded-tl-3xl border-l border-t border-cyan-400/30" />
            <div className="absolute bottom-0 right-0 h-20 w-20 rounded-br-3xl border-b border-r border-fuchsia-400/20" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
