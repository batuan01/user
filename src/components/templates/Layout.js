import { Footer } from "./Footer";
import { Header } from "./Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname;

  const whiteList = ["/signin"];
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        {!whiteList.includes(pathname) ? (
          <>
            <Header />
            {children}
            <Footer />
          </>
        ) : (
          <>{children}</>
        )}
      </AuthProvider>
    </>
  );
};
