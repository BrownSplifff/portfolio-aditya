function ExpNumCard() {
  const projects = ["AI Chatbot Interface", "Legal Admin Dashboard"];
  const personalprojects = [
    "Event Management Web Application",
    "Hotel Booking Web App",
    "Portfolio",
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
    { label: "Production Projects", value: projects.length, color: "cyan" },
    {
      label: "Technologies Used",
      value: technologies.length,
      color: "fuchsia",
    },
    {
      label: "Personal Projects",
      value: personalprojects.length,
      color: "fuchsia",
    },
  ];

  return (
    <div className="w-full max-w-xl mt-8 sm:mt-10 px-0">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map(({ label, value, color }) => (
          <div
            key={label}
            className={`
              rounded-xl border bg-black/30 p-3 sm:p-4
              text-center backdrop-blur-xl text-white
              hover:scale-105 transition duration-300
              ${
                color === "cyan"
                  ? "border-cyan-400/20 hover:border-cyan-400/40 hover:bg-cyan-400/10"
                  : "border-fuchsia-400/20 hover:border-fuchsia-400/40 hover:bg-fuchsia-400/10"
              }
            `}
          >
            <div className="text-zinc-300 tracking-wide text-[10px] sm:text-xs leading-tight mb-1">
              {label}
            </div>
            <div
              className={`font-bold text-2xl sm:text-3xl ${
                color === "cyan" ? "text-cyan-300" : "text-fuchsia-300"
              }`}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpNumCard;
