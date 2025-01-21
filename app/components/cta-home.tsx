"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CTABanner = () => {
  return (
    <section className="relative w-full bg-gradient-to-r from-primary to-primary-light text-white py-16 px-6 lg:px-20 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/assets/cta.jpg')" }}></div>
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
        {/* Text Section */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Empower Your Digital Ownership <br className="hidden md:block" />
            in the <span className="text-accent">Decentralized World</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Join the revolution today. Explore NFTs, DeFi, and more on NovaMarket.
          </p>
        </motion.div>

        {/* Call-to-Action Button */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link
            href="/marketplace"
            className="px-4 py-3 text-lg font-medium text-nowrap bg-accent text-primary rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Explore Marketplace
          </Link>
          <Link
            href="/learn-more"
            className="px-4 py-3 text-lg font-medium bg-white text-nowrap text-primary rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
