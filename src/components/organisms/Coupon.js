import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GetAllCoupon } from "../../utils/auth";
import { FormatPrice } from "../atoms/FormatPrice";
import Notification from "../atoms/Notification";

export const Coupon = () => {
  const { load, setLoad } = useContext(AuthContext);
  const [coupon, setCoupon] = useState();
  // call api get all cart
  useEffect(() => {
    const fetchCoupon = async () => {
      const dataCoupon = await GetAllCoupon();
      setCoupon(dataCoupon.data.data);
      setLoad(false);
    };
    fetchCoupon();
  }, []);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      Notification.success("Coupon copied to clipboard!");
    } catch (error) {
      alert("Error copying to clipboard:", error);
    }
  };
  return (
    <>
      <div className="mx-32 px-10 my-10 bg-white shadow-xl border-[1px] border-solid border-slate-200">
        <div className="py-10">
          <h1 className="text-center font-bold text-2xl">COUPON</h1>
          <p className="text-center">
            (Each order can only use one discount code)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-5">
          {coupon?.map((item, index) => (
            <div
              key={index}
              className="col-span-1 p-4 shadow-xl border-[1px] border-solid border-slate-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    Coupon Code: {item.coupon_code}
                  </p>
                  <p>Discount: {FormatPrice(item.coupon_discount)}</p>
                  <p>Expired: {item.coupon_expiry_date}</p>
                  <p>Quantity: {item.coupon_quantity}</p>
                </div>
                <div>
                  <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={() => copyToClipboard(item.coupon_code)}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
