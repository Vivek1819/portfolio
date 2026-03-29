import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  return (
    <div className="relative w-full py-40 overflow-hidden" id="contact">
      <div className="px-4 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-start">
        
        {/* Left Area - Identity */}
        <div className="lg:w-1/2 flex flex-col gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="micro-text text-supernova flex items-center gap-4"
          >
            05 <span className="w-12 h-px bg-supernova/30"></span> INITIATE CONNECTION
          </motion.div>

          <h2 className="celestial-heading text-7xl md:text-8xl xl:text-[10rem] text-starlight leading-[0.8] tracking-tighter">
            THE<br />
            <span className="text-supernova">UNIVERSE</span><br />
            AWAITS.
          </h2>

          <div className="mt-12 flex flex-col gap-10">
            <div className="flex items-center gap-8 group cursor-pointer" onClick={() => window.location.href = "mailto:vivekhipparkar@gmail.com"}>
               <div className="w-16 h-16 rounded-full border border-starlight/10 flex items-center justify-center group-hover:border-supernova transition-all duration-500 scale-100 group-hover:scale-110 group-hover:bg-supernova/10">
                  <span className="text-2xl">@</span>
               </div>
               <div>
                  <div className="micro-text mb-2 text-starlight/40 font-bold group-hover:text-supernova transition-colors">DIRECT FREQUENCY</div>
                  <div className="font-sans text-xl text-starlight/80 tracking-wide text-glow-starlight">vivekhipparkar@gmail.com</div>
               </div>
            </div>

            <div className="flex items-center gap-8 group cursor-pointer" onClick={() => window.open("https://linkedin.com/in/vivek-hipparkar", "_blank")}>
               <div className="w-16 h-16 rounded-full border border-starlight/10 flex items-center justify-center group-hover:border-supernova transition-all duration-500 scale-100 group-hover:scale-110 group-hover:bg-supernova/10">
                  <span className="text-2xl">in</span>
               </div>
               <div>
                  <div className="micro-text mb-2 text-starlight/40 font-bold group-hover:text-supernova transition-colors">THE NEXUS</div>
                  <div className="font-sans text-xl text-starlight/80 tracking-wide text-glow-starlight">/in/vivek-hipparkar</div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Area - Form */}
        <div className="lg:w-1/2 w-full cosmic-glass p-12 md:p-16 rounded-[3rem] relative z-10 hover-lens">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 group">
              <label className="micro-text text-starlight/30 group-focus-within:text-supernova transition-colors">YOUR DESIGNATION</label>
              <input
                type="text"
                required
                className="w-full bg-transparent border-b border-starlight/10 py-4 font-sans text-xl text-starlight focus:border-supernova focus:outline-none transition-all duration-500 placeholder:text-starlight/10"
                placeholder="Enter Name..."
              />
            </div>

            <div className="flex flex-col gap-2 group">
              <label className="micro-text text-starlight/30 group-focus-within:text-supernova transition-colors">COMM CHANNEL</label>
              <input
                type="email"
                required
                className="w-full bg-transparent border-b border-starlight/10 py-4 font-sans text-xl text-starlight focus:border-supernova focus:outline-none transition-all duration-500 placeholder:text-starlight/10"
                placeholder="Enter Email..."
              />
            </div>

            <div className="flex flex-col gap-2 group">
              <label className="micro-text text-starlight/30 group-focus-within:text-supernova transition-colors">TRANSMISSION PAYLOAD</label>
              <textarea
                required
                className="w-full bg-transparent border-b border-starlight/10 py-4 font-sans text-xl text-starlight focus:border-supernova focus:outline-none transition-all duration-500 resize-none h-32 placeholder:text-starlight/10"
                placeholder="Enter Message..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 px-12 py-5 bg-supernova text-void-900 rounded-full celestial-heading text-lg hover:bg-starlight hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all duration-700 disabled:opacity-50"
            >
              {isSubmitting ? "TRANSMITTING..." : "SEND SIGNAL"}
            </button>
          </form>
        </div>
      </div>

      {/* Decorative Energy Field */}
      <div className="absolute top-[40%] left-[-10%] w-[50vw] h-[50vw] bg-supernova/5 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse-aura"></div>
    </div>
  );
};

export default Contact;
