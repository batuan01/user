import axios from "axios";
import Cookies from "js-cookie";
import React, { ReactNode, createContext, useEffect, useState } from "react";

const ProductContext = createContext(undefined);

const ProductProvider = ({ children }) => {
  const [isListProduct, setIsListProduct] = useState([]);

  const storedIdCustomer = Cookies.get("id_customer");
  let IdCustomer;
  if (storedIdCustomer) {
    IdCustomer = atob(storedIdCustomer);
  }

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     const dataCart = await ListCarts({id: IdCustomer});
  //     setIsListProduct(dataCart);
  //   };
  //   if (IdCustomer) {
  //     fetchCart();
  //   }
  // }, [IdCustomer, searchParams]);
  // console.log(searchParams);
  
  const contextValue = {
    isListProduct,
    setIsListProduct,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
