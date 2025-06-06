import { useState, useEffect, useRef } from "react";

const firstWordAnimation = `
@keyframes firstWordAppear {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
`;

const Greeting = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(true);

  const greetings = [
    { text: "Hello", id: 1 },
    { text: "Bonjour", id: 2 },
    { text: "नमस्ते", id: 3 },
    { text: "Ciao", id: 4 },
    { text: "你好", id: 5 },
    { text: "Olá", id: 6 },
    { text: "こんにちは", id: 7 },
    { text: "Hola", id: 8 },
  ];
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setCurrentIndex(0);
    }, 100);

    const firstWordDelay = setTimeout(() => {
      setCurrentIndex(1);
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next >= greetings.length) {
            clearInterval(interval);
            setTimeout(() => {
              setIsVisible(false);
              setTimeout(onComplete, 400);
            }, 250);
            return prev;
          }
          return next;
        });
      }, 175);

      return () => clearInterval(interval);
    }, 1000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(firstWordDelay);
    };
  }, []);
  const currentWord =
    currentIndex === -1 ? { text: "", id: 0 } : greetings[currentIndex];
  return (
    <>
      <style>{firstWordAnimation}</style>
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center z-50 p-8 overflow-hidden
          ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{
          transition: "opacity 0.5s ease-in-out",
          backgroundColor: "#0f0f0f",
        }}
      >
        <div className="p-4 rounded-lg max-w-[95%] min-h-[200px] flex items-center justify-center">
          {" "}
          <h1
            key={currentWord.id}
            className="m-0 px-4 py-2 inline-block relative antialiased leading-tight"
            style={{
              fontFamily: "'Neue Montreal', sans-serif",
              fontSize: "4.5rem",
              color: "white",
              animation:
                currentIndex === 0 ? "firstWordAppear 0.4s ease-out" : "none",
              textShadow:
                "0 0 1px rgba(255,255,255,0.05), 0 0 2px rgba(255,255,255,0.05)",
            }}
          >
            {currentWord.text}
          </h1>{" "}
        </div>
      </div>
    </>
  );
};

export default Greeting;
