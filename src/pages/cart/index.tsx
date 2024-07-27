import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCartItem, clearCart, deleteCartItem, removeCartItem } from '../../redux/cart.slice';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { RootState } from '../../redux/store';

interface CartItem {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (id: number) => {
    dispatch(deleteCartItem(id));
  };

  const onAdd = (item: CartItem) => {
    dispatch(addCartItem(item));
  };

  const onDel = (id: number) => {
    dispatch(removeCartItem(id));
  };

  const [isPurchased, setIsPurchased] = useState(false);

  const handlePurchase = () => {
    setIsPurchased(true);
    toast.success('You have successfully purchased', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  return (
    <div className="container mx-auto text-center">
      <div className='flex justify-between'>
        <div className='flex items-end gap-5'>
          <h2 className='text-4xl font-bold '>Cart</h2>
          <p>{cartItems.length}  Product</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {cartItems.map(item => (
          <div key={item.id} className="flex relative flex-col md:flex-row gap-3 items-center p-4 justify-between border border-opacity-15 border-amber-400 rounded-xl">
            <img src={item.image} alt={item.title} className="w-64 h-64 object-cover mb-4" />
            <div className='w-full'>
              <p className="text-lg font-bold mb-2">{item.description}</p>
              <div className='flex justify-between items-center'>
                <div>
                  <p className="text-gray-600 mb-2">Price: ${item.price}</p>
                  <p className="text-gray-600 mb-2">Count: {item.quantity}</p>
                </div>
                {cartItems.some((el) => el.id === item.id) ? (
                  <div className="flex items-center w-[120px] p-1 rounded-md justify-between border">
                    <button
                      onClick={() => onDel(item.id)}
                      className="text-4xl font-bold"
                    >
                      -
                    </button>
                    <p className="text-2xl">
                      {item.quantity}
                    </p>
                    <button
                      onClick={() => onAdd(item)}
                      className="text-4xl font-bold"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onAdd(item)}
                    className="p-2 rounded-md bg-yellow-400"
                  >
                    <i className="fa-solid fa-cart-arrow-down"></i>
                  </button>
                )}
              </div>
            </div>
            <div className='h-full flex flex-col justify-between'>
              <button onClick={() => handleRemoveItem(item.id)} className="text-gray-500 flex text-sm absolute top-2 right-2"><DeleteIcon /></button>
            </div>
          </div>
        ))}
      </div>
      {
        cartItems.length > 0 ?
        <button 
          className='h-[44px] text-white max-w-[143px] bg-[#FF9910] border-none rounded-md font-medium p-2 mt-3'
          onClick={() => {
            handlePurchase();
            dispatch(clearCart());
          }}
        >
          Buy all
        </button> :
        <Link 
          className='h-[44px] text-white max-w-[143px] bg-[#FF9910] border-none rounded-md font-medium p-2 mt-3'
          href={'/'}
        >
          Continue trade
        </Link>
      }
      <ToastContainer />
    </div>
  );
};

export default Cart;
