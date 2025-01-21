import { FC } from "react";
import ItemGrid from "./item-grid";

interface Item {
  id: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  image: string;
  category: string;
}

interface AllItemsProps {
  items: Item[];
}

const AllItems: FC<AllItemsProps> = ({ items }) => {
 
  const groupedItems = items.reduce<Record<string, Item[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section className="py-10 px-6">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        Explore All Items
      </h2>
      <div className="">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <ItemGrid
            key={category}
            items={categoryItems}
            sectionTitle={`Featured ${category}`}
          />
        ))}
      </div>
    </section>
  );
};

export default AllItems;
