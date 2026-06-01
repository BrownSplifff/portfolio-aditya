"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroCard from "../../components/HeroCard";
import CurrentlyLearningCard from "../../components/CurrentlyLearningCard";
import ExpNumCard from "../../components/ExpNumCard";
import TechStackBand from "../../components/TechStackBand";
import ExperienceSection from "../../components/ExperienceSection";
import ProjectsSection from "../../components/ProjectsSection";

export default function HeroSection() {
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.from(headingRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      ref={headingRef}
      className="
      
      relative
      z-10
      flex
      flex-col
      items-center
      justify-center
      px-6
    "
    >
      <h1
        className="
        m-5
        font-bold
        text-xl
        tracking-[0.6em]
        text-cyan-300
        font-medium
      "
      >
        PORTFOLIO
      </h1>

      <div
        className="
        flex
        flex-wrap
        justify-center
        gap-6
      "
      >
        <HeroCard />
      </div>
      <div>
        <ExpNumCard />
      </div>
      <div
        className="
        flex
        
        justify-center
        gap-6
      "
      >
        <TechStackBand />
      </div>
      <div>
        <CurrentlyLearningCard />
      </div>
      <div>
        <ExperienceSection />
      </div>
      <div>
        <ProjectsSection />
      </div>
    </div>
  );
}
