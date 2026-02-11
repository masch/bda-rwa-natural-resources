"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del contenido de texto
      gsap.from(contentRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        x: -80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Animación de la imagen con parallax
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        x: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Parallax sutil en la imagen
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -50,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="mision" ref={sectionRef} className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div ref={contentRef} className="space-y-6">
            <h2 className="font-serif text-4xl font-bold text-emerald-900 md:text-5xl">
              ¿Por qué es tan importante?
            </h2>
            <div className="h-1 w-20 bg-emerald-600" />
            <p className="text-lg leading-relaxed text-gray-700">
              El <strong>80% del agua de Córdoba</strong> nace en la cuenca
              hídrica de las Sierras Grandes.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              La existencia y salud de esta cuenca depende directamente de los{" "}
              <strong>bosques de altura de Tabaquillo</strong>.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Hace 300 años, gran parte de las Sierras era bosque. Hoy queda{" "}
              <strong className="text-red-600">menos del 3%</strong>.
            </p>
          </div>

          <div ref={imageRef} className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2574&auto=format&fit=crop"
                alt="Sierras Grandes de Córdoba"
                className="h-[500px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full rounded-2xl bg-emerald-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
