import CartItems from "@/app/components/cart-items";

const mockCartItems = [
  {
    id: "1",
    title: "Ethereal Dawn",
    description: "A surreal digital painting of an abstract sunrise.",
    price: 0.5,
    currency: "ETH",
    image: "/assets/img_2.jpg",
    quantity: 1,
  },
  {
    id: "2",
    title: "Cyber Symphony",
    description: "An exclusive synthwave track for the metaverse.",
    price: 0.8,
    currency: "ETH",
    image: "/assets/img_7.jpg",
    quantity: 2,
  },
];

export default function CartPage() {
  return <CartItems items={mockCartItems} />;
}
