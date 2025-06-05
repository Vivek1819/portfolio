import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Greeting from './components/Greeting'

function App() {
  const [count, setCount] = useState(0)
  const [showGreeting, setShowGreeting] = useState(true)
  const mainContentRef = useRef(null)

  const handleGreetingComplete = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    
    if (mainContentRef.current) {
      mainContentRef.current.style.opacity = '0'
      mainContentRef.current.style.transform = 'translateY(8px)'
      
      setTimeout(() => {
        setShowGreeting(false)
        
        mainContentRef.current.style.opacity = '1'
        mainContentRef.current.style.transform = 'translateY(0)'
      }, 100)
    }
  }

  return (
    <>
      {showGreeting && <Greeting onComplete={handleGreetingComplete} />}
      
      <div 
        ref={mainContentRef} 
        className={`max-w-7xl mx-auto p-8 text-center transition-all duration-700 ease-out
          ${!showGreeting ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'}`}
        style={{
          transitionDelay: !showGreeting ? '200ms' : '0ms',
          transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)' 
        }}
      >
        <div>
          <a href="https://vite.dev" target="_blank" className="inline-block">
            <img src={viteLogo} className="h-24 p-6 hover:drop-shadow-[0_0_2em_rgba(100,108,255,0.67)] transition-all duration-300" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="inline-block">
            <img src={reactLogo} className="h-24 p-6 hover:drop-shadow-[0_0_2em_rgba(97,218,251,0.67)] motion-safe:animate-[spin_20s_linear_infinite] transition-all duration-300" alt="React logo" />
          </a>
        </div>
        <h1 className="text-5xl font-bold leading-tight mt-6">Vite + React</h1>
        <div className="p-8">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="rounded-lg border border-transparent px-5 py-2.5 text-base font-medium bg-gray-800 hover:border-indigo-400 transition-colors duration-300"
          >
            count is {count}
          </button>
          <p className="mt-4">
            Edit <code className="font-mono bg-gray-800 p-1 rounded">src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="text-gray-400">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  )
}

export default App
