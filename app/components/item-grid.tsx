"use client";

import { FC, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "./button";
import Modal from "./modal";
import ItemDetails from "./item-details";
import { Item } from "@/app/types/item";

interface ItemGridProps {
  items: Item[];
  sectionTitle: string;
}

const ItemGrid: FC<ItemGridProps> = ({ items, sectionTitle }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleOpenModal = (item: Item, e: React.MouseEvent) => {
  
    e.preventDefault();
    e.stopPropagation();
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <section className="py-10 w-full">
        <h2 className="text-3xl font-bold text-primary mb-6">{sectionTitle}</h2>
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className="bg-background rounded-lg shadow-sm overflow-hidden transition"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                <p className="text-sm text-gray-600 truncate">{item.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-accent">
                    {item.price} {item.currency}
                  </span>
                  <Button onClick={(e) => handleOpenModal(item, e)}>
                    View
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Modal isOpen={!!selectedItem} onClose={handleCloseModal}>
        {selectedItem && <ItemDetails item={selectedItem} />}
      </Modal>
    </>
  );
};

export default ItemGrid;
