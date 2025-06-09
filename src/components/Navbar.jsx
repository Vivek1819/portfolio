import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center py-4 relative z-50 pointer-events-auto justify-around">
      <a
        href="/"
        className="text-xl font-semibold mr-auto !text-white transition-opacity"
      >
        <img src="/logo.png" className="w-14 ml-10" />
      </a>
      <div className="flex gap-8 mr-10 text-xl">
        {" "}        <a
          href="#about"
          className="!text-white transition-colors relative group px-2 nav-shake"
        >
          About
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </a>        <a
          href="#work"
          className="!text-white transition-colors relative group px-2 nav-shake"
        >
          Work
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </a>
        {/* <a
          href="#projects"
          className="!text-white transition-colors relative group px-2 nav-shake"
        >
          Projects
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </a> */}
        <a
          href="#contact"
          className="!text-white transition-colors relative group px-2 nav-shake"
        >
          Contact
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
