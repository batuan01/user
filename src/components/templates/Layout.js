import { Footer } from "./Footer";
import { Header } from "./Header";
import { useRouter } from "next/router";

export const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname;

  const whiteList = ["/signin"];
  return (
    <>
      {!whiteList.includes(pathname) ? (
        <>
          <Header />
          {children}
          <Footer />
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
