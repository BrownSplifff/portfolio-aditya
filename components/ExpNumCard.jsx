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

  const numofproj = projects.length;
  const numoftech = technologies.length;
  const numofperproj = personalprojects.length;

  return (
    <div className="mt-10">
      <div className="flex ">
        <div
          className="
          m-4
            rounded-xl
            border border-cyan-400/20
            bg-black/30
            p-3
            text-center
            
            backdrop-blur-xl
            text-white
            hover:scale-105
            hover:border-cyan-400/40
            hover:bg-cyan-400/10
            transition
            duration-300
          "
        >
          <div className="text-zinc-300 tracking-wide">Production Projects</div>

          <div className="font-bold text-3xl text-cyan-300">{numofproj}</div>
        </div>

        <div
          className="
          m-4
            rounded-xl
            border border-fuchsia-400/20
            bg-black/30
            p-3
            text-center
            backdrop-blur-xl
            text-white
            hover:scale-105
            hover:border-fuchsia-400/40
            hover:bg-fuchsia-400/10
            transition
            duration-300
          "
        >
          <div className="text-zinc-300 tracking-wide">Technologies Used</div>

          <div className="font-bold text-3xl text-fuchsia-300">{numoftech}</div>
        </div>
        <div
          className="
          m-4
            rounded-xl
            border border-fuchsia-400/20
            bg-black/30
            p-3
            text-center
            backdrop-blur-xl
            text-white
            hover:scale-105
            hover:border-fuchsia-400/40
            hover:bg-fuchsia-400/10
            transition
            duration-300
          "
        >
          <div className="text-zinc-300 tracking-wide">Personal Projects</div>

          <div className="font-bold text-3xl text-fuchsia-300">
            {numofperproj}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpNumCard;
