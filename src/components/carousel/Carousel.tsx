import { useState, useEffect } from "react";

export default function Carousel(props: {
  slides: Array<{ image: string; caption: string }>;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % props.slides.length);
    }, 7000);

    return () => clearInterval(interval);
  });

  return (
    <div className="carousel relative max-w-full h-96 overflow-hidden">
      {props.slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-slide h-full   ${index === currentSlide ? "block" : ""}`}
        >
          <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          <div className="carousel-caption z-20 absolute bottom-[20%] left-[5%] text-white bg-[#00000080] py-[10px] px-5 rounded-[5px]">
            {slide.caption} of {props.slides.length}
          </div>
        </div>
      ))}
    </div>
  );
}
