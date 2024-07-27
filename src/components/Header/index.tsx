import { Button } from "@mui/material";
import React, { useState } from "react";
import SearchInput from "./SearchInput";
import CatagoriesList from "../Catagories";
import Router from "next/router";
import Link from "next/link";
import ThemeToggleButton from "../UI/ThemeToggleButton";
import { Add } from "@mui/icons-material";
import AddProduct from "../AddProduct";

const Header: React.FC = () => {
  const [addNew, setAddNew] = useState(false)
  return (
    <>
      <div className="sticky top-0 z-50 backdrop-blur-3xl shadow-md">
        <div className="h-[72px] flex justify-between items-center px-3 xl:px-16">
          <Link href={"/"}>
            <p className="text-3xl font-bold">InterntTask</p>
          </Link>
          <div className="hidden xl:flex">
            <div className="w-[80px] h-[46px] flex-row items-center cursor-pointer"></div>
            <div
              className="w-[80px] h-[46px] flex-row items-center cursor-pointer"
              onClick={() => Router.push("/favourites")}
            >
              <span className="w-[24px] h-[24px] m-[28px]">
                <i className="fa-regular fa-heart"></i>
              </span>
              <p className="text-[12px] text-center">Favourites</p>
            </div>
            <div
              className="w-[80px] h-[46px] flex-row items-center cursor-pointer"
              onClick={() => Router.push("/cart")}
            >
              <span className="w-[24px] h-[24px] m-[28px]">
                <i className="fa-solid fa-cart-arrow-down"></i>
              </span>
              <p className="text-[12px] text-center">Cart</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-row items-center cursor-pointer">
              <ThemeToggleButton />
            </div>
            <CatagoriesList width={"517px"} />
          </div>
          <div className="hidden lg:block">
            <SearchInput className={"w-[517px]"} />
          </div>

          <div className={"hidden 2xl:flex"}>
            <Button
              className="text-gray-800 text-[22px]"
              variant="text"
              sx={{
                color: "gray",
                fontSize: "22px",
                width: "30px",
                height: "46px",
              }}
              onClick={()=> setAddNew(true)}
            >
              <Add className="p-1 border rounded-full"/>
            </Button>
            <Button
              className="text-gray-800 text-[22px]"
              variant="text"
              sx={{
                color: "gray",
                fontSize: "22px",
                width: "30px",
                height: "46px",
              }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </Button>
          </div>
          {addNew && (
        <div
          className="absolute w-full h-screen top-0 left-0 bg-black/50 backdrop-blur-3xl flex items-center justify-center"
          onClick={() => setAddNew(false)}
        >
         
            <AddProduct />
          
        </div>
      )}
        </div>
      </div>
    </>
  );
};

export default Header;
