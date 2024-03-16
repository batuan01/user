import axios from "axios";
import Cookies from "js-cookie";
import React, { ReactNode, createContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState();
  const [load, setLoad] = useState(false);

  const contextValue = {
    isShowLogin,
    setIsShowLogin,
    breadcrumb,
    setBreadcrumb,
    load,
    setLoad,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
