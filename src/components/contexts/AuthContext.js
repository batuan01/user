import axios from "axios";
import Cookies from "js-cookie";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { GetCartTotalQuantity } from "../../utils/auth";

const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState();
  const [load, setLoad] = useState(false);

  const [loadTotalCart, setLoadTotalCart] = useState(false);
  const [totalProductCart, setTotalProductCart] = useState();

  const contextValue = {
    isShowLogin,
    setIsShowLogin,
    breadcrumb,
    setBreadcrumb,
    load,
    setLoad,
    loadTotalCart,
    setLoadTotalCart,
    totalProductCart,
    setTotalProductCart,
  };

  const storedIdCustomer = Cookies.get("id_customer");
  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        id: Number(storedIdCustomer),
      };
      const totalProduct = await GetCartTotalQuantity(payload);
      setTotalProductCart(totalProduct);
    };
    if (storedIdCustomer) {
      fetchData();
    }
  }, [loadTotalCart]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
