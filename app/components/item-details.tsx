"use client";

import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Item } from "@/app/types/item"; 
import Button from "./button";
import { useCartStore } from "@/app/stores/cart-store";
import { toast } from "sonner";

interface ItemDetailsProps {
  item: Item;
}

const ItemDetails: FC<ItemDetailsProps> = ({ item }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(item);
    toast.success("Item added to cart");
  };

  return (
    <div className="">
      <div className="relative w-full h-64 mb-6">
        <Image
          src={item.image}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-primary mb-2">{item.title}</h2>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-accent">
            {item.price} {item.currency}
          </span>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
        {item.category && (
          <span className="mt-4 inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600">
            {item.category}
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default ItemDetails; 