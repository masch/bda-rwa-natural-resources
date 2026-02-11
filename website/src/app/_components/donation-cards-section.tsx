"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DonationCardProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  delay?: number;
}

function DonationCard({
  image,
  title,
  subtitle,
  description,
  delay = 0,
}: DonationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        delay,
        ease: "power3.out",
      });
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-2xl"
    >
      {/* Card image */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-1 text-sm font-medium tracking-wide text-emerald-600 uppercase">
          {subtitle}
        </p>
        <h3 className="mb-3 font-serif text-2xl font-bold text-emerald-900">
          {title}
        </h3>
        <p className="mb-6 flex-1 leading-relaxed text-gray-600">
          {description}
        </p>

        {/* Donate button */}
        <button className="w-full cursor-pointer rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-emerald-800 hover:shadow-lg active:scale-[0.98]">
          Donar
        </button>
      </div>
    </div>
  );
}

export function DonationCardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current.children, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cards: DonationCardProps[] = [
    {
      image: "/cards/Gemini_Generated_Image_9l89qa9l89qa9l89.png",
      title: "Tabaquillo",
      subtitle: "Árbol Sagrado · Sierras Centrales",
      description:
        "Apadriná la plantación de Tabaquillos, el árbol sagrado de las Sierras Grandes. Cada árbol protege el nacimiento de los ríos y preserva la biodiversidad nativa.",
    },
    {
      image: "/cards/Gemini_Generated_Image_idw3psidw3psidw3.png",
      title: "Ganadería Regenerativa",
      subtitle: "Suelo Vivo · Impacto Positivo",
      description:
        "Apoyá la ganadería regenerativa que restaura el suelo, captura carbono y produce alimentos de manera sustentable en armonía con el ecosistema.",
    },
    {
      image: "/cards/Gemini_Generated_Image_lymk3ylymk3ylymk.png",
      title: "Patrimonio Natural",
      subtitle: "Compra y Conservación · Tierra Pura",
      description:
        "Contribuí a la compra y conservación de tierras en las Sierras Grandes. Cada hectárea protegida asegura agua limpia para las generaciones futuras.",
    },
  ];

  return (
    <section
      id="donar"
      ref={sectionRef}
      className="bg-linear-to-b from-white to-emerald-50 py-20"
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div ref={titleRef} className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-emerald-900 md:text-5xl">
            Elegí cómo ayudar
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Cada donación tiene un impacto directo en la restauración de los
            bosques nativos y la protección de las fuentes de agua.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <DonationCard key={card.title} {...card} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
