import AllItems from "./components/all-items";
import CTABanner from "./components/cta-home";
import HeroCarousel from "./components/hero-section";
import { sampleItems } from "./mock/sample-nft";

export default function Home() {
  return (
   <div>
    <HeroCarousel />

    <div>
      <AllItems items={sampleItems} />
    </div>
    <div>
      <CTABanner />
    </div>
   </div>
  );
}
