'use client';

import Link from "next/link";
import { useCartStore } from "@/app/stores/cart-store";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCart() {
    const cartItems = useCartStore(state => state.items);
    const itemCount = cartItems.length;

    if (itemCount === 0) return null;

    return (
        <AnimatePresence>
            <Link href="/cart">
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                        scale: 1, 
                        opacity: 1,
                        y: [0, -10, 0]
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                        duration: 0.3,
                        y: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed md:bottom-8 md:right-8 bottom-4 right-4 z-50 bg-primary hover:bg-primary/90 text-white md:p-4 p-3 rounded-full shadow-lg cursor-pointer transition-colors duration-300 flex items-center justify-center"
                >
                    <ShoppingCartOutlined className="md:text-2xl text-xl" />
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full md:h-6 md:w-6 h-5 w-5 flex items-center justify-center"
                    >
                        {itemCount}
                    </motion.span>
                </motion.div>
            </Link>
        </AnimatePresence>
    );
}