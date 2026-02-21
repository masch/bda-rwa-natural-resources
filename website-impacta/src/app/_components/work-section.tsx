"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WorkCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

function WorkCard({ title, description, icon, delay = 0 }: WorkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        delay,
        ease: "power3.out",
      });

      // Hover effect
      const handleMouseEnter = () => {
        gsap.to(cardRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const element = cardRef.current;
      element?.addEventListener("mouseenter", handleMouseEnter);
      element?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element?.removeEventListener("mouseenter", handleMouseEnter);
        element?.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, cardRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="group cursor-pointer rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-2xl"
    >
      <div className="mb-4 text-6xl">{icon}</div>
      <h3 className="mb-3 font-serif text-2xl font-bold text-emerald-900">
        {title}
      </h3>
      <p className="leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="trabajo"
      ref={sectionRef}
      className="bg-linear-to-br from-teal-50 to-emerald-50 py-20"
    >
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="mb-16 text-center font-serif text-4xl font-bold text-emerald-900 md:text-5xl"
        >
          Nuestro Trabajo
        </h2>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
          <WorkCard
            icon="🌱"
            title="Producción de árboles nativos"
            description="Cultivamos especies nativas adaptadas al ecosistema de las Sierras Grandes."
            delay={0}
          />
          <WorkCard
            icon="🌳"
            title="Plantación de árboles nativos"
            description="Restauramos el bosque nativo con técnicas sostenibles de reforestación."
            delay={0.1}
          />
          <WorkCard
            icon="🏞️"
            title="Compra y conservación de tierras"
            description="Protegemos territorios clave para la conservación de la cuenca hídrica."
            delay={0.2}
          />
          <WorkCard
            icon="🐄"
            title="Ganadería regenerativa"
            description="Implementamos prácticas ganaderas que restauran el suelo y el ecosistema."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
