"use client";
import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Mirá cómo es la experiencia
      </h2>

      <div className="flex justify-center">
        <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/HrtM--OrGFY" // tu video
            title="Video Caminata Terapéutica"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
