"use client";

import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function About() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        <h1 className="text-4xl font-bold mt-7 mb-5 text-gray-800 sm:text-5xl text-center">
          About IG.Blog Manager
        </h1>
        <div className="text-lg font-poppins font-light text-center mb-8 text-gray-800">
          Empowering creators with powerful content management tools
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="relative group"
  >
    <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-[250px] flex flex-col justify-start">
      <h3 className="text-xl font-semibold text-gray-800 text-center">
        Our Mission
      </h3>
      <p className="mt-9 mx-6 text-gray-600 text-center">
        IG.Blog Manager is here to transform how bloggers manage
        content. Our mission is to offer an intuitive, powerful platform
        that lets creators focus on what they do best — creating amazing
        content.
      </p>
    </div>
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="relative group"
  >
    <div className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-[250px] flex flex-col justify-between">
      <h3 className="text-xl font-semibold text-gray-800 text-center">
        Key Features
      </h3>
      <ul className="space-y-2 text-gray-600 text-center">
        <li>⚙️ Intuitive content organization</li>
        <li>🔍 Advanced SEO tools</li>
        <li>📝 Real-time collaboration</li>
        <li>🚀 Customizable workflows</li>
        <li>📊 Comprehensive analytics</li>
      </ul>
    </div>
  </motion.div>
</div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Meet the Creator
          </h2>
          <div className="inline-block relative">
       <img
  src="src/assets/ACHRAF EL GHAZI.jpg"
  alt="Achraf EL GHAZI"
  className="w-32 h-32 rounded-full border-4 border-gray-600 transform transition-all duration-300 hover:scale-95"
/>




            <motion.div
              className="absolute -bottom-2 -right-2 bg-teal-400 rounded-full p-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <code className="text-white text-xs font-bold">{"{ }"}</code>
            </motion.div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Achraf EL GHAZI
          </h3>
          <p className="text-gray-600 mb-4">
           Full-Stack Software Developer @neoCedrus & Creator of IG.Blog Manager
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/AchrafELGhazi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/achraf-el-ghazi-16b8bb2a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:a.elghazi@aui.ma"
              className="text-gray-600 hover:text-blue-500"
            >
              <Mail size={24} />
            </a>
          </div>
        </motion.div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© {currentYear} IG.Blog Manager. All rights reserved.</p>
          <p className="mt-2">
            Crafted with <span className="text-red-500">♥</span> by Achraf EL
            GHAZI
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
