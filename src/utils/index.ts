import { type ClassValue, clsx } from "clsx";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";

// const API_URL: string = "http://127.0.0.1:3001/api";

const API_URL: string =
  "https://samsungrepair-backend-35d7356462b8.herokuapp.com/api";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { cn, API_URL };

export const formatPrice = (amount: number | undefined) => {
  const price = amount == undefined ? 0.0 : amount;

  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  }).format(price);
};

export async function createCart() {
  const cart_id = Cookies.get("cart_id");

  if (cart_id) {
    try {
      const checkResponse = await fetch(`${API_URL}/check_cart/${cart_id}`, {
        method: "GET",
      });

      if (checkResponse.ok) {
        const checkData = await checkResponse.json();

        if (!checkData.exists) {
          // If cart ID does not exist in database, create a new one
          await createNewCart();
        }
      } else {
        // If the API call fails, create a new cart
        await createNewCart();
      }
    } catch (error) {
      console.error("Error checking cart:", error);
      // If there's an error checking the cart, create a new one
      await createNewCart();
    }
  } else {
    // If no cart ID exists in cookies, create a new one
    await createNewCart();
  }

  return cart_id;
}

async function createNewCart() {
  try {
    const createResponse = await fetch(`${API_URL}/create_cart`, {
      method: "GET",
    });

    if (createResponse.ok) {
      const createData = await createResponse.json();

      if (createData.cart_id) {
        Cookies.set("cart_id", createData.cart_id);
        return createData.cart_id;
      } else {
        console.error("No cart_id in response");
      }
    } else {
      console.error("Failed to create new cart:", createResponse.statusText);
    }
  } catch (error) {
    console.error("Error creating new cart:", error);
  }
}
