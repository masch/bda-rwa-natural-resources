"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { id: "impacto", label: "Nuestro Impacto" },
  { id: "mision", label: "¿Por qué?" },
  { id: "trabajo", label: "Nuestro Trabajo" },
  { id: "contacto", label: "Contacto" },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Entrada animada con delay
    const timer = setTimeout(() => setVisible(true), 500);

    // Detectar scroll para cambiar background
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  }, []);

  return (
    <nav
      style={{ zIndex: 9999 }}
      className={`fixed left-0 right-0 top-0 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${
        scrolled
          ? "bg-emerald-950/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            <Image
              src="/lgoo.webp"
              alt="Bosques de Agua"
              width={160}
              height={48}
              className={`h-10 w-auto transition-all duration-300 ${scrolled ? "brightness-100" : "brightness-0 invert"}`}
              priority
            />
          </button>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) =>
              link.id === "contacto" ? (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-emerald-700"
                >
                  {link.label}
                </button>
              ) : (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm font-medium text-white/90 transition-colors hover:text-emerald-300"
                >
                  {link.label}
                </button>
              ),
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 flex flex-col gap-4 rounded-lg bg-emerald-950/95 p-6 backdrop-blur-lg md:hidden">
            {NAV_LINKS.map((link) =>
              link.id === "contacto" ? (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="rounded-full bg-emerald-600 px-6 py-3 text-center text-white transition-all hover:bg-emerald-700"
                >
                  {link.label}
                </button>
              ) : (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-white transition-colors hover:text-emerald-300"
                >
                  {link.label}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
