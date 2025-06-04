// src/components/Layout/Footer.js
import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {currentYear} TaskForge. All rights reserved.
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600 flex items-center justify-center">
              Made with <HeartIcon className="h-4 w-4 text-red-500 mx-1" /> by{" "}
              <a
                href="https://github.com/programm3d" // Update with your actual link
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium ml-1"
              >
                Pushan Sinha
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
