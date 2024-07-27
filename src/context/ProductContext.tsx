// context/ProductContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext<any>(null);

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  const addProduct = async (newProduct: any) => {
    const response = await axios.post('https://fakestoreapi.com/products', newProduct);
    setProducts((prevProducts) => [...prevProducts, response.data]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
