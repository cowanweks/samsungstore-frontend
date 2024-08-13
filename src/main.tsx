import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "@styles/index.scss";
import Cart from "@pages/Cart";
import Shop from "@pages/Shop";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import TrackOrder from "@pages/TrackOrder";
import Checkout from "@pages/Checkout";
import Admin from "@pages/Admin.tsx";
import ProductInfo from "@pages/ProductInfo";
import { PaymentSuccess } from "@pages/Payment";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Orders from "@pages/Orders";
import Products from "@pages/Products";

import React, { createContext, useContext, useState, ReactNode } from 'react';


interface ModalContextProps {
  isModalOpen: boolean;
  showModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);


export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, showModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/track",
    element: <TrackOrder />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
  {
    path: "/product",
    element: <ProductInfo />,
  },
  {
    path: "/paymentsuccess",
    element: <PaymentSuccess />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </React.StrictMode>,
);
