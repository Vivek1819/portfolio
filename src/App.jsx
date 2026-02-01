import { useState, useRef } from "react";
import Greeting from "./components/Greeting";
import SocialSidebar from "./components/SocialSidebar";
import Navbar from "./components/Navbar";
import SubtleSpaceBackground from "./components/SubtleSpaceBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import { motion } from "framer-motion";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  const [count, setCount] = useState(0);
  const [showGreeting, setShowGreeting] = useState(true);
  const mainContentRef = useRef(null);
  const handleGreetingComplete = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (mainContentRef.current) {
      mainContentRef.current.style.opacity = "0";
      mainContentRef.current.style.transform = "translateY(8px)";

      setTimeout(() => {
        setShowGreeting(false);

        mainContentRef.current.style.opacity = "1";
        mainContentRef.current.style.transform = "translateY(0)";
      }, 100);
    }
  };
  return (
    <>
      <SubtleSpaceBackground />
      {showGreeting && <Greeting onComplete={handleGreetingComplete} />}{" "}
      <div
        className={`fixed top-0 left-0 right-0 w-full px-2 sm:px-4 md:px-12 py-2 md:py-4 z-50 transition-opacity duration-500 bg-black/30 backdrop-blur-md ${
          !showGreeting ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Navbar />
      </div>
      <div
        ref={mainContentRef}
        className={`w-screen flex flex-col items-center justify-center transition-opacity duration-500 ${
          !showGreeting ? "opacity-100" : "opacity-0"
        }`}
        style={{
          marginRight: "0",
          overflowX: "hidden",
        }}
      >
        <motion.div
          key={showGreeting ? "greeting" : "hero"}
          initial={showGreeting ? false : { opacity: 0, y: 40 }}
          animate={showGreeting ? false : { opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 18,
            duration: 1,
          }}
          style={{ width: "100%" }}
        >
          <Hero />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          style={{ width: "100%" }}
        >
          <About />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
          viewport={{ once: true, amount: 0.2 }}
          style={{ width: "100%" }}
        >
          <TechStack />
        </motion.div>{" "}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
          viewport={{ once: true, amount: 0.2 }}
          style={{ width: "100%" }}
        >
          <Work />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 15,
            duration: 1.2,
          }}
          viewport={{ once: true, amount: 0.1 }}
          style={{ width: "100%" }}
        >
          <Projects />{" "}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            duration: 1.4,
          }}
          viewport={{ once: true, amount: 0.1 }}
          style={{ width: "100%" }}
        >
          <Contact />
        </motion.div>
      </div>
      <div
        className={`fixed bottom-0 right-0 px-4 md:px-8 hidden md:block transition-all duration-700 ease-out z-50 pointer-events-auto
        ${
          !showGreeting
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
        style={{
          transitionDelay: !showGreeting ? "400ms" : "0ms",
          transitionTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)",
        }}
      >
        <SocialSidebar />
      </div>
    </>
  );
}

export default App;
