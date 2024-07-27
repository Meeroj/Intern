import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import Image from "next/image";
import { Star } from "@mui/icons-material";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import { Typography } from "@mui/material";
import { deleteFavourites, addCartItem, removeCartItem, addFavourites } from '../../../redux/cart.slice';
import { RootState } from "../../..//redux/store"; // Add RootState import

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}

const CategoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const categoryName = useSelector((state: RootState) => state.categoryName.category);

  useEffect(() => {
    if (categoryName) {
      axios
        .get(`https://fakestoreapi.com/products/category/${categoryName}`)
        .then((res) => {
          setProducts(res.data);
        });
    }
  }, [categoryName]);

  const { items, favourites } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const onAdd = (product: Product) => {
    dispatch(addCartItem(product));
  };

  const onDel = (id: number) => {
    dispatch(removeCartItem(id));
  };

  return (
    <div className="max-w-[1320px] m-auto mt-[32px]">
      <div>
        <p className="font-semibold text-[40px] capitalize">{categoryName}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-3">
        {products.map((product) => (
          <div
            className="min-h-[468px] min-w-[260px] rounded-[12px] bg-card-bg text-card-foreground border border-amber-400 shadow-xl"
            key={product.id}
          >
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
                {favourites.some((item: Product) => item.id === product.id) ? (
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
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
                <p className="text-[20px] text-[#0D0D0D] font-semibold">
                  {product.price} $
                </p>
                <div>
                  {items.some((item: Product) => item.id === product.id) ? (
                    <div className="flex items-center w-[120px] p-1 rounded-md justify-between border">
                      <button
                        onClick={() => onDel(product.id)}
                        className="text-4xl font-bold"
                      >
                        -
                      </button>
                      <p className="text-2xl">
                        {items.find((item: Product) => item.id === product.id)?.quantity || 0}
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
  );
};

export default CategoryPage;
