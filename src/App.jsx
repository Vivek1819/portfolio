import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Greeting from './components/Greeting'
import SocialSidebar from './components/SocialSidebar'
import Navbar from './components/Navbar'

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
      }, 100)    }
  }
    return (
    <>
      
      {showGreeting && <Greeting onComplete={handleGreetingComplete} />}
        <div className={`fixed top-0 left-0 right-0 w-full px-12 py-6 z-50 transition-opacity duration-500 ${!showGreeting ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
      </div>
        <div 
        ref={mainContentRef} 
        className={`max-w-7xl mx-auto p-8 pt-24 text-center transition-all duration-700 ease-out
          ${!showGreeting ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'}`}
        style={{
          transitionDelay: !showGreeting ? '200ms' : '0ms',
          transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)' 
        }}
      >
        
      </div>      <div 
        className={`fixed bottom-0 right-0 transition-all duration-700 ease-out
        ${!showGreeting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{
          transitionDelay: !showGreeting ? '400ms' : '0ms',
          transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)'
        }}
      >
        <SocialSidebar />
      </div>
    </>
  )
}

export default App
