"use client";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

function ProjectsSection() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          x: index % 2 === 0 ? -80 : 80,
          y: 30,
          rotation: index % 2 === 0 ? -3 : 3,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
          delay: index * 0.12,
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: "AI Chatbot Interface",
      desc: "Realtime AI conversation interface with streaming responses, contextual rendering, and scalable frontend architecture.",
      stack: ["React", "Redux", "REST APIs", "Streaming UI"],
    },
    {
      title: "Legal Admin Dashboard",
      desc: "Dual-panel legal platform with protected routing, role-based access control, and scalable dashboard architecture.",
      stack: ["React", "JWT", "Redux", "Tailwind"],
    },
    {
      title: "Event Management Platform",
      desc: "Multi-role event platform with realtime notifications, protected routes, and dynamic event workflows.",
      stack: ["Socket.io", "JWT", "React", "REST APIs"],
      link: "",
    },
    {
      title: "Hotel Booking Web App",
      desc: "Responsive hotel booking frontend focused on reusable components and smooth booking experiences.",
      stack: ["React", "Tailwind", "JavaScript"],
    },
  ];

  return (
    <section className="relative z-10 mx-auto mt-20 sm:mt-20 w-full max-w-5xl px-0">
      <div className="mb-10 sm:mb-14 text-center">
        <p className="mb-3 text-[10px] sm:text-xs tracking-[0.5em] sm:tracking-[0.6em] text-cyan-300">
          ACTIVE DEPLOYMENTS
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
          Featured Projects
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
        {projects.map((project, index) => (
          <div
            ref={(el) => (cardsRef.current[index] = el)}
            key={project.title}
            className={`
              w-120
              relative overflow-hidden rounded-3xl border p-5 sm:p-6
              backdrop-blur-xl transition-all duration-500 hover:scale-[1.2]
              ${
                index % 2 === 0
                  ? "border-cyan-400/20 bg-cyan-400/[0.04] hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]"
                  : "border-fuchsia-400/20 bg-fuchsia-400/[0.04] hover:border-fuchsia-400/40 hover:shadow-[0_0_40px_rgba(217,70,239,0.08)]"
              }
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 mb-5 sm:mb-6">
              <div className="mb-3 flex items-center gap-3">
                <div
                  className={`h-2 w-2 flex-shrink-0 rounded-full ${
                    index % 2 === 0
                      ? "bg-cyan-300 shadow-[0_0_12px_#67e8f9]"
                      : "bg-fuchsia-300 shadow-[0_0_12px_#f0abfc]"
                  }`}
                />
                <p
                  className={`text-[10px] sm:text-xs uppercase tracking-[0.3em] ${
                    index % 2 === 0 ? "text-cyan-200" : "text-fuchsia-200"
                  }`}
                >
                  Deployment {index + 1}
                </p>
              </div>
              <h2 className="text-l sm:text-xl md:text-2xl font-bold text-white">
                {project.title}
              </h2>
            </div>

            <p className="relative z-10 text-sm leading-7 sm:leading-8 text-zinc-300">
              {project.desc}
            </p>

            <div className="relative z-10 mt-6 sm:mt-8 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <div
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-200 backdrop-blur-md"
                >
                  {tech}
                </div>
              ))}
            </div>

            <div className="absolute left-0 top-0 h-14 w-14 sm:h-16 sm:w-16 rounded-tl-3xl border-l border-t border-white/10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 h-14 w-14 sm:h-16 sm:w-16 rounded-br-3xl border-b border-r border-white/10 pointer-events-none" />
          </div>
        ))}

        {/* Bottom wide card */}
        <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-black/30 p-6 sm:p-8 backdrop-blur-xl sm:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/[0.03] via-fuchsia-400/[0.03] to-transparent pointer-events-none" />

          <div className="relative z-10">
            <p className="mb-2 sm:mb-3 text-[10px] sm:text-xs tracking-[0.5em] text-cyan-300">
              NEXT PHASE
            </p>
            <h2 className="mb-4 sm:mb-5 text-xl sm:text-xl md:text-2xl font-black text-white">
              Building Beyond Frontend
            </h2>
            <p className="max-w-4xl text-sm leading-8 sm:leading-9 text-zinc-300">
              Currently transitioning deeper into backend systems, scalable
              architecture, AI engineering, and immersive web experiences using
              Next.js, realtime communication systems, and advanced frontend
              animation pipelines.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
