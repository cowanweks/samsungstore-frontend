import { API_URL } from "@utils/index";
import { IProduct } from "@defines/index";

export const fetchProducts = async (): Promise<Array<IProduct>> => {
  /**
    Fetch product information
  */

  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw Error("HTTP ERROR: " + response.body);
  }

  const response_data = await response.json();

  return response_data;
};

export const fetchProductsByCategory = async (
  category: string
): Promise<Array<IProduct>> => {
  /**
    Fetch products by their category
  */

  const products = await fetchProducts();

  if (products.length == 0) return products;

  const filteredProducts = products.filter(
    (product) => product.product_category == category
  );

  return filteredProducts;
};

export const fetchProductById = async (
  product_id: string
): Promise<IProduct> => {
  /**
    Fetch products by ID
  */

  const products = await fetchProducts();

  if (products.length == 0) return products[0];

  const filteredProducts = products.filter(
    (product) => product.product_id == product_id
  );

  return filteredProducts[0];
};

export const newProduct = async (productData: Partial<IProduct>) => {
  /**
    Update a product with the provided id
  */

  const form = new FormData();

  if (productData.ram != undefined) form.append("ram", `${productData.ram}`);
  if (productData.rom != undefined) form.append("rom", `${productData.rom}`);
  if (productData.brand != undefined)
    form.append("brand", `${productData.brand}`);
  if (productData.model != undefined)
    form.append("model", `${productData.model}`);
  if (productData.battery != undefined)
    form.append("battery", `${productData.battery}`);
  if (productData.display != undefined)
    form.append("display", `${productData.display}`);
  if (productData.in_stock != undefined)
    form.append("in_stock", `${productData.in_stock}`);
  if (productData.processor != undefined)
    form.append("processor", `${productData.processor}`);
  if (productData.description != undefined)
    form.append("description", `${productData.description}`);
  if (productData.product_name != undefined)
    form.append("product_name", `${productData.product_name}`);
  if (
    productData.product_image != undefined &&
    productData.product_image instanceof File
  )
    form.append("product_image", productData.product_image);
  if (productData.product_category != undefined)
    form.append("product_category", `${productData.product_category}`);
  if (productData.product_unit_price != undefined)
    form.append("product_unit_price", `${productData.product_unit_price}`);
  if (productData.available_colors != undefined)
    form.append(
      "available_colors",
      JSON.stringify(productData.available_colors)
    );

  const response = await fetch(`${API_URL}/products`, {
    body: form,
    method: "POST",
  });

  if (!response.ok) {
    console.log("HTTP Error: " + response.body);
    return false;
  }

  return true;
};

export const updateProduct = async (
  productId: string | null | undefined,
  updatedData: Partial<IProduct>
) => {
  /**
    Update a product with the provided id
  */

  if (productId == null || productId == undefined) {
    throw Error("Product ID is null!");
  }

  const form = new FormData();

  form.append("ram", `${updatedData.ram}`);
  form.append("rom", `${updatedData.rom}`);
  form.append("brand", `${updatedData.brand}`);
  form.append("model", `${updatedData.model}`);
  form.append("battery", `${updatedData.battery}`);
  form.append("display", `${updatedData.display}`);
  form.append("in_stock", `${updatedData.in_stock}`);
  form.append("processor", `${updatedData.processor}`);
  form.append("description", `${updatedData.description}`);
  form.append("product_name", `${updatedData.product_name}`);
  form.append("product_image", `${updatedData.product_image}`);
  form.append("product_category", `${updatedData.product_category}`);
  form.append("product_unit_price", `${updatedData.product_unit_price}`);
  form.append("available_colors", JSON.stringify(updatedData.available_colors));

  const response = await fetch(`${API_URL}/products?product_id`, {
    body: form,
    method: "PUT",
  });

  if (!response.ok) {
    console.log("HTTP Error: " + response.body);
    return false;
  }

  return true;
};

export const deleteProduct = async (
  productId: string | null
): Promise<boolean> => {
  /**
    Delete a product using the provided product Id
  */

  if (productId == null) {
    throw Error("Product ID is null!");
  }

  const response = await fetch(`${API_URL}/products?product_id=${productId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.log("HTTP Error: " + response.body);
    return false;
  }

  return true;
};
