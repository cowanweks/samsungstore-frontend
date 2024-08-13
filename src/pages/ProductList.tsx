import { useState } from "react";
import { IProduct } from "@defines/index";
import { formatPrice } from "@utils/index";
import { Table, Tag, TableColumnsType, message } from "antd";
import {
  HiOutlineEye as ViewIcon,
  HiOutlineTrash as DeleteIcon,
  HiOutlinePencilSquare as EditIcon,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { Modal } from "antd";
import ProductForm from "@pages/ProductForm";
import { deleteProduct } from "@providers/products";

export default function ProductList({ data }: { data: Array<IProduct> }) {
  // Product table
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const rowSelection = {
    // onChange: (selectedRowKeys: React.Key[], selectedRows: IProduct[]) => { },
    getCheckboxProps: (record: IProduct) => ({
      disabled: record.product_name === "Disabled Product", // Column configuration not to be checked
      name: record.product_name,
    }),
  };
  const products = data;

  products.map((product) =>
    Object.assign(product, { key: product.product_id }),
  );

  const showModal = (product: IProduct) => {
    setSelectedProduct(product)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handledeleteProduct = async (product_id: string | null) => {
    const response = await deleteProduct(product_id);

    if (response == true) {
      messageApi.open({
        type: "success",
        content: "Item deleted successfully!",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Item could not be deleted!",
      });
    }
  };

  const columns: TableColumnsType<IProduct> = [
    {
      dataIndex: "product_name",
      key: "product_name",
      title: "Name",
    },
    {
      dataIndex: "product_category",
      key: "product_category",
      title: "Category",
    },
    { dataIndex: "brand", key: "brand", title: "Brand" },
    { dataIndex: "model", key: "model", title: "Model" },
    { dataIndex: "in_stock", key: "in_stock", title: "Units in Stock" },
    {
      dataIndex: "product_unit_price",
      key: "product_unit_price",
      title: "Unit Price",
      render: (price: number) => formatPrice(price),
    },
    {
      title: "Available Colors",
      key: "available_colors",
      dataIndex: "available_colors",
      render: (colors: Array<string>) => {
        return (
          <>
            {colors.map((color: string, index: number) => (
              <Tag
                key={index}
                style={{ border: "1px solid rgba(0,0,0, 0.2)" }}
                color={color}
              >
                {color.toUpperCase()}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "product_id",
      render: (product_id, record) => (
        <span className="flex gap-x-6">
          <NavLink
            to={`/product?product_id=${product_id}`}
            title="View Product"
          >
            <ViewIcon size={16} className="cursor-pointer hover:scale-110" />
          </NavLink>
          <button onClick={() => showModal(record)} title="Edit Product">
            <EditIcon
              size={16}
              className="text-orange-500 cursor-pointer hover:scale-110"
            />
          </button>
          <DeleteIcon
            onClick={() => handledeleteProduct(product_id)}
            size={16}
            title="Delete Product"
            className="text-orange-500 cursor-pointer hover:scale-110"
          />
        </span>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        destroyOnClose
        maskClosable
        className="w-fit"
      >
        <div className="flex justify-center">
          <ProductForm action="update" product={selectedProduct} />
        </div>
      </Modal>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        dataSource={products}
        columns={columns}
      />
    </>
  );
}
