import { useState, useRef } from "react";
import Greeting from "./components/Greeting";
import SocialSidebar from "./components/SocialSidebar";
import Navbar from "./components/Navbar";
import SubtleSpaceBackground from "./components/SubtleSpaceBackground";
import Hero from "./components/Hero";
import About from "./components/About";

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
  };  return (
    <>
      <SubtleSpaceBackground />
      {showGreeting && <Greeting onComplete={handleGreetingComplete} />}      <div
        className={`fixed top-5 left-2 right-0 w-full px-12 py-4 z-50 transition-opacity duration-500 ${
          !showGreeting ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Navbar />
      </div><div
        ref={mainContentRef}
        className={`w-full transition-opacity duration-500 ${
          !showGreeting ? "opacity-100" : "opacity-0"
        }`}
        style={{ marginRight: "calc(var(--sidebar-width, 100px))" }}
      >
        <Hero />
        <About />
      </div>

      <div
        className={`fixed bottom-0 right-0 px-8 transition-all duration-700 ease-out z-50 pointer-events-auto
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
