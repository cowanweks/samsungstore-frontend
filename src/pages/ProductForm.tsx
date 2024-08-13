import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@shadcn-ui/button";
import { useEffect, useState } from "react";
import Select from "react-select";
import {
  HiOutlinePlus as AddProductIcon,
  HiOutlinePencilSquare as EditIcon,
} from "react-icons/hi2";
import { message } from "antd";
import {
  newProduct,
  updateProduct,
} from "@providers/products";
import { IProduct } from "@defines/index";

enum ProductCategories {
  none,
  phone,
  accessory,
  lifestyle,
  covers_protectors,
}

export default function ProductForm({
  action = "new",
  product,
}: {
  action: "new" | "update";
  product: IProduct | null;
}) {

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IProduct>();
  const [messageApi, contextHolder] = message.useMessage();
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [productCategory, setProductCategory] =
    useState<ProductCategories | null>(ProductCategories.none);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  useEffect(() => {
    // Prefill form with product information
    if (action == "update") {
      if (product) {
        reset(product); // This will set the form values to the selected product

        if (product.product_category == "none") {
          setProductCategory(ProductCategories.none);
          setValue("product_category", product.product_category);
        } else if (product.product_category == "phone") {
          setProductCategory(ProductCategories.phone);
          setValue("product_category", product.product_category);
        } else if (product.product_category == "accessory") {
          setProductCategory(ProductCategories.accessory);
          setValue("product_category", product.product_category);
        } else if (product.product_category == "lifestyle") {
          setProductCategory(ProductCategories.lifestyle);
          setValue("product_category", product.product_category);
        } else if (product.product_category == "covers_protectors") {
          setProductCategory(ProductCategories.covers_protectors);
          setValue("product_category", product.product_category);
        } else {
          setProductCategory(null);
          setValue("product_category", null);
        }
      }
    }
  }, [product, reset, action, setValue, productCategory]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (event.target.value == "none") {
      setProductCategory(ProductCategories.none);
      setValue("product_category", event.target.value);
    } else if (event.target.value == "phone") {
      setProductCategory(ProductCategories.phone);
      setValue("product_category", event.target.value);
    } else if (event.target.value == "accessory") {
      setProductCategory(ProductCategories.accessory);
      setValue("product_category", event.target.value);
    } else if (event.target.value == "lifestyle") {
      setProductCategory(ProductCategories.lifestyle);
      setValue("product_category", event.target.value);
    } else if (event.target.value == "covers_protectors") {
      setProductCategory(ProductCategories.covers_protectors);
      setValue("product_category", event.target.value);
    } else {
      setProductCategory(null);
      setValue("product_category", null);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageURL(imageUrl);
      setSelectedFiles(files);
    }
  };

  const onSubmit: SubmitHandler<Partial<IProduct>> = async (data) => {
    /**
        Submit form
    */

    if (selectedFiles) {
      Object.assign(data, { product_image: selectedFiles[0] });
    }

    if (action == "new") {

      const response = await newProduct(data);

      if (!response) {
        messageApi.open({
          type: "error",
          content: "Item could not be Added!",
        });
      } else {

        messageApi.open({
          type: "success",
          content: "Item added successfully!",
        });

        reset({
          product_name: "",
          available_colors: [],
          battery: "",
          brand: "",
          cameras: "",
          description: "",
          display: "",
          in_stock: 0,
          model: "",
          processor: "",
          product_category: "none",
          product_image: null,
          product_unit_price: 0.0,
          ram: "",
          rom: ""
        })
        setImageURL(null);
        setProductCategory(ProductCategories.none)
      }
    } else {

      const response = await updateProduct(product?.product_id, data);

      if (!response) {
        messageApi.open({
          type: "error",
          content: "Item could not be Updated!",
        });
      } else {
        messageApi.open({
          type: "success",
          content: "Item updated successfully!",
        });
      }
    }
  };

  const colorOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
  ];

  return (
    <form
      id="ProductForm"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-10 w-[300px]"
    >
      {contextHolder}
      <label htmlFor="product_image" className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-4 justify-center items-center h-72 border-dashed border-2 border-gray-500 rounded-md">
          {imageURL ? (
            <img
              src={imageURL}
              alt="Product"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {errors.product_image ? (
                <span className="text-red-500 select-none">
                  Product Image is required
                </span>
              ) : (
                <span className="select-none">Select a Product Image</span>
              )}
            </>
          )}
        </div>
        <input
          id="product_image"
          type="file"
          {...register("product_image", { required: true })}
          onChange={handleImageChange}
          accept="image/jpeg,image/png,image/jpg,image/webp,image/avif,image/bmp"
          className="h-10 px-4 py-2 hidden"
        />
      </label>
      <label htmlFor="product_category" className="flex flex-col gap-y-2">
        <span className="select-none">Product Category</span>
        <select
          id="product_category"
          {...register("product_category", { required: true })}
          onChange={handleCategoryChange}
          className="h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"
        >
          <option value="none" className="">
            {" "}
            -- Select Product Category --{" "}
          </option>
          <option value="phone" className="">
            SmartPhone
          </option>
          <option value="accessory">Accessory</option>
          <option value="lifestyle">LifeStyle</option>
          <option value="covers_protectors">Covers & Protectors</option>
        </select>
        {errors.product_category && (
          <span className="text-red-500 select-none">
            This field is required
          </span>
        )}
      </label>

      {productCategory != ProductCategories.none && (
        <>
          <label htmlFor="product_name" className="flex flex-col gap-y-2">
            <span className="select-none">Product Name</span>
            <input
              id="product_name"
              {...register("product_name", { required: true })}
              className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"
            />
            {errors.product_name && (
              <span className="text-red-500 select-none">
                This field is required
              </span>
            )}
          </label>
          <label htmlFor="product_unit_price" className="flex flex-col gap-y-2">
            <span className="select-none">Unit Price</span>
            <input
              id="product_unit_price"
              type="number"
              min={1}
              {...register("product_unit_price", { required: true })}
              className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"
            />
            {errors.product_unit_price && (
              <span className="text-red-500 select-none">
                This field is required
              </span>
            )}
          </label>
          <label htmlFor="in_stock" className="flex flex-col gap-y-2">
            <span className="select-none">Units in Stock</span>
            <input
              id="in_stock"
              min={0}
              type="number"
              {...register("in_stock", { required: true })}
              className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"
            />
            {errors.in_stock && (
              <span className="text-red-500 select-none">
                This field is required
              </span>
            )}
          </label>
          <label htmlFor="model" className="flex flex-col gap-y-2">
            <span className="select-none">Model</span>
            <input
              id="model"
              {...register("model", { required: true })}
              className="
            h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"
            />
            {errors.model && (
              <span className="text-red-500 select-none">
                This field is required
              </span>
            )}
          </label>
          <label htmlFor="brand" className="flex flex-col gap-y-2">
            <span className="select-none">Brand</span>
            <input
              id="brand"
              {...register("brand", { required: true })}
              className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"
            />
            {errors.brand && (
              <span className="text-red-500 select-none">
                This field is required
              </span>
            )}
          </label>
          {productCategory == ProductCategories.phone && (
            <label htmlFor="battery" className="flex flex-col gap-y-2">
              <span className="select-none">Battery</span>
              <input
                id="battery"
                {...register("battery", { required: true })}
                className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"
              />
              {errors.battery && (
                <span className="text-red-500 select-none">
                  This field is required
                </span>
              )}
            </label>
          )}
          {productCategory == ProductCategories.phone && (
            <label htmlFor="cameras" className="flex flex-col gap-y-2">
              <span className="select-none">Camera Spec</span>
              <input
                id="cameras"
                {...register("cameras", { required: true })}
                className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"
              />
              {errors.cameras && (
                <span className="text-red-500 select-none">
                  This field is required
                </span>
              )}
            </label>
          )}
          {productCategory == ProductCategories.phone && (
            <label htmlFor="display" className="flex flex-col gap-y-2">
              <span className="select-none">Display</span>
              <input
                id="display"
                {...register("display", { required: true })}
                className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"
              />
              {errors.display && (
                <span className="text-red-500 select-none">
                  This field is required
                </span>
              )}
            </label>
          )}
          {productCategory == ProductCategories.phone && (
            <label htmlFor="ram" className="flex flex-col gap-y-2">
              <span className="select-none">RAM</span>
              <input
                id="ram"
                {...register("ram", { required: true })}
                className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"
              />
              {errors.ram && (
                <span className="text-red-500 select-none">
                  This field is required
                </span>
              )}
            </label>
          )}
          {productCategory == ProductCategories.phone && (
            <label htmlFor="rom" className="flex flex-col gap-y-2">
              <span className="select-none">ROM</span>
              <input
                id="rom"
                {...register("rom", { required: true })}
                className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"
              />
              {errors.rom && (
                <span className="text-red-500 select-none">
                  This field is required
                </span>
              )}
            </label>
          )}
          {productCategory == ProductCategories.phone && (
            <label htmlFor="rom" className="flex flex-col gap-y-2">
              <span className="select-none">Processors</span>
              <input
                id="processor"
                {...register("processor", { required: true })}
                className="
                h-10 px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"
              />
              {errors.processor && (
                <span className="text-red-500 select-none">
                  This field is required
                </span>
              )}
            </label>
          )}
          <label htmlFor="available_colors" className="flex flex-col gap-y-2">
            <span className="select-none">Available Colors</span>
            <Select
              id="available_colors"
              isMulti
              options={colorOptions}
              onChange={(selectedOptions) => {
                const values = selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : [];
                setValue("available_colors", values);
              }}
            />
            {errors.available_colors && (
              <span className="text-red-500 select-none">
                This field is required
              </span>
            )}
          </label>
          <label htmlFor="description" className="flex flex-col gap-y-2">
            <span className="select-none">Description</span>
            <textarea
              id="description"
              rows={6}
              maxLength={255}
              {...register("description", { required: true })}
              className="px-4 py-2 bg-white border-[1px] border-gray-500 rounded-md"
            ></textarea>
            {errors.description && (
              <span className="text-red-500 select-none">
                This field is required
              </span>
            )}
          </label>
        </>
      )}
      <div className="flex gap-x-2">
        <Button
          disabled={(action == "new") || (productCategory == ProductCategories.none) ? false : true}
          type="submit"
          className="flex gap-x-2 bg-green-600"
        >
          <AddProductIcon size={12} />
          <span className="select-none">Add Product</span>
        </Button>
        <Button
          disabled={action == "update" ? false : true}
          className="flex gap-x-2 bg-orange-500"
        >
          <EditIcon size={12} />
          <span className="select-none">Save Changes</span>
        </Button>
      </div>
    </form>
  );
}
