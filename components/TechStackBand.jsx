"use client";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

function TechStackBand() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          x: index % 2 === 0 ? -80 : 80,
          y: 30,
          rotation: index % 2 === 0 ? -3 : 3,
          opacity: 0,
          duration: 0.3,
          ease: "power3.out",
          delay: index * 0.08,
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const techCategories = [
    {
      title: "Frontend",
      color: "cyan",
      tech: [
        "React",
        "Next.js",
        "Redux",
        "Tailwind CSS",
        "GSAP",
        "Three.js",
        "Responsive UI",
        "Component Architecture",
      ],
    },
    {
      title: "Backend & APIs",
      color: "fuchsia",
      tech: [
        "REST APIs",
        "Firebase",
        "JWT Authentication",
        "API Integration",
        "Protected Routes",
      ],
    },
    {
      title: "Realtime Systems",
      color: "cyan",
      tech: [
        "Socket.io",
        "Streaming UI",
        "Realtime Notifications",
        "WebSocket Communication",
      ],
    },
    {
      title: "Tools & Workflow",
      color: "fuchsia",
      tech: ["Git", "GitHub", "Postman", "Vercel", "Render", "VS Code"],
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-16 sm:mt-20">
      <div className="mb-8 sm:mb-10 text-center">
        <p className="mb-2 text-[10px] sm:text-xs tracking-[0.5em] text-cyan-300">
          TECH ARSENAL
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Tech Stack
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-0">
        {techCategories.map((category, index) => (
          <div
            ref={(el) => (cardsRef.current[index] = el)}
            key={category.title}
            className={`
              rounded-3xl border p-5 backdrop-blur-xl
              transition-all duration-300 hover:scale-[1.02]
              ${
                category.color === "cyan"
                  ? "border-cyan-400/20 bg-cyan-400/5 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]"
                  : "border-fuchsia-400/20 bg-fuchsia-400/5 hover:border-fuchsia-400/40 hover:shadow-[0_0_30px_rgba(217,70,239,0.12)]"
              }
            `}
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className={`h-2 w-2 rounded-full flex-shrink-0 ${
                  category.color === "cyan"
                    ? "bg-cyan-300 shadow-[0_0_12px_#67e8f9]"
                    : "bg-fuchsia-300 shadow-[0_0_12px_#f0abfc]"
                }`}
              />
              <h2
                className={`text-xs font-bold uppercase tracking-[0.25em] ${
                  category.color === "cyan"
                    ? "text-cyan-200"
                    : "text-fuchsia-200"
                }`}
              >
                {category.title}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.tech.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:scale-105"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechStackBand;
