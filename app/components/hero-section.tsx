"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  {
    title: "Discover Unique Digital Assets",
    subtitle: "Buy, Sell, and Own in the Decentralized World",
    image: '/assets/banner_1.jpg',
  },
  {
    title: "Empowering Creators",
    subtitle: "Support artists and innovators directly.",
    image: '/assets/banner_2.jpg',
  },
  {
    title: "Your Marketplace, Your Rules",
    subtitle: "Seamlessly trade on the blockchain.",
    image: '/assets/banner_3.jpg',
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-background">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${banners[currentIndex].image})`,
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
          {/* Text Content */}
          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {banners[currentIndex].title}
            </h1>
            <p className="text-lg md:text-2xl">{banners[currentIndex].subtitle}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        onClick={handlePrev}
      >
        ❮
      </button>
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        onClick={handleNext}
      >
        ❯
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition ${
              index === currentIndex ? "bg-accent" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
