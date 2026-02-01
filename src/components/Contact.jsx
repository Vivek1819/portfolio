import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => setIsSubmitted(false), 3000);

    console.log("Form submitted:", formData);
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:vivekhipparkar@gmail.com";
  };

  const handleLocationClick = () => {
    window.open("https://maps.google.com/?q=Pune,India", "_blank");
  };

  return (
    <div className="px-6 sm:px-10 md:px-28 pt-8 md:pt-14 relative z-10 mt-12 md:mt-18" id="contact">
      <div className="text-center mb-10 md:mb-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-white mt-2 font-extrabold tracking-tighter relative inline-block drop-shadow-[0_2px_24px_rgba(34,211,238,0.25)]">
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient-x">
            Contact
          </span>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 rounded-full blur-sm opacity-30" />
        </h1>
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">
          {" "}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 md:space-y-8 md:col-span-2"
          >
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                Get In Touch
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                I'm always interested in hearing about new opportunities,
                creative projects, or just having a chat about technology and
                development.
              </p>
            </div>{" "}
            <div className="space-y-6">
              <motion.div
                className="flex items-center gap-4 group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                onClick={handleEmailClick}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-gray-300 group-hover:text-cyan-300 transition-colors duration-300">
                    vivekhipparkar@gmail.com
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                onClick={handleLocationClick}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-fuchsia-500/25 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Location</p>
                  <p className="text-gray-300 group-hover:text-fuchsia-300 transition-colors duration-300">
                    Pune, India
                  </p>
                </div>{" "}
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="relative md:col-span-3"
          >
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-semibold">
                  Message sent successfully!
                </span>
              </motion.div>
            )}

            <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-[0_8px_40px_0_rgba(34,211,238,0.15)] hover:shadow-[0_12px_48px_0_rgba(34,211,238,0.25)] transition-all duration-500">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/10 via-transparent to-fuchsia-400/10 opacity-80 pointer-events-none" />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white font-semibold text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white font-semibold text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white font-semibold text-sm">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white font-semibold text-sm">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
        <div className="mt-16 md:mt-24 text-center text-base sm:text-lg md:text-xl mb-8 md:mb-10 pb-8 md:pb-0">
          Made with ❤️ by Vivek
        </div>
      </div>
    </div>
  );
};

export default Contact;
