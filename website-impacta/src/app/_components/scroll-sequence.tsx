"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 120;

function getFramePath(index: number): string {
  const num = String(index).padStart(3, "0");
  return `/sequence/ezgif-frame-${num}.jpg`;
}

export function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const phrase1Ref = useRef<HTMLDivElement>(null);
  const phrase2Ref = useRef<HTMLDivElement>(null);
  const phrase3Ref = useRef<HTMLDivElement>(null);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img?.complete || !img.naturalWidth) return;

    // Scale to cover the canvas (like object-fit: cover)
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = img.naturalWidth * (canvas.height / img.naturalHeight);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = img.naturalHeight * (canvas.width / img.naturalWidth);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Preload all images
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i + 1);
      img.onload = () => {
        loadedCount++;
        if (i === 0) {
          renderFrame(0);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    // GSAP ScrollTrigger animation
    const frameObj = { frame: 0 };

    const ctx = gsap.context(() => {
      // Frame sequence animation
      gsap.to(frameObj, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        onUpdate: () => {
          const newFrame = Math.round(frameObj.frame);
          if (newFrame !== currentFrameRef.current) {
            currentFrameRef.current = newFrame;
            renderFrame(newFrame);
          }
        },
      });

      // ── Phrase 1: Beginning (0% – 25% of scroll) ──
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "25% top",
          scrub: true,
        },
      });
      tl1
        .fromTo(
          phrase1Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        )
        .to(phrase1Ref.current, {
          opacity: 1,
          duration: 0.4,
        })
        .to(phrase1Ref.current, {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: "power2.in",
        });

      // ── Phrase 2: Middle (30% – 60% of scroll) ──
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "30% top",
          end: "60% top",
          scrub: true,
        },
      });
      tl2
        .fromTo(
          phrase2Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        )
        .to(phrase2Ref.current, {
          opacity: 1,
          duration: 0.4,
        })
        .to(phrase2Ref.current, {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: "power2.in",
        });

      // ── Phrase 3: End (65% – 95% of scroll) ──
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "65% top",
          end: "95% top",
          scrub: true,
        },
      });
      tl3
        .fromTo(
          phrase3Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        )
        .to(phrase3Ref.current, {
          opacity: 1,
          duration: 0.4,
        })
        .to(phrase3Ref.current, {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: "power2.in",
        });
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [renderFrame]);

  return (
    <div
      ref={containerRef}
      className="relative z-0 bg-black"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 z-10 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas ref={canvasRef} className="h-full w-full" />

        {/* Dark overlay for text readability */}
        <div className="pointer-events-none absolute inset-0 bg-black/30" />

        {/* Phrase 1 – beginning */}
        <div
          ref={phrase1Ref}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 opacity-0"
        >
          <p className="max-w-3xl text-center font-serif text-3xl font-bold leading-snug text-white drop-shadow-lg md:text-5xl lg:text-6xl">
            Cuando los árboles caen,
            <br />
            las vidas se derrumban
          </p>
        </div>

        {/* Phrase 2 – middle */}
        <div
          ref={phrase2Ref}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 opacity-0"
        >
          <p className="max-w-3xl text-center font-serif text-3xl font-bold leading-snug text-white drop-shadow-lg md:text-5xl lg:text-6xl">
            La población de bosques en Córdoba hoy se ha reducido a menos de un{" "}
            <span className="text-red-400">3%</span>
          </p>
        </div>

        {/* Phrase 3 – end */}
        <div
          ref={phrase3Ref}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 opacity-0"
        >
          <p className="max-w-3xl text-center font-serif text-3xl font-bold leading-snug text-white drop-shadow-lg md:text-5xl lg:text-6xl">
            Restauramos las Sierras Grandes
            <br />
            de Córdoba, Argentina.
          </p>
          <p className="absolute bottom-[30%] max-w-2xl text-center text-xl text-white/90 drop-shadow-md md:text-2xl">
            Por el agua de la humanidad.
          </p>
        </div>
      </div>
    </div>
  );
}
