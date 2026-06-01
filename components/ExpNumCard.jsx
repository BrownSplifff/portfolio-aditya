"use client";

import { useState } from "react";

function ExpNumCard() {
  const [activeModal, setActiveModal] = useState(null);

  const projects = ["AI Chatbot Interface", "Legal Admin Dashboard"];

  const personalProjects = [
    "Event Management Web Application",
    "Hotel Booking Web App",
  ];

  const technologies = [
    "React.js",
    "Redux",
    "Tailwind CSS",
    "Firebase",
    "Socket.io",
    "JWT Auth",
    "Next.js",
    "REST APIs",
    "Git",
    "Postman",
    "JavaScript",
    "Python",
  ];

  const stats = [
    {
      label: "Production Projects",
      value: projects.length,
      color: "cyan",
      modal: "production",
    },

    {
      label: "Technologies Used",
      value: technologies.length,
      color: "fuchsia",
    },

    {
      label: "Personal Projects",
      value: personalProjects.length,
      color: "fuchsia",
      modal: "personal",
    },
  ];

  const modalProjects =
    activeModal === "production" ? projects : personalProjects;

  const modalTheme =
    activeModal === "production"
      ? {
          accent: "cyan",
          title: "Production Systems",
          glow: "shadow-[0_0_60px_rgba(34,211,238,0.08)]",
          border: "border-cyan-400/20",
          text: "text-cyan-300",
          hover: "hover:bg-cyan-400/[0.05]",
          rowBorder: "hover:border-cyan-400/30",
          accentLine:
            "bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent",
        }
      : {
          accent: "fuchsia",
          title: "Personal Builds",
          glow: "shadow-[0_0_60px_rgba(217,70,239,0.08)]",
          border: "border-fuchsia-400/20",
          text: "text-fuchsia-300",
          hover: "hover:bg-fuchsia-400/[0.05]",
          rowBorder: "hover:border-fuchsia-400/30",
          accentLine:
            "bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent",
        };

  return (
    <div className="relative w-full max-w-xl mt-8 sm:mt-10 px-0">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map(({ label, value, color, modal }) => (
          <div
            key={label}
            onMouseEnter={() => {
              if (modal) setActiveModal(modal);
            }}
            onMouseLeave={() => {
              if (modal) setActiveModal(null);
            }}
            className={`
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              bg-black/30
              p-3
              sm:p-4
              text-center
              text-white
              backdrop-blur-xl
              transition-all
              duration-300
              hover:scale-105
              ${modal ? "cursor-pointer" : ""}
              ${
                color === "cyan"
                  ? `
                    border-cyan-400/20
                    hover:border-cyan-400/40
                    hover:bg-cyan-400/10
                    hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]
                  `
                  : `
                    border-fuchsia-400/20
                    hover:border-fuchsia-400/40
                    hover:bg-fuchsia-400/10
                    hover:shadow-[0_0_30px_rgba(217,70,239,0.12)]
                  `
              }
            `}
          >
            {/* Glow */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-white/[0.03]
                via-transparent
                to-transparent
                pointer-events-none
              "
            />

            {/* Label */}
            <div
              className="
                relative
                z-10
                text-zinc-300
                tracking-wide
                text-[10px]
                sm:text-xs
                leading-tight
                mb-2
                uppercase
              "
            >
              {label}
            </div>

            {/* Value */}
            <div
              className={`
                relative
                z-10
                font-black
                text-2xl
                sm:text-3xl
                ${color === "cyan" ? "text-cyan-300" : "text-fuchsia-300"}
              `}
            >
              {value}
            </div>

            {/* Bottom Accent */}
            <div
              className={`
                absolute
                bottom-0
                left-0
                h-px
                w-full
                ${
                  color === "cyan"
                    ? "bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
                    : "bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent"
                }
              `}
            />

            {/* Corner Accent */}
            <div
              className={`
                absolute
                left-0
                top-0
                h-10
                w-10
                rounded-tl-2xl
                border-l
                border-t
                ${
                  color === "cyan"
                    ? "border-cyan-400/20"
                    : "border-fuchsia-400/20"
                }
              `}
            />
          </div>
        ))}
      </div>

      {/* SIDE MODAL */}
      {activeModal && (
        <div
          className={`
            absolute
            top-0
            
            z-50
            w-[290px]
            rounded-3xl
            border
            bg-[#050a10]/95
            p-5
            backdrop-blur-2xl
            transition-all
            duration-300
            ${modalTheme.border}
            ${modalTheme.glow}
            ${activeModal === "production" ? "left-[-320px]" : "right-[-320px]"}
          `}
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-fuchsia-500/5 to-transparent pointer-events-none rounded-3xl" />

          {/* Header */}
          <div className="relative z-10 mb-5">
            <p
              className={`
                mb-2
                text-[10px]
                tracking-[0.4em]
                uppercase
                ${modalTheme.text}
              `}
            >
              {modalTheme.title}
            </p>

            <h2 className="text-2xl font-black text-white">Projects</h2>
          </div>

          {/* Project Rows */}
          <div className="relative z-10 grid gap-3">
            {modalProjects.map((project) => (
              <div
                key={project}
                className={`
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-4
                  text-sm
                  text-zinc-200
                  transition-all
                  duration-300
                  hover:translate-x-1
                  ${modalTheme.hover}
                  ${modalTheme.rowBorder}
                `}
              >
                {project}
              </div>
            ))}
          </div>

          {/* Accent */}
          <div
            className={`
              absolute
              bottom-0
              left-0
              h-px
              w-full
              ${modalTheme.accentLine}
            `}
          />
        </div>
      )}
    </div>
  );
}

export default ExpNumCard;
