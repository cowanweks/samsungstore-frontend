import { useEffect, useState } from 'react';
import { Button } from '@shadcn-ui/button';
import { HiPlus as AddIcon, HiMinus as MinusIcon } from 'react-icons/hi2';
import { ICartItem } from '@defines/index';
import { API_URL } from '@utils/index';
import { formatPrice } from '@utils/index';

export default function CartItem({ item }: { item: ICartItem }) {

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {

    const fetchCartItemQuantity = async () => {
      const response = await fetch(`${API_URL}/cart/get_quantity/${item.item_id}`);

      if (!response.ok) {
        throw Error('Item not found ' + response.body);
      }

      const response_data = await response.json();
      setQuantity(response_data.quantity);
    };

    fetchCartItemQuantity();
  }, [item]);

  const updateQuantity = async (newQuantity: number) => {
    setQuantity(newQuantity);

    const formData = new FormData();
    formData.append('quantity', `${newQuantity}`);
    formData.append('item_id', `${item.item_id}`);

    const response = await fetch(`${API_URL}/cart/update_quantity`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw Error('Could not update product quantity in the cart');
    }
  };

  const handleMinusClick = () => {

    if (quantity > 1) {
      updateQuantity(quantity - 1);
    }

  };

  const handlePlusClick = () => {

    if (quantity < item.in_stock) {
      updateQuantity(quantity + 1);
    }

    console.log(quantity)
    console.log(item.in_stock)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0 && newQuantity <= item.in_stock) {
      updateQuantity(newQuantity);
    }
  };

  return (
    <div
      id="CartItem"
      className="grid grid-cols-1 gap-y-6 md:grid-cols-2 border-b-2 bg-white py-8 px-4 shadow-lg transition-transform transform"
    >
      <div className="max-h-[56.25vw] lg:col-span-1">
        <img src={`${API_URL}/images/?id=${item.product_image}`} alt={item.product_name} />
      </div>
      <div className="description flex flex-col gap-y-2 px-8">
        <h2 className="text-black">{item.product_name}</h2>
        {item.in_stock <= 10 && <p className="text-red-500">Only {item.in_stock} items left in stock</p>}
        <div className="specifications flex flex-col gap-y-4">
          <p>
            <b>Color: </b>{item.color}
          </p>
          <p>
            <b>Brand: </b> {item.brand}
          </p>
          <p>
            <b>Model: </b> {item.model}
          </p>
          <p className="flex items-center gap-x-2">
            <b>Quantity:</b>
            <span className="flex gap-x-2">
              <Button onClick={handleMinusClick}>
                <MinusIcon />
              </Button>
              <input
                min={1}
                max={item.in_stock}
                type="number"
                value={quantity}
                disabled
                onChange={handleInputChange}
                className="w-16 rounded-[5px] px-2 text-center border-[1px] border-black select-none"
              />
              <Button onClick={handlePlusClick}>
                <AddIcon />
              </Button>
            </span>
          </p>
        </div>
      </div>
      <div className="font-bold text-right col-span-2 text-green-600 px-10">{formatPrice(item.product_unit_price)}</div>
    </div>
  );
}
