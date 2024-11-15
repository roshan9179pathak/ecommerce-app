import React from "react";
import Image from "next/image";
import { carouselData } from "../data/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CategoryCards from "./CategoryCards";

const HeroSection = () => {
  return (
    <div className="flex flex-col bg-white text-dark-blue overflow-x-hidden">
      <Carousel>
        <CarouselContent>
          <CarouselPrevious />
          {carouselData.map((image, index) => (
            <CarouselItem key={index}>
              <div className="w-[80vw] h-[50vh] md:h-[60vh] lg:h-[70vh] mx-auto mt-3">
                <Image
                  src={image}
                  alt={`image-${index}`}
                  layout="responsive"
                  width={1000} 
                  height={400} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselNext />
      </Carousel>

      <div className="category_container mt-10 px-4 sm:px-6 lg:px-8">
        <CategoryCards />
      </div>
    </div>
  );
};

export default HeroSection;
