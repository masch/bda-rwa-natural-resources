"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatProps {
  readonly year: string;
  readonly trees: string;
  readonly treesLabel: string;
  readonly hectares: string;
  readonly hectaresLabel: string;
}

function StatCard({
  year,
  trees,
  treesLabel,
  hectares,
  hectaresLabel,
}: StatProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const treesRef = useRef<HTMLDivElement>(null);
  const hectaresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada de la card
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Contador animado para árboles
      gsap.from(treesRef.current, {
        scrollTrigger: {
          trigger: treesRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        innerText: 0,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power2.out",
      });

      // Contador animado para hectáreas
      gsap.from(hectaresRef.current, {
        scrollTrigger: {
          trigger: hectaresRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        innerText: 0,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power2.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="flex flex-col gap-8 rounded-2xl bg-white p-8 shadow-xl md:flex-row md:justify-around"
    >
      <div className="text-center">
        <div className="mb-2 text-2xl font-semibold text-emerald-700">
          {year}
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <div
              ref={treesRef}
              className="text-5xl font-bold text-emerald-900 md:text-6xl"
            >
              {trees}
            </div>
            <div className="mt-2 text-sm text-gray-600">{treesLabel}</div>
          </div>
          <div>
            <div
              ref={hectaresRef}
              className="text-5xl font-bold text-emerald-900 md:text-6xl"
            >
              {hectares}
            </div>
            <div className="mt-2 text-sm text-gray-600">{hectaresLabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsSection() {
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
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="impacto"
      ref={sectionRef}
      className="bg-linear-to-br from-emerald-50 to-teal-50 py-20"
    >
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="mb-16 text-center font-serif text-4xl font-bold text-emerald-900 md:text-5xl"
        >
          Nuestro Impacto
        </h2>
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <StatCard
            year="2022"
            trees="15,000"
            treesLabel="Árboles plantados"
            hectares="50"
            hectaresLabel="Hectáreas protegidas"
          />
          <StatCard
            year="2023"
            trees="25,000"
            treesLabel="Árboles plantando"
            hectares="120"
            hectaresLabel="Hectáreas protegiendo"
          />
        </div>
      </div>
    </section>
  );
}
