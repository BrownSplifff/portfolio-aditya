"use client";

function ProjectModal({ activeProject, setActiveProject }) {
  if (!activeProject) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        p-4
        sm:p-6
      "
      onClick={() => setActiveProject(null)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

      {/* Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          z-10
          w-full
          max-w-5xl
          overflow-hidden
          rounded-3xl
          border
          border-cyan-400/20
          bg-[#050a10]/95
          backdrop-blur-2xl
          shadow-[0_0_80px_rgba(34,211,238,0.08)]
        "
      >
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-fuchsia-500/5 to-transparent pointer-events-none" />

        {/* Corner Accents */}
        <div className="absolute left-0 top-0 h-20 w-20 rounded-tl-3xl border-l border-t border-cyan-400/30" />
        <div className="absolute bottom-0 right-0 h-20 w-20 rounded-br-3xl border-b border-r border-fuchsia-400/20" />

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between p-6 sm:p-8">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.45em] text-cyan-300">
              DEPLOYMENT OVERVIEW
            </p>

            <h2 className="text-3xl sm:text-5xl font-black text-white">
              {activeProject.title}
            </h2>
          </div>

          {/* Close */}
          <button
            onClick={() => setActiveProject(null)}
            className="
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              p-3
              text-zinc-400
              transition-all
              duration-300
              hover:bg-white/[0.08]
              hover:text-white
            "
          >
            ✕
          </button>
        </div>

        {/* Divider */}
        <div className="mx-8 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

        {/* BODY */}
        <div className="relative z-10 p-6 sm:p-8 space-y-6">
          {/* ROW 1 — IMAGE */}
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-black/40
            "
          >
            <img
              src={activeProject.image}
              alt={activeProject.title}
              className="
                h-[260px]
                w-full
                object-cover
              "
            />
          </div>

          {/* ROW 2 — DESCRIPTION */}
          <div
            className="
              rounded-2xl
              border
              border-cyan-400/10
              bg-white/[0.03]
              p-6
            "
          >
            <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-cyan-300">
              SYSTEM DETAILS
            </p>

            <p className="text-sm leading-8 text-zinc-300">
              {activeProject.longDesc}
            </p>
          </div>

          {/* ROW 3 */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Stack */}
            <div
              className="
                rounded-2xl
                border
                border-fuchsia-400/10
                bg-white/[0.03]
                p-6
              "
            >
              <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-fuchsia-300">
                TECH STACK
              </p>

              <div className="flex flex-wrap gap-2">
                {activeProject.stack.map((tech) => (
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
                    "
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div
              className="
                rounded-2xl
                border
                border-cyan-400/10
                bg-white/[0.03]
                p-6
                flex
                flex-col
                justify-center
                gap-4
              "
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">
                ACTIONS
              </p>

              <button
                onClick={() => window.open(activeProject.link, "_blank")}
                className="
                  rounded-2xl
                  border
                  border-cyan-400/20
                  bg-cyan-400/10
                  px-5
                  py-4
                  text-sm
                  font-semibold
                  text-cyan-200
                  transition-all
                  duration-300
                  hover:bg-cyan-400/20
                  hover:border-cyan-400/40
                "
              >
                Launch Deployment
              </button>

              <button
                onClick={() => window.open(activeProject.github, "_blank")}
                className="
                  rounded-2xl
                  border
                  border-fuchsia-400/20
                  bg-fuchsia-400/10
                  px-5
                  py-4
                  text-sm
                  font-semibold
                  text-fuchsia-200
                  transition-all
                  duration-300
                  hover:bg-fuchsia-400/20
                  hover:border-fuchsia-400/40
                "
              >
                View Source
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
