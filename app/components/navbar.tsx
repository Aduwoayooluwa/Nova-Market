"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MenuOutlined,
  CloseOutlined,
  AppstoreOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import clsx from "clsx";
import Link from "next/link";
import SearchBar from "./search-bar";
import { useCartStore } from "@/app/stores/cart-store";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isConnected } = useAccount();
  const cartItemCount = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navLinks = [
    // { name: "Home", icon: <HomeOutlined />, href: "/" },
    { name: "Marketplace", icon: <AppstoreOutlined />, href: "/marketplace" },
    // Only show profile when connected
    ...(isConnected ? [{ name: "Profile", icon: <UserOutlined />, href: "/profile" }] : []),
  ];

  const renderAuthButton = () => (
    <div className="flex items-center">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted;
          if (!ready) return null;

          if (!account) {
            return (
              <button
                onClick={openConnectModal}
                className="flex items-center gap-2 text-nowrap bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <WalletOutlined />
                {'Connect Wallet'}
              </button>
            );
          }

          return (
            <div className="flex items-center gap-2">
              {chain && (
                <button
                  onClick={openChainModal}
                  className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg"
                >
                  {chain.name}
                </button>
              )}
              <button
                onClick={openAccountModal}
                className="flex items-center gap-2 bg-accent text-nowrap hover:bg-accent/90 text-white px-4 py-2 rounded-lg"
              >
                {account.displayName}
              </button>
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full px-6 py-4 z-50 transition-all duration-300",
        isScrolled ? "bg-primary text-white shadow-lg" : "bg-background text-primary"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"} className="text-2xl font-bold">
          Nova<span className="text-accent">Market</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 items-center">
          <SearchBar />
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="flex items-center gap-2 hover:text-accent transition-colors duration-300"
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          ))}
          {/* Cart Icon */}
          <li>
            <Link
              href="/cart"
              className="relative flex items-center hover:text-accent transition-colors duration-300"
            >
              <ShoppingCartOutlined className="text-xl" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform -translate-y-1/2 translate-x-1/2">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </li>
          <li>{renderAuthButton()}</li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none text-2xl"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="bg-primary md:hidden overflow-hidden"
          >
            <ul className="flex flex-col space-y-4 py-4 px-6 text-white">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 hover:text-accent transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              ))}
              {/* Cart Icon for Mobile */}
              <li>
                <Link
                  href="/cart"
                  className="relative flex items-center hover:text-accent transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCartOutlined className="text-xl" />
                  {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform -translate-y-1/2 translate-x-1/2">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </li>
              {/* Auth Button for Mobile */}
              <li className="pt-2">{renderAuthButton()}</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
