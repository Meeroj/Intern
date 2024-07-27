import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { productsCategories } from "../../services/productsService"
import Link from "next/link";
import { useDispatch } from "react-redux";
import { changeCategory } from "../../redux/category.slice"
import SearchInput from "../Header/SearchInput";
import { useRouter } from "next/router"; // Corrected import

const CategoriesList: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredCatalog, setHoveredCatalog] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const res = await productsCategories();
    console.log(res);
    setCategories(res);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setHoveredCatalog(null);
  };

  const handleCategoryChange = (category: string) => {
    dispatch(changeCategory(category));
    setMobileOpen(false);
    setHoveredCatalog(null);
    router.push(`/categories/${category}`);
  };

  return (
    <div className="">
      <button
        className="h-[44px] text-white max-w-[143px] bg-[#FF9910] border-none rounded-md font-medium flex items-center justify-center gap-2 p-4"
        onClick={handleDrawerToggle}
      >
        {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        <p className="hidden xl:block">Categories</p>
      </button>
      <div
        className={`absolute top-[57px] left-0 w-[300px] h-[100vh] bg-[#F6F6F6] shadow-2xl z-40 overflow-y-auto transition-transform duration-300 transform ${
          mobileOpen ? "translate-x-0" : "translate-x-[-350px]"
        }`}
      >
        <div className="ml-[28px]">
          <Link
            className="h-[56px] flex rounded-l-[8px] text-black items-center cursor-pointer hover:bg-white pl-4 capitalize"
            href={`/`}
            onClick={() => handleCategoryChange("all")}
          >
            All
          </Link>
          {categories.map((el, index) => (
            <Link
              key={index}
              className="h-[56px] flex rounded-l-[8px] text-black items-center cursor-pointer hover:bg-white pl-4 capitalize"
              href={`/categories/${el}`}
              onClick={() => handleCategoryChange(el)}
            >
              {el}
            </Link>
          ))}
        </div>
        <div className="block lg:hidden">
          <SearchInput className={"w-[215px] ms-2"} />
        </div>
        <div className="flex xl:hidden mt-4 justify-evenly">
          <Link href={"/favourites"} className="w-[80px] h-[46px] flex-row items-center cursor-pointer">
            <span className="w-[24px] h-[24px] m-[28px]">
              <i className="fa-regular fa-heart"></i>
            </span>
            <p className="text-[12px] text-center">Favourites</p>
          </Link>
          <Link href={"/cart"} className="w-[80px] h-[46px] flex-row items-center cursor-pointer">
            <span className="w-[24px] h-[24px] m-[28px]">
              <i className="fa-solid fa-cart-arrow-down"></i>
            </span>
            <p className="text-[12px] text-center">Cart</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
