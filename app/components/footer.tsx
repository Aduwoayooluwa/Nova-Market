/* eslint-disable @next/next/no-img-element */
"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FacebookFilled, InstagramOutlined, TwitterCircleFilled } from "@ant-design/icons";

const Footer: FC = () => {
  return (
    <footer className="bg-primary text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">NovaMarket</h3>
            <p className="text-sm text-gray-400">
              Your gateway to the decentralized world. Explore NFTs, DeFi, and more with ease and security.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-accent transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-sm text-gray-400 hover:text-accent transition">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-accent transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-400 hover:text-accent transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <TwitterCircleFilled />
                </Link>
              </li>
              <li>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FacebookFilled />
                </Link>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <InstagramOutlined />
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Sign-Up */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to receive the latest updates and offers.
            </p>
            <form className="gap-4 flex flex-col">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-primary border border-accent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 bg-accent text-primary font-bold rounded-md hover:bg-accent-light transition"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NovaMarket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
