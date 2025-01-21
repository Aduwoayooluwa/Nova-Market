/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ItemGrid from "@/app/components/item-grid";
import { sampleItems } from "@/app/mock/sample-nft";

// Add these default avatar options
const defaultAvatars = [
  { id: 1, url: "/assets/avatar/cyber_punk.jpg", name: "Cyber Punk" },
  { id: 2, url: "/assets/avatar/space_ape.jpg", name: "Space Ape" },
  { id: 3, url: "/assets/avatar/pixel_hero.png", name: "Pixel Hero" },
  { id: 4, url: "/assets/avatar/meta_beast.jpg", name: "Meta Beast" },

];

const Profile = () => {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatars[0]);
  
  const userWallet = "0x1234...abcd"; 

  const ownedItems = sampleItems.filter((item) => item.category === "Art"); 

  const transactionHistory = [
    { id: 1, type: "Purchase", item: "Ethereal Dawn", amount: "0.5 ETH", date: "2025-01-20" },
    { id: 2, type: "Stake", item: "Yield Farming Pool", amount: "15% APY", date: "2025-01-19" }
  ];

  const tabs = ["Overview", "Owned Items", "Transaction History"];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r mt-10 from-primary to-primary-light text-white py-16 px-6 lg:px-20">
        <div className="text-center">
          <div className="relative inline-block">
            <motion.img
              src={selectedAvatar.url}
              alt="User Avatar"
              className="mx-auto w-24 h-24 rounded-full border-4 border-accent cursor-pointer hover:border-white transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => setShowAvatarModal(true)}
            />
            <button
              onClick={() => setShowAvatarModal(true)}
              className="absolute bottom-0 right-0 bg-accent text-white p-2 rounded-full hover:bg-accent/80 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mt-4">Your Profile</h1>
          <p className="mt-2 text-lg text-gray-300">Wallet: {userWallet}</p>
        </div>
      </section>

      {/* Avatar Selection Modal */}
      <AnimatePresence>
        {showAvatarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={() => setShowAvatarModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-xl max-w-2xl w-full mx-4 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-primary">Choose Your Avatar</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {defaultAvatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    className={`cursor-pointer relative rounded-xl overflow-hidden group ${
                      selectedAvatar.id === avatar.id ? 'ring-4 ring-accent' : ''
                    }`}
                    onClick={() => {
                      setSelectedAvatar(avatar);
                      setShowAvatarModal(false);
                    }}
                  >
                    <img
                      src={avatar.url}
                      alt={avatar.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-sm font-medium">{avatar.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <section className="py-6 px-6 lg:px-20 bg-white  sticky top-0 z-10">
        <div className="flex gap-4 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium rounded-full ${
                activeTab === tab
                  ? "bg-accent text-primary"
                  : "bg-background/10 text-gray-700"
              } hover:bg-accent hover:text-primary transition`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-10 px-6 lg:px-20">
        {activeTab === "Overview" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Welcome to Your Web3 Profile</h2>
            <p className="text-gray-600">{`Here's a quick overview of your activity and assets.`}</p>
            <ItemGrid items={ownedItems.slice(0, 4)} sectionTitle="Your Top Assets" />
          </div>
        )}

        {activeTab === "Owned Items" && (
          <ItemGrid items={ownedItems} sectionTitle="Your Owned Items" />
        )}

        {activeTab === "Transaction History" && (
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Transaction History</h2>
            <ul className="space-y-4">
              {transactionHistory.map((tx) => (
                <li
                  key={tx.id}
                  className="flex justify-between items-center bg-white p-4 rounded-lg"
                >
                  <span>{tx.type}</span>
                  <span>{tx.item}</span>
                  <span>{tx.amount}</span>
                  <span className="text-gray-500 text-sm">{tx.date}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
