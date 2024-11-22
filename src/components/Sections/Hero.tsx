import React, { useState, useEffect } from "react";
import clsx from "clsx";

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

  const currentImage =
    window.innerWidth >= 1024
      ? images[currentIndex].desktop
      : window.innerWidth >= 768
      ? images[currentIndex].tablet
      : images[currentIndex].mobile;

  return (
    <header className="my-10">
      <div className="flex flex-col items-center mx-auto relative">
        <div
          className={clsx(
            "shadow-[inset_-1px_-1px_3px_black,inset_1px_1px_3px_black]",
            "w-[360px] h-[600px] bg-cover bg-center",
            "sm:w-[750px] sm:h-[350px]",
            "md:w-[1280px] md:h-[450px]"
          )}
          style={{ backgroundImage: `url(${currentImage})` }}
        ></div>
        <div className="mt-5 flex space-x-2 items-center">
          {images.map((_, index) => (
            <div
              key={index}
              className={clsx(
                "rounded-full",
                index === currentIndex
                  ? "bg-accent w-4 h-4"
                  : "bg-gray-400 w-2 h-2"
              )}
            ></div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Hero;