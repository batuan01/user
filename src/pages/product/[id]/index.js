import { useContext, useEffect } from "react";
import { ProductDetail } from "../../../components/organisms/ProductDetail";
import { AuthContext } from "../../../components/contexts/AuthContext";
import { LoadingAllPage } from "../../../components/atoms/Loading";

export const metadata = {
  title: "Technology",
  description: "Generated by create next app",
};
const ProductDetailPage = () => {
  const { load, setLoad } = useContext(AuthContext);
  useEffect(() => {
    setLoad(true);
  }, []);
  return (
    <>
      <LoadingAllPage isOpen={load} setIsOpen={setLoad} />
      <div className="">
        <ProductDetail />
      </div>
    </>
  );
};
export default ProductDetailPage;
