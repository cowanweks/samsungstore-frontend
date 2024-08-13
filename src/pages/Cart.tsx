import { useEffect, useState } from "react";
import Map from "@sections/Map";
import { Header } from "@sections/Header";
import Footer from "@sections/Footer";
import { Button } from "@shadcn-ui/button";
import { API_URL, formatPrice } from "@utils/index";
import Cookies from "js-cookie";
import { useForm, SubmitHandler } from "react-hook-form"
import { ICartItem } from "@defines/index";
import CartItem from "@components/cartitem/CartItem";

type Inputs = {

  first_name: string,
  middle_name: string,
  last_name: string,
  street_address: string,
  city: string,
  zip_code: string,
  state_or_province: string,
  email_address: string,
  phone_number: string,
  mpesa_number: string

}

export default function Cart() {

  const [subTotal, setSubTotal] = useState(0.0);
  const [cartItems, setCartItems] = useState<Array<ICartItem>>([]);
  const [waitTransaction, setWaitTransaction] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const cartId = Cookies.get("cart_id");

  useEffect(() => {

    if (cartId != undefined) {

      const fetchCartData = async () => {

        try {

          const response = await fetch(`${API_URL}/cart/${cartId}`, {
            method: "GET",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setCartItems(data);

        } catch (error) {

          console.error("Error fetching cart data:", error);

        }
      };

      fetchCartData();

    } else {
      console.log("Cart ID is undefined")
    }
  }, [cartId])


  useEffect(() => {
    const subTotal = getCartTotal(cartItems);
    setSubTotal(subTotal);
  }, [cartItems]);


  const checkOutCart: SubmitHandler<Inputs> = async (data) => {

    const form = new FormData();

    form.append("first_name", data.first_name)
    form.append("middle_name", data.middle_name)
    form.append("last_name", data.last_name)
    form.append("email_address", data.email_address)
    form.append("phone_number", data.phone_number)
    form.append("street_address", data.street_address)
    form.append("city", data.city)
    form.append("state_or_province", data.state_or_province)
    form.append("zip_code", data.zip_code)
    form.append("mpesa_number", data.mpesa_number)

    const response = await fetch(`${API_URL}/cart/checkout/${cartId}`,
      {
        method: "POST",
        body: form,
      });

    if (!response.ok) {
      throw new Error("Error " + response.body);
    }

    setWaitTransaction(true);
  }

  function getCartTotal(cart: Array<ICartItem>) {
    return cart.reduce((total, item) => total + item.quantity * item.product_unit_price, 0);
  }


  return (
    <div id="Cart" className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[100vh] px-4 lg:px-16 py-8 lg:gap-x-2">
        <div className="col-span-2 flex flex-col gap-y-2">
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            cartItems.map((item, index) => <CartItem key={index} item={item} />)
          ) : (
            <div className="h-24 leading-10 text-gray-700">No items in cart</div>
          )}
        </div>
        <div className="flex flex-col gap-8">
          <form onSubmit={handleSubmit(checkOutCart)} className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-4 p-6 items-center justify-center rounded-lg bg-white shadow-md">
              <h2 className="text-black">
                Subtotal ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""}):{" "}
                <span className="font-bold">{formatPrice(subTotal)}</span>
              </h2>
              <Button
                disabled={waitTransaction}
                type="submit"
                className="w-full hover:scale-105 transition-transform"
              >
                Checkout
              </Button>
            </div>
            <h2 className="text-lg font-semibold">Shipping Information</h2>
            <label htmlFor="first_name" className="flex flex-col gap-y-2">
              <span>FirstName</span>
              <input id="first_name"
                {...register("first_name", { required: true })}
                className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"/>
              {errors.first_name && <span className="text-red-500">This field is required</span>}
            </label>
            <label htmlFor="middle_name" className="flex flex-col gap-y-2">
              <span>Middle Name</span>
              <input id="middle_name"
                {...register("middle_name", { required: true })}
                className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"/>
              {errors.middle_name && <span className="text-red-500">This field is required</span>}
            </label>
            <label htmlFor="last_name" className="flex flex-col gap-y-2">
              <span>Last Name</span>
              <input id="last_name"
                {...register("last_name", { required: true })}
                className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"/>
              {errors.last_name && <span className="text-red-500">This field is required</span>}
            </label>
            <label htmlFor="email_address" className="flex flex-col gap-y-2">
              <span>Middle Name</span>
              <input id="email_address"
                {...register("email_address", { required: true })}
                className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"/>
              {errors.email_address && <span className="text-red-500">This field is required</span>}
            </label>
            <label htmlFor="phone_number" className="flex flex-col gap-y-2">
              <span>Phone Number</span>
              <input id="phone_number"
                {...register("phone_number", { required: true })}
                className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"/>
              {errors.phone_number && <span className="text-red-500">This field is required</span>}
            </label>
            <label htmlFor="street_address" className="flex flex-col gap-y-2">
              <span>Street Address</span>
              <input id="street_address"
                {...register("street_address", { required: true })}
                className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"/>
              {errors.street_address && <span className="text-red-500">This field is required</span>}
            </label>
            <label htmlFor="city" className="flex flex-col gap-y-2">
              <span>City</span>
              <input id="city"
                {...register("city", { required: true })}
                className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"/>
              {errors.city && <span className="text-red-500">This field is required</span>}
            </label>
            <label htmlFor="state_or_province" className="flex flex-col gap-y-2">
              <span>State or Province</span>
              <input id="state_or_province"
                {...register("state_or_province", { required: true })}
                className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"/>
              {errors.state_or_province && <span className="text-red-500">This field is required</span>}
            </label>
            <label htmlFor="mpesa_number" className="flex flex-col gap-y-2">
              <span>Mpesa Number</span>
              <input id="mpesa_number"
                {...register("mpesa_number", { required: true })}
                className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"/>
              {errors.mpesa_number && <span className="text-red-500">This field is required</span>}
            </label>
          </form>
        </div>
      </div>
      <Map />
      <Footer />
    </div>
  );
}
