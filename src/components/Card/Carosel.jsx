import React, { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

const Carosel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden h-[400px]">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          className={`object-cover h-full w-full absolute transition-opacity ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          alt={`Slide ${index + 1}`}
        />
      ))}
      <button
        onClick={goToPreviousSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent border border-black rounded-full w-10 h-10 flex items-center justify-center text-black text-2xl bg-slate-200 hover:bg-slate-500 focus:outline-none"
      >
        <GrFormPrevious />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent border border-black rounded-full w-10 h-10 flex items-center justify-center text-black text-2xl bg-slate-200 hover:bg-slate-600 focus:outline-none"
      >
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default Carosel;
