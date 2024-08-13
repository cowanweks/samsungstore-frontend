import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
} from "@shadcn-ui/pagination";
import { Header } from "@sections/Header";
import Footer from "@sections/Footer";
import Map from "@sections/Map";
import ItemCard from "@components/itemcard/ItemCard";
import { IProduct } from "@defines/index";
import { useEffect, useState } from "react";
import { API_URL } from "@utils/index";
import { useSearchParams } from "react-router-dom";

export default function Shop() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async (category: string | null) => {
      if (category == null) {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        setProducts(products);
      } else {
        const response = await fetch(
          `${API_URL}/products/?category=${category}`,
        );
        const products = await response.json();
        setProducts(products);
      }
    };

    fetchProducts(category);
  }, [category]);

  return (
    <div id="Shop" className="bg-gray-200">
      <Header />
      <div className="flex flex-col sm:flex-row">
        <div className="h-28 mt-12">Hello this is the filter component</div>
        <>
          <div className="flex flex-col items-center justify-start sm:flex-row sm:items-start flex-wrap  gap-2 pt-4">
            {products.length > 0
              ? products.map((item, index) => (
                  <ItemCard
                    key={index}
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
                    product_id={item.product_id}
                    product_category={item.product_category}
                    product_name={item.product_name}
                    product_unit_price={item.product_unit_price}
                    product_image={item.product_image}
                  />
                ))
              : ""}
            <Pagination className="h-16 py-16 flex justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" className="text-gray-500" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="bg-[#ff7701] text-[#c5c6c7]"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="text-gray-500">
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="text-gray-500">
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" className="text-gray-500" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      </div>
      <Map />
      <Footer />
    </div>
  );
}
