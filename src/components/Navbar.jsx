import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center py-2 md:py-4 relative z-50 pointer-events-auto justify-between md:justify-around">
      <a
        href="/"
        className="text-xl font-semibold !text-white transition-opacity"
      >
        <img src="/logo.png" className="w-10 sm:w-12 md:w-14 ml-2 sm:ml-4 md:ml-10" />
      </a>
      <div className="flex gap-3 sm:gap-5 md:gap-8 mr-2 sm:mr-4 md:mr-10 text-sm sm:text-base md:text-xl">
        <a
          href="#about"
          className="!text-white transition-colors relative group px-1 sm:px-2 nav-shake"
        >
          About
          <span className="absolute -bottom-2 md:-bottom-3 left-1/2 transform -translate-x-1/2 w-1 md:w-1.5 h-1 md:h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </a>
        <a
          href="#work"
          className="!text-white transition-colors relative group px-1 sm:px-2 nav-shake"
        >
          Work
          <span className="absolute -bottom-2 md:-bottom-3 left-1/2 transform -translate-x-1/2 w-1 md:w-1.5 h-1 md:h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </a>
        {/* <a
          href="#projects"
          className="!text-white transition-colors relative group px-1 sm:px-2 nav-shake"
        >
          Projects
          <span className="absolute -bottom-2 md:-bottom-3 left-1/2 transform -translate-x-1/2 w-1 md:w-1.5 h-1 md:h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </a> */}
        <a
          href="#contact"
          className="!text-white transition-colors relative group px-1 sm:px-2 nav-shake"
        >
          Contact
          <span className="absolute -bottom-2 md:-bottom-3 left-1/2 transform -translate-x-1/2 w-1 md:w-1.5 h-1 md:h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
