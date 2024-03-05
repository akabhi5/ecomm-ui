"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const HeroCarousel = () => {
  const images = [
    { id: 1, image: "/images/Carousel1.png" },
    { id: 2, image: "/images/Carousel2.png" },
    { id: 3, image: "/images/Carousel3.png" },
    { id: 4, image: "/images/Carousel4.png" },
    { id: 5, image: "/images/Carousel5.png" },
    { id: 6, image: "/images/Carousel6.png" },
  ];

  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {images.map((img) => (
          <CarouselItem key={img.id}>
            <div className="w-[100%] sm:h-56 lg:h-72 xl:h-96 relative">
              <Image src={img.image} alt="" layout="fill" objectFit="contain" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HeroCarousel;
