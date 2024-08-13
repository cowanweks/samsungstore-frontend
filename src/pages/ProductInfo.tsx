import Footer from "@sections/Footer";
import { Header } from "@sections/Header";
import Map from "@sections/Map";
import { FaCartPlus as AddCartIcon } from "react-icons/fa6";
import {
  HiOutlineInformationCircle as WarnIcon,
  HiOutlineStar as RateIcon,
} from "react-icons/hi2";
import { Button } from "@shadcn-ui/button";
import { API_URL, formatPrice } from "@utils/index";
import { createCart } from "@utils/index";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcn-ui/dialog";
import { useEffect, useState } from "react";
import { HiOutlineCheckCircle as SuccessIcon } from "react-icons/hi2";
import PlaceHolderPic from "@public/600x400.svg";
import { IProduct } from "@defines/index";
import Cookies from "js-cookie";

function ProductInformation() {
  const url = new URL(document.URL);
  const [proceedCart, setProceedCart] = useState(false);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [outOfStock, setOutOfStock] = useState(true);
  const product_id = url.searchParams.get("product_id");

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `${API_URL}/products?product_id=${product_id}`,
      );

      if (!response.ok) {
        throw new Error("Error: " + response.body);
      }

      const data: IProduct = await response.json();

      setProduct(data);
      setOutOfStock(data.in_stock === 0);
    };

    fetchProduct();
  }, [product_id]);

  async function addToCart(product_id: string | null) {
    const formData = new FormData();
    await createCart();

    if (product_id == null) {
      throw new Error("Product ID is undefined");
    }

    const cart_id: string | undefined = Cookies.get("cart_id");

    console.log(cart_id);

    formData.append("product_id", `${product_id}`);
    formData.append("cart_id", `${cart_id}`);
    formData.append("quantity", "1");
    formData.append("color", "black");

    const response = await fetch(`${API_URL}/cart/${cart_id}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Could not add item to cart" + response.body);
    } else {
      setProceedCart(true);
    }
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-dvh bg-white px-4 py-8 lg:px-16">
      <img
        src={
          product?.product_image
            ? `${API_URL}/images/?id=${product?.product_image}`
            : PlaceHolderPic
        }
        alt={product?.product_name || "Product Image"}
        className="w-full h-auto object-cover rounded-lg shadow-md"
      />
      <div className="flex flex-col gap-y-4 px-4 py-10">
        <h1 className="text-2xl font-semibold">{product?.product_name}</h1>
        <p className="text-gray-700">
          Brand: <span className="text-black">{product?.brand}</span>
        </p>
        <p className="text-gray-700">
          Model: <span className="text-black">{product?.model}</span>
        </p>
        <p className="text-xl text-red-500">
          {product && formatPrice(product.product_unit_price)}
        </p>
        <p
          className={`flex items-center gap-x-2 py-2 ${outOfStock ? "text-red-500" : "text-green-500"}`}
        >
          {outOfStock ? (
            <span>Unit out of Stock!</span>
          ) : (
            <>
              {product?.in_stock && product.in_stock < 10 && (
                <>
                  <WarnIcon size={16} className="text-red-500" />
                  <span className="text-red-500">
                    Only {product.in_stock} units left
                  </span>
                </>
              )}
            </>
          )}
        </p>
        <div id="rate_card" className="flex gap-x-1 py-4">
          <RateIcon className="fill-orange-400 stroke-none" size={24} />
          <RateIcon className="fill-orange-400 stroke-none" size={24} />
          <RateIcon className="fill-orange-400 stroke-none" size={24} />
          <RateIcon className="fill-orange-400 stroke-none" size={24} />
          <RateIcon className="fill-gray-300 stroke-none" size={24} />
        </div>
        <div className="available_colors flex gap-x-2 py-4">
          {product?.available_colors && product.available_colors.length > 0 ? (
            product.available_colors.map((color: string, index: number) => (
              <button
                type="button"
                title=""
                key={index}
                className={`inline-block cursor-pointer h-12 w-12 rounded-full border-2 transition-transform ${
                  selectedColor === color
                    ? "border-gray-400 scale-105"
                    : "border-transparent"
                }`}
                style={{ background: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))
          ) : (
            <span>No colors available</span>
          )}
        </div>

        <Dialog open={proceedCart}>
          <Button
            disabled={product?.in_stock ? product.in_stock === 0 : true}
            onClick={() => {
              if (product?.product_id != null) {
                addToCart(product.product_id);
              }
            }}
            className="flex items-center gap-x-4 h-12 w-full bg-[#ff7701] hover:bg-[#ff7701] hover:opacity-80"
          >
            <AddCartIcon size={16} />
            <span>ADD TO CART</span>
          </Button>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="py-4">Proceed to Cart</DialogTitle>
              <DialogDescription className="flex gap-x-4 py-2">
                <SuccessIcon className="stroke-green-500" size={32} />
                <span>
                  Successfully added item to cart! Would you like to proceed to
                  cart
                </span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row gap-x-2 justify-start">
              <a href="/cart">
                <Button variant="default">Proceed to Cart</Button>
              </a>
              <DialogClose asChild>
                <a href="/shop">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setProceedCart(false)}
                  >
                    Continue Shopping
                  </Button>
                </a>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="product_details flex flex-col gap-y-4 py-4">
          <h2 className="pb-4 border-b-2">Product Details</h2>
          {product?.product_category !== "phone" && (
            <>
              {product?.ram && (
                <p className="flex gap-x-2 text-gray-500">
                  RAM: <span className="text-red-500">{product.ram}</span>
                  {product.rom && (
                    <>
                      {" "}
                      ROM: <span className="text-red-500">{product.rom}</span>
                    </>
                  )}
                </p>
              )}
              {product?.display && (
                <div className="flex gap-x-2 text-gray-500">
                  Display:{" "}
                  <span className="text-red-500">{product.display}</span>
                </div>
              )}
              {product?.battery && (
                <div className="flex gap-x-2 text-gray-500">
                  Battery:{" "}
                  <span className="text-red-500">{product.battery}</span>
                </div>
              )}
              {product?.cameras && (
                <div className="flex gap-x-2 text-gray-500">
                  Camera:{" "}
                  <span className="text-red-500">{product.cameras}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ProductInfo() {
  return (
    <div className="bg-gray-200">
      <Header />
      <ProductInformation />
      <Map />
      <Footer />
    </div>
  );
}
