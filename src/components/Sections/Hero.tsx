import React, { useState, useEffect } from "react";

import bannerCel1 from "../../assets/img/banner-cel-1.webp";
import bannerTablet1 from "../../assets/img/banner-tablet-1.webp";
import bannerPc1 from "../../assets/img/banner-pc-1.webp";

import bannerCel2 from "../../assets/img/banner-cel-2.webp";
import bannerTablet2 from "../../assets/img/banner-tablet-2.webp";
import bannerPc2 from "../../assets/img/banner-pc-2.webp";

import bannerCel3 from "../../assets/img/banner-cel-3.webp";
import bannerTablet3 from "../../assets/img/banner-tablet-3.webp";
import bannerPc3 from "../../assets/img/banner-pc-3.webp";

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { mobile: bannerCel1, tablet: bannerTablet1, desktop: bannerPc1 },
    { mobile: bannerCel2, tablet: bannerTablet2, desktop: bannerPc2 },
    { mobile: bannerCel3, tablet: bannerTablet3, desktop: bannerPc3 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);


  const getCurrentImage = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1280
        ? images[currentIndex].desktop
        : window.innerWidth >= 768
        ? images[currentIndex].tablet
        : images[currentIndex].mobile;
    }
    return images[currentIndex].desktop;
  };

  return (
    <header className="my-10">
      <div className="flex flex-col items-center mx-auto relative">
        <div className="relative w-[360px] h-[600px] lg:w-[768px] lg:h-[360px] xl:w-[1280px] xl:h-[450px] overflow-hidden rounded-xl shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${getCurrentImage()})` 
            }}
          />
          
        </div>
        
        {/* Dots Indicator */}
        <div className="mt-5 flex space-x-3 items-center">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                index === currentIndex ? "bg-accent" : "bg-neutral-400 hover:bg-neutral-500"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </header>
  );
};

export default Hero;