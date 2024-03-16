import { useContext, useEffect } from "react";
import { AllProducts } from "../../../components/organisms/ListProduct";
import { AuthContext } from "../../../components/contexts/AuthContext";
import { LoadingAllPage } from "../../../components/atoms/Loading";

const Categories = () => {
  const { load, setLoad } = useContext(AuthContext);
  useEffect(() => {
    setLoad(true);
  }, []);
  return (
    <>
      <LoadingAllPage isOpen={load} setIsOpen={setLoad} />
      <div className="container mx-auto pb-10">
        <AllProducts category={true} />
      </div>
    </>
  );
};
export default Categories;
