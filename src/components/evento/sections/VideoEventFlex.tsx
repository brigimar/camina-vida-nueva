"use client";
import { useState } from "react";
import EventDetails from "@/components/evento/sections/EventDetails";
import Image from "next/image";

export default function VideoEventFlexBig() {
  const [play, setPlay] = useState(false);

  return (
    <section id="video" className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start">
          {/* Video */}
          <div className="w-full lg:w-[65%]">
            <div className="w-full max-w-2xl h-[400px] rounded-lg overflow-hidden shadow-md relative">
              {play ? (
                <iframe
                  src="https://www.youtube.com/embed/HrtM--OrGFY?autoplay=1"
                  title="Video Caminata Terapéutica"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <button
                  onClick={() => setPlay(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold"
                  aria-label="Reproducir video"
                >
                  <Image
  src="https://i.ytimg.com/vi/HrtM--OrGFY/hqdefault.jpg"
  alt="Vista previa del video"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 50vw"
  className="object-cover"
  priority
/>

                  <span className="bg-red-600 px-4 py-2 rounded-full z-10">
                    ▶ Reproducir
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Detalles del evento */}
          <div className="w-full lg:w-[40%] mt-6 lg:mt-0">
            <EventDetails />
          </div>
        </div>
      </div>
    </section>
  );
}
