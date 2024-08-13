import { useState, useEffect } from "react";
import { fetchProducts } from "@providers/products";
import { IProduct } from "@defines/index";
import type { SearchProps } from "antd/es/input/Search";
import ProductForm from "@pages/ProductForm";
import ProductList from "@pages/ProductList";
import { Button } from "@shadcn-ui/button";
import { HiOutlinePlus as AddProductIcon } from "react-icons/hi2";
import { Modal, Input } from "antd";
// import { NavLink } from "react-router-dom";

const { Search } = Input;

export default function Products() {
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };

    getProducts();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div className="">
      <div className="flex justify-end items-center gap-x-4 h-24 px-4">
        <Search
          placeholder="Search Keyword"
          onSearch={onSearch}
          className="w-96"
        />
        <Button onClick={showModal} className="flex gap-x-2 bg-blue-800">
          <AddProductIcon size={16} />
          <span>New Product</span>
        </Button>
      </div>
      <div className="px-6 border-b-[1px] border-gray-400 min-h-dvh">
        <ProductList data={products} />
      </div>
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        destroyOnClose
        maskClosable
      >
        <div className="flex justify-center">
          <ProductForm action="new" product={null} />
        </div>
      </Modal>
    </div>
  );
}
