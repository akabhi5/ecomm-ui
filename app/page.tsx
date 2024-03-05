import HeroCarousel from "@/components/HeroCarousel/HeroCarousel";
import MainProducts from "@/components/MainProducts/MainProducts";

export default function Home() {
  return (
    <main className="p-5 max-w-screen-2xl mx-auto">
      <HeroCarousel />
      <MainProducts />
    </main>
  );
}
