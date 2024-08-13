import { IProduct } from "@defines/index";
import { API_URL, formatPrice } from "@utils/index";
import PropTypes, { string } from "prop-types";
import { Link } from "react-router-dom";

const ItemCard = (props: IProduct) => {
  return (
    <Link
      to={`/product?product_id=${props.product_id}`}
      className="product-card max-w-[300px] bg-white shadow-lg
      overflow-hidden transition-transform transform hover:scale-105
      w-[266px]
      border-[1px]
      border-white
      rounded-[2px]
      shadow-[0 4px 6px rgba(0,0,0,0, 0.1)]
      m-5
      "
    >
      <div className="h-[200px]">
        <img
          src={`${API_URL}/images/?id=${props.product_image}`}
          alt="Product Image"
          className="
          product-image transition-transform
          duration-500 hover:scale-110
          w-full
          h-[200px]
          object-cover
          "
        />
      </div>
      <div className="product-details p-4">
        <p className="product-title text-xl font-bold text-red-600 text-nowrap w-[266px] pr-4 mb-3">
          {props.product_name?.substr(0, 30)}
        </p>
        <p className="product-price text-lg font-bold text-green-600 mb-2">
          {props.product_unit_price && (
            <span className="px-2 py-1 text-center">
              {formatPrice(props.product_unit_price)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

ItemCard.propTypes = {
  product_id: PropTypes.string,
  rom: PropTypes.string,
  ram: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  product_name: PropTypes.string,
  product_unit_price: PropTypes.number,
  product_category: PropTypes.string,
  available_colors: PropTypes.arrayOf(string),
  product_image: PropTypes.string,
  brand: PropTypes.string,
  model: PropTypes.string,
  battery: PropTypes.string,
  cameras: PropTypes.string,
  processor: PropTypes.string,
  display: PropTypes.string,
};

export default ItemCard;
