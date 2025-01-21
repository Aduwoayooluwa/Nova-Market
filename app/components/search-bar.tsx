"use client";

import { useState } from "react";
import { motion } from "framer-motion";


const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
   
    console.log("Search query:", e.target.value);
  };

  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: isFocused ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex items-center w-full max-w-md bg-transparent rounded-lg"
    >
            <motion.input
            onBlur={() => setIsFocused(true)}
            whileFocus={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
              type="text"
              placeholder="Search items..."
              className="px-4 py-2 border-accent border rounded-lg bg-transparent focus:ring-2 focus:ring-accent focus:outline-none"
              value={query}
              onChange={handleSearch}
            />
    
    </motion.div>
  );
};

export default SearchBar;
