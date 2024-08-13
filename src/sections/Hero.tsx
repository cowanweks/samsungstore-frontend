import Carousel from "@components/carousel/Carousel";

// Images
import Image1 from "@public/slides/slide1.jpg";
import Image2 from "@public/slides/HOME_E3_MX-KV_1440x810_pc.avif";
import Image3 from "@public/slides/FNL_Gallery_Ultra_800x600_Slide_Exclusive_Colors_1.webp";
import Image4 from "@public/slides/SDSAC-7185-S24U-HP-LOB-FullBleed-DT-1440x810.avif";

const slides = [
  {
    image: Image1,
    caption: "Slide 1",
  },
  {
    image: Image2,
    caption: "Slide 2",
  },
  {
    image: Image3,
    caption: "Slide 3",
  },
  {
    image: Image4,
    caption: "Slide 4",
  },
];

export default function Hero() {
  return (
    <div id="Hero" className="relative">
      <div className="absolute h-full w-full bg-gray-700 opacity-50 z-10"></div>
      <Carousel slides={slides} />
    </div>
  );
}
