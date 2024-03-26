import { useContext, useEffect } from "react";
import { AuthContext } from "../../components/contexts/AuthContext";
import { CheckoutForm } from "../../components/organisms/CheckoutForm";
import { LoadingAllPage } from "../../components/atoms/Loading";

const CheckoutPage = () => {
  const { load, setLoad } = useContext(AuthContext);
  useEffect(() => {
    setLoad(true);
  }, []);
  return (
    <>
      <LoadingAllPage isOpen={load} setIsOpen={setLoad} />
      <div className="container mx-auto py-10">
        <CheckoutForm />
      </div>
    </>
  );
};
export default CheckoutPage;
