import { useEffect, useState } from "react";

export const SECTIONS = [
  { id: "hero", label: "LAUNCH" },
  { id: "about", label: "ABOUT" },
  { id: "work", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "tech", label: "TECH" },
  { id: "contact", label: "CONTACT" },
];

/* Returns the id of the section currently under the upper third of the viewport,
   plus whether the page has been scrolled at all. */
export const useActiveSection = () => {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
      setScrolled(window.scrollY > 40);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { active, scrolled };
};
