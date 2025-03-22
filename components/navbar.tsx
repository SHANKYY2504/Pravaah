"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    if (id === "register") {
      window.location.href = "https://forms.gle/zv23pCVk2aK5qSei7";
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
        isScrolled ? "bg-[#0a0a1f]/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Logo Section (Left Side) */}
        <div className="flex items-center space-x-4">
          <Image src="/iitlogo.png" alt="IIT Logo" width={90} height={80} />
          <Image src="/logo.png" alt="Event Logo" width={140} height={150} />
        </div>

        {/* Navigation (Right Side) */}
        <div className="ml-auto flex items-center space-x-8">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["home", "about", "events", "sponsors", "contacts", "register"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item === "home" ? "hero" : item)}
                className="text-sm uppercase tracking-wider font-medium relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a1f]/95 backdrop-blur-md py-4 px-6 flex flex-col space-y-4 shadow-lg">
          {["home", "about", "events", "sponsors", "contacts", "register"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item === "home" ? "hero" : item)}
              className="text-sm uppercase tracking-wider font-medium py-2 border-b border-gray-800"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

