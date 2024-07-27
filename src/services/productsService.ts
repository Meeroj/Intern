import { request } from "./httpRequest";

export const fetchProducts = (params) => request({method: "get", url: "", params });
export const fetchProductById = async (id) => {
    try {
      console.log('jetti')
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  };
  

export const productsCategories = (params) => request({method: "get", url: "categories", params });