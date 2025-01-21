"use client";

import { useState } from "react";
import ItemGrid from "@/app/components/item-grid";
import { sampleItems } from "@/app/mock/sample-nft";
import { motion } from "framer-motion";

const categories = ["All", "Art", "Music", "Gaming", "DeFi"];

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  
  const filteredItems = sampleItems.filter(
    (item) =>
      (activeCategory === "All" || item.category === activeCategory) &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r mt-10 from-primary to-primary-light text-white py-16 px-6 lg:px-20">
      <div className="absolute inset-0 opacity-20 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/assets/img_16.jpg')" }}></div>
        <div className="text-center z-10 relative lg:text-left">
          <h1 className="text-4xl md:text-6xl font-bold">
            Explore the World of <span className="text-accent">Decentralized Ownership</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Discover unique NFTs, yield opportunities, and virtual assets in one place.
          </p>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-6 px-6 lg:px-20 bg-background shadow-xs sticky top-0 z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          {/* Categories */}
          <div className="flex overflow-x-auto gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category
                    ? "bg-accent text-primary"
                    : "bg-background text-primary"
                } hover:bg-accent hover:text-primary transition`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <motion.input
             whileFocus={{ scale: 1.05 }}
             transition={{ type: "spring", stiffness: 300, damping: 20 }}
              type="text"
              placeholder="Search items..."
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Items Section */}
      <section className="py-10 px-6 lg:px-20">
        <ItemGrid items={filteredItems} sectionTitle={`Explore ${activeCategory}`} />
      </section>
    </div>
  );
}
