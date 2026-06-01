"use client";
import { useEffect } from "react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

function TechStackBand() {
  const cardsRef = useRef([]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },

          x: index % 2 === 0 ? -120 : 120,
          y: 40,
          rotation: index % 2 === 0 ? -4 : 4,
          opacity: 0,
          duration: 0.2,
          ease: "power3.out",
          delay: index * 0.1,
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

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;

    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -250 : 250,
      behavior: "smooth",
    });
  };

  return (
    <div className=" mx-auto w-full max-w-7xl">
      <button
        className="
          grid
          grid-cols-1
          left-0
          top-1/2
          z-20
          -translate-y-1/2
          rounded-full
          border
          border-cyan-400/20
          bg-black/40
          p-2
          text-cyan-300
          backdrop-blur-xl
          transition-all
          hover:scale-110
          hover:border-cyan-400/50
          hover:bg-cyan-400/10
        "
      ></button>

      {/* Scroll Area */}
      <div
        ref={scrollRef}
        className="
  grid
  grid-cols-1
  md:grid-cols-2
  gap-6
  px-14
  py-6
        "
      >
        {techCategories.map((category, index) => (
          <div
            ref={(el) => (cardsRef.current[index] = el)}
            key={category.title}
            className={`
                
                w-76
              rounded-3xl
              border
              p-5
              backdrop-blur-xl
              transition-all
              duration-300
              hover:scale-[1.02]
              ${
                category.color === "cyan"
                  ? `
                    border-cyan-400/20
                    bg-cyan-400/5
                    hover:border-cyan-400/40
                    hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]
                  `
                  : `
                    border-fuchsia-400/20
                    bg-fuchsia-400/5
                    hover:border-fuchsia-400/40
                    hover:shadow-[0_0_30px_rgba(217,70,239,0.12)]
                  `
              }
            `}
          >
            {/* Heading */}
            <div className="mb-5 flex items-center gap-3">
              <div
                className={`
                  h-2
                  w-2
                  rounded-full
                  ${
                    category.color === "cyan"
                      ? "bg-cyan-300 shadow-[0_0_12px_#67e8f9]"
                      : "bg-fuchsia-300 shadow-[0_0_12px_#f0abfc]"
                  }
                `}
              />

              <h2
                className={`
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  ${
                    category.color === "cyan"
                      ? "text-cyan-200"
                      : "text-fuchsia-200"
                  }
                `}
              >
                {category.title}
              </h2>
            </div>

            {/* Tech Items */}
            <div className="flex flex-wrap gap-2">
              {category.tech.map((item) => (
                <div
                  key={item}
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-3
                    py-1.5
                    text-xs
                    text-zinc-200
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:bg-white/10
                    hover:scale-105
                  "
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        className="
          absolute
          right-0
          top-1/2
          z-20
          -translate-y-1/2
          rounded-full
          border
          border-fuchsia-400/20
          bg-black/40
          p-2
          text-fuchsia-300
          backdrop-blur-xl
          transition-all
          hover:scale-110
          hover:border-fuchsia-400/50
          hover:bg-fuchsia-400/10
        "
      ></button>
    </div>
  );
}

export default TechStackBand;
