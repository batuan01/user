import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Cookies from "js-cookie";
import {
  GetCustomerDetail,
  GetOrderProduct,
  PutOrderProduct,
  UpdateCustomer,
} from "../../utils/auth";
import { Tab } from "@headlessui/react";
import { FcBusinessman, FcSurvey } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { InputFormUser } from "../atoms/Input";
import { UploadInfoImage } from "../molecules/UploadInfoImage";
import { ButtonModal } from "../atoms/Button";
import { FormatPrice } from "../atoms/FormatPrice";
import { ConvertFirebase } from "../../utils/firebase";
import Notification from "../atoms/Notification";
import { TruncateText } from "../atoms/TruncateText";
import Link from "next/link";
import { FaArrowRightFromBracket } from "react-icons/fa6";

export const Account = () => {
  const { setLoad, setBreadcrumb } = useContext(AuthContext);
  const [typeForm, setTypeForm] = useState(false);
  const [selectedFilesInfo, setSelectedFilesInfo] = useState([]);
  const [dataInfo, setDataInfo] = useState();
  const [dataOrder, setDataOrder] = useState();
  const [isReload, setIsReload] = useState(false);
  const [isReloadOrder, setIsReloadOrder] = useState(false);

  const router = useRouter();
  const params = router.query;

  useEffect(() => {
    setBreadcrumb("Account");
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    methods,
    control,
    formState: { errors },
  } = useForm();

  const storedIdCustomer = Cookies.get("id_customer");
  let IdCustomer;
  if (storedIdCustomer) {
    IdCustomer = atob(storedIdCustomer);
  }
  useEffect(() => {
    const fetchAccount = async () => {
      const dataUser = await GetCustomerDetail({ customer_id: IdCustomer });
      setLoad(false);
      setDataInfo(dataUser);
    };

    if (IdCustomer) {
      fetchAccount();
    }
  }, [IdCustomer, isReload]);

  useEffect(() => {
    reset({
      customer_fullname: dataInfo?.customer_fullname,
      customer_phone: dataInfo?.customer_phone,
    });
    if (dataInfo) {
      setSelectedFilesInfo([dataInfo?.customer_image]);
    }
  }, [dataInfo]);

  const allCardsName = [
    "All",
    "Wait for pay",
    "Transport",
    " Waiting for delivery",
    "Complete",
    "Cancelled",
  ];

  const noProduct = (
    <div className="flex justify-center flex-col gap-10 items-center w-full h-full py-10">
      <img
        src="https://taphoa.cz/static/media/cart-empty-img.8b677cb3.png"
        className="w-[50%]"
      />
      <p className="font-semibold">No orders yet</p>
    </div>
  );

  useEffect(() => {
    const fetchOrder = async () => {
      const dataOrder = await GetOrderProduct({ customer_id: IdCustomer });
      setLoad(false);
      setDataOrder(dataOrder);
    };

    if (IdCustomer) {
      fetchOrder();
    }
  }, [IdCustomer, isReloadOrder]);

  const getColorName = (colorId) => {
    const color = dataOrder?.colors?.find((item) => item.color_id === colorId);
    return color ? color.color_name : "";
  };

  const handleReturnorRefund = async (id) => {
    setLoad(true);
    const payload = {
      order_id: Number(id),
      order_status: 5,
    };
    await PutOrderProduct(payload);
    Notification.success("Cancel order successfully!");
    setLoad(false);
    setIsReloadOrder(!isReloadOrder);
  };

  const ListProduct = (data) => {
    return (
      <>
        {data.map((item, index) => (
          <div className="" key={index}>
            <div className="flex justify-between text-lg font-semibold px-10 border-b border-solid py-2">
              <p className="w-1/2">Product</p>
              <p className="w-1/4 text-center">Shipping</p>
              <p className="w-1/4 text-right">Price</p>
            </div>

            {item.order_detail.map((detail, detailIndex) => (
              <Link href={"/product/" + detail.product_id}>
                <div
                  className="flex items-center justify-between p-5 hover:bg-[#e0caca] hover:scale-105 hover:shadow-lg transform transition duration-300 cursor-pointer border-b border-solid"
                  key={detailIndex}
                >
                  <div className="flex gap-4 w-1/2">
                    <img src={detail.product_image} className="w-16 h-auto" />
                    <div>
                      <p className="text-base font-semibold mb-1">
                        {TruncateText(detail.product_name, 50)}
                      </p>
                      <p className="text-sm font-medium mb-1">
                        {getColorName(detail.color_id)}
                      </p>
                      <p className="text-sm font-medium">
                        x{detail.product_sales_quantity}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/4 text-center">
                    <p>
                      <span className="font-semibold mr-1">
                        {item.shipping.shipping_name}
                      </span>
                      |
                      <span className="ml-1">
                        {item.shipping.shipping_phone}
                      </span>
                    </p>
                    <p>{item.shipping.shipping_address}</p>
                    <p>{item.shipping.shipping_notes}</p>
                  </div>

                  <p className="w-1/4 text-right">
                    {FormatPrice(detail.product_price)}
                  </p>
                </div>
              </Link>
            ))}

            <div className="flex justify-between items-center gap-4 p-3 bg-[#ffe6c7] mb-3">
              <div>
                {item.order_status === 1 || item.order_status === 2 ? (
                  <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 border-solid hover:border-transparent rounded "
                    onClick={() => handleReturnorRefund(item.order_id)}
                  >
                    Request a Return/Refund
                  </button>
                ) : null}
              </div>
              <p>
                <span>Total payment:</span>{" "}
                <span className="font-bold text-2xl text-[#ff6000]">
                  {FormatPrice(item.order_total)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </>
    );
  };

  const handleUpdateAccount = async (data) => {
    setLoad(true);
    let urlInfo;
    if (typeof selectedFilesInfo[0] === "object") {
      urlInfo = await ConvertFirebase({ images: selectedFilesInfo });
    } else {
      urlInfo = selectedFilesInfo;
    }

    const dataSend = {
      customer_id: IdCustomer,
      customer_phone: data.customer_phone || "",
      customer_fullname: data.customer_fullname || "",
      customer_image: urlInfo[0] || "",
    };
    await UpdateCustomer(dataSend);
    setLoad(false);
    Notification.success("Create slider successfully!");
    setIsReload(!isReload);
  };

  const Signout = () => {
    Cookies.remove("token");
    Cookies.remove("id_customer");
    router.push("/");
  };

  return (
    <div className="mx-20 my-10 min-w-[1200px]">
      <div className="flex justify-start gap-10 items-start">
        <div className="w-1/6">
          <div className=" flex gap-2 items-center">
            <img
              src={
                dataInfo?.customer_image ??
                "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
              }
              alt="avt"
              className="rounded-full w-10 h-10"
            />
            <p>{dataInfo?.customer_fullname || ""}</p>
          </div>
          <div className="mt-5">
            <ul>
              <li
                className="flex items-center gap-2 cursor-pointer bg-slate-300 p-2 rounded-md"
                onClick={() => setTypeForm(false)}
              >
                <FcBusinessman className="w-7 h-7" />
                <span>Account</span>
              </li>
              <li
                className="flex items-center gap-2 mt-3 cursor-pointer bg-slate-300 p-2 rounded-md"
                onClick={() => setTypeForm(true)}
              >
                <FcSurvey className="w-7 h-7" />
                <span>Purchase Order</span>
              </li>
              <li
                className="flex items-center gap-4 mt-3 cursor-pointer bg-slate-300 p-2 rounded-md"
                onClick={Signout}
              >
                <FaArrowRightFromBracket className="w-5 h-5" />
                <span>Signout</span>
              </li>
            </ul>
          </div>
        </div>
        {typeForm ? (
          <div className="flex-grow">
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
                <Tab.Panels className="mt-2 min-h-[370px] bg-white">
                  <Tab.Panel>
                    {dataOrder?.data.length > 0
                      ? ListProduct(dataOrder.data)
                      : noProduct}
                  </Tab.Panel>
                  <Tab.Panel>
                    {dataOrder?.data.filter((item) => item.order_status === 1)
                      .length > 0
                      ? ListProduct(
                          dataOrder.data.filter(
                            (item) => item.order_status === 1
                          )
                        )
                      : noProduct}
                  </Tab.Panel>
                  <Tab.Panel>
                    {dataOrder?.data.filter((item) => item.order_status === 2)
                      .length > 0
                      ? ListProduct(
                          dataOrder.data.filter(
                            (item) => item.order_status === 2
                          )
                        )
                      : noProduct}
                  </Tab.Panel>
                  <Tab.Panel>
                    {dataOrder?.data.filter((item) => item.order_status === 3)
                      .length > 0
                      ? ListProduct(
                          dataOrder.data.filter(
                            (item) => item.order_status === 3
                          )
                        )
                      : noProduct}
                  </Tab.Panel>
                  <Tab.Panel>
                    {dataOrder?.data.filter((item) => item.order_status === 4)
                      .length > 0
                      ? ListProduct(
                          dataOrder.data.filter(
                            (item) => item.order_status === 4
                          )
                        )
                      : noProduct}
                  </Tab.Panel>
                  <Tab.Panel>
                    {dataOrder?.data.filter((item) => item.order_status === 5)
                      .length > 0
                      ? ListProduct(
                          dataOrder.data.filter(
                            (item) => item.order_status === 5
                          )
                        )
                      : noProduct}
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(handleUpdateAccount)}
            className="flex-grow"
          >
            <div className="bg-white w-full h-full">
              <div className="p-8 border-b-slate-600 border-solid border-b-2">
                <p className="font-medium text-xl text-black">My profile</p>
                <p>Manage profile information for account security</p>
              </div>
              <div className="p-10 flex">
                <div className="border-r-2 border-solid border-r-slate-300 w-3/4 pr-10">
                  <div className="flex gap-5 items-center my-2 pb-3">
                    <p className="w-[150px] text-right">Username</p>
                    <p className="text-gray">{dataInfo?.customer_name}</p>
                  </div>
                  <div className="flex gap-5 items-center my-2">
                    <p className="w-[150px] text-right">Full Name</p>
                    <div className="flex-grow">
                      <InputFormUser
                        register={register("customer_fullname", {
                          required: "Customer fullname cannot be left blank",
                        })}
                        type="text"
                        placeholder={"Customer fullname"}
                        errors={errors}
                        name={"customer_fullname"}
                      />
                    </div>
                  </div>
                  <div className="flex gap-5 items-center my-2">
                    <p className="w-[150px] text-right">Phone Number</p>
                    <div className="flex-grow">
                      <InputFormUser
                        register={register("customer_phone")}
                        type="text"
                        placeholder={"Customer phone"}
                        errors={errors}
                        name={"customer_phone"}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-1/4">
                  <UploadInfoImage
                    name={"Upload  Image"}
                    selectedFiles={selectedFilesInfo}
                    setSelectedFiles={setSelectedFilesInfo}
                  />
                </div>
              </div>
              <div className="pl-[210px] pb-10">
                <ButtonModal
                  title={"Save"}
                  type={"submit"}
                  sizeSm={true}
                  className={"w-20 bg-[#ff6000]"}
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
