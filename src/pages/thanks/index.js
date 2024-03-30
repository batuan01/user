import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../components/contexts/AuthContext";
import { PutOrderProduct } from "../../utils/auth";

const ThankForPurchase = () => {
  const router = useRouter();
  const query = router.query;
  const { setBreadcrumb, setLoad } = useContext(AuthContext);
  useEffect(() => {
    setBreadcrumb("Thanks");
  }, []);

  useEffect(() => {
    const payload = {
      order_id: Number(query.orderID),
      order_status: 2,
    };
    if (query.vnp_ResponseCode === "00") {
      PutOrderProduct(payload);
    }
  }, [query]);

  return (
    <div className="flex justify-center items-center">
      <div>
        <img src="/thanks.png" className="h-1/2 max-h-96 w-auto" />

        <div className="w-full flex justify-center p-10">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 border-solid hover:border-transparent rounded "
            onClick={() => router.push("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankForPurchase;
