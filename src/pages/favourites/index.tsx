import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store'; // Update with your actual path
import { deleteFavourites, addCartItem, removeCartItem, addFavourites } from '../../redux/cart.slice';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp'; // Import this icon
import { Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import Image from 'next/image';
import Router from 'next/router';

interface Product {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

const Favourites: React.FC = () => {
  const { items, favourites } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const onAdd = (product: Product) => {
    dispatch(addCartItem(product));
  };

  const onDel = (id: string) => {
    dispatch(removeCartItem(id));
  };

  return (
    <div className="container mx-auto">
      <div className='flex justify-between'>
        <div className='flex items-end gap-5'>
          <h2 className='text-4xl font-bold '>Favourites</h2>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-3">
          {favourites?.map((product: Product) => (
            <div className="min-h-[468px] min-w-[260px] rounded-[12px] bg-card-bg text-card-foreground border border-amber-400 shadow-xl" key={product.id}>
              <div className="h-[284px] flex items-center justify-center relative bg-white rounded-[12px] rounded-b-none">
                <div
                  onClick={() => Router.push(`/products/${product.id}`)}
                  className="relative w-[220px] h-[220px] cursor-pointer"
                >
                  <Image
                    src={product.image}
                    layout="fill"
                    quality={100}
                    objectFit="contain"
                    alt={product.title}
                  />
                </div>
                <div className="absolute top-5 right-5 cursor-pointer">
                  {favourites?.some((item: any) => item.id === product.id) ? (
                    <FavoriteSharpIcon
                      className="text-red-500"
                      onClick={() => dispatch(deleteFavourites(product.id))}
                    />
                  ) : (
                    <FavoriteBorderSharpIcon
                      className="text-gray-500"
                      onClick={() => dispatch(addFavourites(product))}
                    />
                  )}
                </div>
              </div>
              <div className="px-[16px]">
                <p className="text-[#7E7E83] leading-[24px] text-[16px]">
                  {product.category}
                </p>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.title}
                </Typography>
                <div className="h-[20px] w-[123px] flex items-center">
                  {[...Array(4)].map((_, index) => (
                    <Star key={index} sx={{ color: "#F8C51B", width: "14.26px" }} />
                  ))}
                  <Star sx={{ color: "#c8c8ce", width: "14.26px" }} />
                  <p className="font-medium text-[12px] ml-[8px] mt-1">52</p>
                </div>
                <div className="flex items-center gap-[5px]">
                  <div className="w-[102px] rounded-[12px] px-[8px] text-[12px] font-medium text-[#FFFFFF] my-[10px] bg-[#FF9910]">
                    <p>1 000 000 сум</p>
                  </div>
                  <p className="text-[12px] font-medium text-[#7E7E83]">x 12 мес</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[20px]  font-semibold">
                    {product.price} $
                  </p>
                  <div>
                    {items.some((item: any) => item.id === product.id) ? (
                      <div className="flex items-center w-[120px] p-1 rounded-md justify-between border">
                        <button
                          onClick={() => onDel(product.id)}
                          className="text-4xl font-bold"
                        >
                          -
                        </button>
                        <p className="text-2xl">
                          {items.find((item: any) => item.id === product.id)?.quantity || 0}
                        </p>
                        <button
                          onClick={() => onAdd(product)}
                          className="text-4xl font-bold"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAdd(product)}
                        className="p-2 rounded-md bg-yellow-400"
                      >
                        <i className="fa-solid fa-cart-arrow-down"></i> To Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
