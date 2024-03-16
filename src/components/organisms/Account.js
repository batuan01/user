import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Cookies from "js-cookie";
import { GetCustomerDetail } from "../../utils/auth";
import { Tab } from "@headlessui/react";
import { FcBusinessman, FcSurvey } from "react-icons/fc";

export const Account = () => {
  const { setLoad } = useContext(AuthContext);
  const router = useRouter();
  const params = router.query;
  const storedIdCustomer = Cookies.get("id_customer");
  let IdCustomer;
  if (storedIdCustomer) {
    IdCustomer = atob(storedIdCustomer);
  }
  useEffect(() => {
    const fetchAccount = async () => {
      const dataUser = await GetCustomerDetail({ customer_id: IdCustomer });
      setLoad(false);
      //   setDetailProduct(dataDetail);
      //   setBreadcrumb(dataDetail?.data.product_name);
    };

    if (IdCustomer) {
      fetchAccount();
    }
  }, [IdCustomer]);

  const allCardsName = [
    "All",
    "Wait for pay",
    "Transport",
    " Waiting for delivery",
    "Complete",
    "Cancelled",
    "Return/Refund",
  ];

  const noProduct = (
    <div className="flex justify-center flex-col gap-10 items-center w-full h-full pt-20">
      <img
        src="https://taphoa.cz/static/media/cart-empty-img.8b677cb3.png"
        className="w-[50%]"
      />
      <p className="font-semibold">No orders yet</p>
    </div>
  );
  return (
    <div className="container mb-10 mt-10 min-w-[1200px]">
      <div className="flex justify-start gap-10 items-start">
        <div className="w-1/6">
          <div className=" flex gap-2 items-center">
            <img
              src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
              alt="avt"
              className="rounded-full w-10 h-10"
            />
            <p>Tuan Nguyen</p>
          </div>
          <div className="mt-5">
            <ul>
              <li className="flex items-center gap-2 cursor-pointer bg-slate-300 p-2 rounded-md">
                <FcBusinessman className="w-7 h-7" />
                <span>Account</span>
              </li>
              <li className="flex items-center gap-2 mt-3 cursor-pointer bg-slate-300 p-2 rounded-md">
                <FcSurvey className="w-7 h-7" />
                <span>Purchase Order</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-grow ">
          <div className="w-full px-2 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex space-x-1 bg-white">
                {allCardsName.map((category, index) => (
                  <Tab
                    key={index}
                    className={({ selected }) =>
                      classNames(
                        "w-full p-3 border-0 font-semibold",
                        selected
                          ? "bg-white text-[#ff6000] border-b-4 border-solid border-[#ff6000]"
                          : "text-slate-500 hover:bg-white/[0.12] hover:text-slate-800"
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2 min-h-[400px] bg-white">
                <Tab.Panel>
                  <p className="mt-5">Thanh toán khi nhận hàng: Phí thu hộ:</p>
                  <p>
                    (Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu
                    hộ.)
                  </p>
                </Tab.Panel>
                <Tab.Panel className="h-full">
                  <div className="w-full h-full">{noProduct}</div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
