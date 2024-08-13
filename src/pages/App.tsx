import Map from "@sections/Map";
import Hero from "@sections/Hero";
import { Header } from "@sections/Header";
import Footer from "@sections/Footer";
import Mobiles from "@sections/Mobile";
import LifeStyle from "@sections/LifeStyle";
import Accessories from "@sections/Accessories";
import CoversProtectors from "@sections/CoversProtectors";
import Repairs from "@sections/Repairs";
import Spares from "@sections/Spares";
import { NavLink } from "react-router-dom";
// import { Input } from "@shadcn-ui/input";
import {
  // HiOutlineMagnifyingGlass as SearchIcon,
  HiOutlineChevronLeft as PreviousIcon,
  HiOutlineChevronRight as NextIcon,
} from "react-icons/hi2";
// import { Button } from "@shadcn-ui/button";

export default function App() {
  return (
    <div className="bg-white">
      <Header />
      <div className="h-24"></div>
      <Hero />
      <div className="">
        <h2 className="py-8 px-12 font-semibold">TOP CATEGORIES</h2>
        <div className="flex flex-col items-center md:flex-row md:justify-center gap-x-10 px-4 py-16">
          <NavLink
            to="/shop?category=phone"
            className="flex flex-col items-center w-72 hover:scale-105"
          >
            <div className="h-64 w-64 rounded-full">
              <img
                src="/phones/a55.webp"
                alt=""
                className="h-full rounded-full bg-gray-100 object-contain"
              />
            </div>
            <span className="py-4 text-[#ff7701]"> SMARTPHONES </span>
          </NavLink>
          <NavLink
            to="/shop?category=accessory"
            className="flex flex-col items-center w-72 hover:scale-105"
          >
            <div className="h-64 w-64 rounded-full">
              <img
                src="/categories/watch.png"
                alt=""
                className="h-full rounded-full bg-gray-100 object-contain"
              />
            </div>
            <span className="py-4 text-[#ff7701]"> ACCESSORIES </span>
          </NavLink>
          <a
            href="#Repairs"
            className="flex flex-col items-center w-72 hover:scale-105"
          >
            <div className="h-64 w-64 rounded-full">
              <img
                src="/repairs/IMG-20240708-WA0001.jpg"
                alt=""
                className="h-full rounded-full bg-gray-100 object-contain"
              />
            </div>
            <span className="py-4 text-[#ff7701]"> REPAIRS </span>
          </a>
          <a
            href="#Spares"
            className="flex flex-col items-center w-72 hover:scale-105"
          >
            <div className="h-64 w-64 rounded-full">
              <img
                src="/spares/spare 1.jpeg"
                alt=""
                className="h-full rounded-full bg-gray-100 object-contain"
              />
            </div>
            <span className="py-4 text-[#ff7701]"> SPARES </span>
          </a>
        </div>
      </div>
      <div className="h-96 relative">
        <h2 id="Recently_viewed" className="px-12 font-semibold">
          RECENTLY VIEWED
        </h2>
        <div className="h-full w-full px-4">
          <button
            className="
            flex justify-center items-center
            absolute h-10 w-10 left-12 top-[50%] bg-gray-200 text-center
            hover:bg-blue-600 hover:text-white
            transition-all ease-in
            rounded
            "
          >
            <PreviousIcon size={16} />
          </button>
          <button
            className="
            flex justify-center items-center
            absolute h-10 w-10 right-12 top-[50%] bg-gray-200 text-center
            hover:bg-blue-600 hover:text-white
            transition-all ease-in
            rounded
            "
          >
            <NextIcon size={16} />
          </button>
        </div>
      </div>
      <Mobiles />
      <Accessories />
      <CoversProtectors />
      <LifeStyle />
      <Spares />
      <Repairs />
      <Map />
      <Footer />
    </div>
  );
}
