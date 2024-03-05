"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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
    <div className="">
      <Carousel
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
      >
        {images.map((img) => (
          <div key={img.id}>
            <img src={img.image} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
