import React from "react";
import { Link } from "react-router-dom";

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm">
            © {currentYear} MerNote. All rights reserved.
          </div>

          <div className="flex gap-6">
            <a
              href="https://github.com/kaibad/Mernot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              target="_blank"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-4 text-center text-gray-500 text-xs">
          A simple and secure MERN stack note-taking application
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
