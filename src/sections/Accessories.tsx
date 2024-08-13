import { useEffect, useState } from "react";
import ItemCard from "@components/itemcard/ItemCard";
import { IProduct } from "@defines/index";
import { fetchProductsByCategory } from "@providers/products";
import { HiMenu as MenuIcon, HiX as CloseIcon } from "react-icons/hi";

export default function Accessories() {
  const [data, setData] = useState<IProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {

      const response_data = await fetchProductsByCategory("accessory");

      setData(response_data);
    };

    fetchData();
  }, []);

  const items = data.slice(0, 8);

  return (
    <section id="Accessories" className="min-h-dvh px-4 py-8">
      <div className="bg-white shadow-md">
        <div className="container mx-auto mb-16 border px-6 py-3 flex justify-between items-center">
          <h1 className="font-bold text-lg">ACCESSORIES</h1>
          <div className="md:hidden z-10">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
          <ul
            className={`flex-col md:flex md:flex-row font-medium gap-x-6 absolute md:static w-full md:w-auto bg-white md:bg-transparent ${isOpen ? "flex" : "hidden"} md:flex`}
          >
            <a
              onClick={toggleMenu}
              href=""
              className="text-[#ff7701] cursor-pointer hover:text-[#ff7701] my-0 leading-10"
            >
              <li className="py-2 md:py-0 px-6 md:px-0">ALL</li>
            </a>
            <a
              onClick={toggleMenu}
              href=""
              className="my-0 leading-10 cursor-pointer hover:text-[#ff7701]"
            >
              <li className="py-2 md:py-0 px-6 md:px-0">GEARS & DEVICES</li>
            </a>
            <a
              onClick={toggleMenu}
              href=""
              className="my-0 leading-10 cursor-pointer hover:text-[#ff7701]"
            >
              <li className="py-2 md:py-0 px-6 md:px-0">AUDIO</li>
            </a>
            <a
              onClick={toggleMenu}
              href=""
              className="my-0 leading-10 cursor-pointer hover:text-[#ff7701]"
            >
              <li className="py-2 md:py-0 px-6 md:px-0">CAMERA & VISUAL</li>
            </a>
            <a
              onClick={toggleMenu}
              href=""
              className="my-0 leading-10 cursor-pointer hover:text-[#ff7701]"
            >
              <li className="py-2 md:py-0 px-6 md:px-0">
                POWERBANK & CHARGING
              </li>
            </a>
          </ul>
        </div>
      </div>
      <div
        className="accessories flex flex-col items-center
        sm:flex-row sm:items-start flex-wrap gap-1 pt-4"
      >
        {items.length > 0
          ? items.map((item, index) => (
            <ItemCard
              key={index}
              product_id={item.product_id}
              display={item.display}
              battery={item.battery}
              brand={item.brand}
              cameras={item.cameras}
              description={item.description}
              in_stock={item.in_stock}
              model={item.model}
              ram={item.ram}
              rom={item.rom}
              processor={item.processor}
              product_category={item.product_category}
              product_name={item.product_name}
              product_unit_price={item.product_unit_price}
              product_image={item.product_image}
              available_colors={item.available_colors}
            />
          ))
          : ""}
      </div>
      {items.length > 0 ? (
        <div className="flex items-center justify-center my-8">
          <a
            href="/shop?category=accessory"
            className="h-14 leading-[12px] p-4 text-xl rounded-none bg-white text-black border-2 border-[#ff7701]
				hover:bg-white hover:border-blue-500"
          >
            LOAD MORE PRODUCTS
          </a>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
