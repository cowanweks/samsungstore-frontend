import { useState } from "react";
import { HiOutlineMapPin as MapIcon } from "react-icons/hi2";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@shadcn-ui/hover-card";
import { NavLink } from "react-router-dom";
import BrandLogo from "@public/logo.jpg";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md z-10">
      <div className="flex justify-end h-20 px-4 items-center">
        <NavLink to="/" className="absolute left-0">
          <img src={BrandLogo} alt="Samsung Store" className="h-20" />
        </NavLink>
        <div className="hidden md:flex md:h-auto space-x-6">
          <NavLink
            to="/"
            className="text-gray-600 leading-10 hover:text-[#ff7701] transition ease-in-out hover:scale-105"
          >
            HOME
          </NavLink>
          <NavLink
            to="/shop"
            className="text-gray-600 leading-10 hover:text-[#ff7701] transition ease-in-out hover:scale-105"
          >
            SHOP
          </NavLink>
          <NavLink
            to="/shop?category=phone"
            className="text-gray-600 leading-10 hover:text-[#ff7701] transition ease-in-out hover:scale-105"
          >
            SMARTPHONES
          </NavLink>
          <NavLink
            to="/shop?category=accessory"
            className="text-gray-600 leading-10 hover:text-[#ff7701] transition ease-in-out hover:scale-105"
          >
            ACCESSORIES
          </NavLink>
          <NavLink
            to="/shop?category=lifestyle"
            className="text-gray-600 leading-10 hover:text-[#ff7701] transition ease-in-out hover:scale-105"
          >
            LIFESTYLE
          </NavLink>
          <NavLink
            to="/shop?category=covers_protectors"
            className="text-gray-600 leading-10 hover:text-[#ff7701] transition ease-in-out hover:scale-105"
          >
            COVERS
          </NavLink>
          <NavLink
            to="/#Spares"
            className="text-gray-600 leading-10 hover:text-[#ff7701] transition ease-in-out  hover:scale-105"
          >
            SPARES
          </NavLink>
          <HoverCard>
            <HoverCardTrigger asChild>
              <NavLink
                to="/#Repairs"
                className="block px-3 py-2 text-base text-gray-600  hover:text-[#ff7701]"
              >
                REPAIRS
              </NavLink>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto flex flex-col gap-y-4 bg-gray-100">
              <div className="flex flex-col">
                <div className="h-10 border-b mb-2">
                  We Offer the following Services
                </div>
                <div className="h-8 border-b mb-2">1: Screen Replacement</div>
                <div className="h-8 border-b mb-2">2: Battery Replacement</div>
                <div className="h-8 border-b mb-2">
                  3: Camera Repair & Replacement
                </div>
                <div className="h-8 border-b mb-2">4: Charging Port Repair</div>
                <div className="h-8 border-b mb-2">5: Water Damage Repair</div>
                <div className="h-8 border-b mb-2">
                  6: Software Troubleshooting
                </div>
                <div className="h-8 border-b mb-2">
                  7: Button Repair (power, volume, home button)
                </div>
                <div className="h-8">8: Speaker or Microphone Repair</div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <NavLink
            to="/cart"
            className="flex items-center text-gray-600 leading-10 hover:text-[#ff7701] transition ease-in-out hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-600 leading-10 hover:text-[#ff7701] transition ease-in-out  hover:scale-105"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </NavLink>
          <NavLink
            to="/track"
            className="leading-10 px-2 bg-gray-100  transition ease-in-out hover:text-[#ff7701]"
          >
            <button className="flex items-center gap-x-2">
              <MapIcon size={16} />
              <span>TRACK ORDER</span>
            </button>

          </NavLink>
          <span className="flex gap-x-2 place-items-center">
            <NavLink to="/signin">Sign In</NavLink>/
            <NavLink to="/signup">Sign Up</NavLink>
          </span>
        </div>
        <div className="md:hidden mr-4">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gray-100`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/shop"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#ff7701] hover:bg-gray-200"
          >
            SHOP
          </NavLink>
          <NavLink
            to="/shop?category=phone"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#ff7701] hover:bg-gray-200"
          >
            SMARTPHONES
          </NavLink>
          <NavLink
            to="/shop?category=accessory"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#ff7701] hover:bg-gray-200"
          >
            ACCESSORIES
          </NavLink>
          <NavLink
            to="/shop?category=lifestyle"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#ff7701] hover:bg-gray-200"
          >
            LIFESTYLE
          </NavLink>
          <NavLink
            to="/shop?category=covers_protectors"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#ff7701] hover:bg-gray-200"
          >
            COVERS
          </NavLink>
          <NavLink
            to="/#Spares"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#ff7701] hover:bg-gray-200"
          >
            SPARES
          </NavLink>
          <HoverCard>
            <HoverCardTrigger asChild>
              <NavLink
                to="/#Repairs"
                className="block px-3 py-2 w-full text-left rounded-md text-base font-medium text-gray-600 hover:text-[#ff7701] hover:bg-gray-200"
              >
                REPAIRS
              </NavLink>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto flex flex-col gap-y-4 bg-gray-100">
              <div className="h-10 border-b mb-2">
                We Offer the following Services
              </div>
              <div className="h-8 border-b mb-2">1: Screen Replacement</div>
              <div className="h-8 border-b mb-2">2: Battery Replacement</div>
              <div className="h-8 border-b mb-2">
                3: Camera Repair & Replacement
              </div>
              <div className="h-8 border-b mb-2">4: Charging Port Repair</div>
              <div className="h-8 border-b mb-2">5: Water Damage Repair</div>
              <div className="h-8 border-b mb-2">
                6: Software Troubleshooting
              </div>
              <div className="h-8 border-b mb-2">
                7: Button Repair (power, volume, home button)
              </div>
              <div className="h-8">8: Speaker or Microphone Repair</div>
            </HoverCardContent>
          </HoverCard>
          <NavLink
            to="/track"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#ff7701] hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span>TRACK ORDER</span>
          </NavLink>
          <NavLink
            to="/cart"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#ff7701] hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-600 leading-10 hover:text-[#ff7701] transition ease-in-out  hover:scale-105"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <span>Cart</span>
          </NavLink>
          <span className="flex gap-x-2 place-items-center">
            <NavLink to="/signin">Sign In</NavLink>/
            <NavLink to="/signup">Sign Up</NavLink>
          </span>
        </div>
      </div>
    </nav>
  );
};

export function Header() {
  return (
    <div id="Header" className="sticky top-0 z-20 bg-gray-100">
      <NavBar />
    </div>
  );
}
