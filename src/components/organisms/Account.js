import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Cookies from "js-cookie";
import {
  GetCustomerDetail,
  GetOrderProduct,
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

export const Account = () => {
  const { setLoad } = useContext(AuthContext);
  const [typeForm, setTypeForm] = useState(false);
  const [selectedFilesInfo, setSelectedFilesInfo] = useState([]);
  const [dataInfo, setDataInfo] = useState();
  const [dataOrder, setDataOrder] = useState();
  const [isReload, setIsReload] = useState(false);

  const router = useRouter();
  const params = router.query;

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
    "Return/Refund",
  ];

  const noProduct = (
    <div className="flex justify-center flex-col gap-10 items-center w-full h-full pt-10">
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
      console.log(dataOrder);
    };

    if (IdCustomer) {
      fetchOrder();
    }
  }, [IdCustomer]);

  const listProduct = ({ data }) => {
    return (
      <div className="transform transition duration-300 hover:scale-105 hover:shadow-lg">
        <div className="flex items-center justify-between  p-5 bg-[#f2e8e8]">
          <div className="flex gap-4">
            <img
              src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTFz6ITuCujVMoiuvRoLEQyHVwXFHkfqtWSMe5wU9783RN_v7DS7T-Pk_VDpVSK3qlwTBGJQrbdHpQ8L2EWFkXJSJdAevX2AmcATX41O-wGG94SCZ0gz1O6XHv1vmCikozSnb9BJ2bhiw&usqp=CAc"
              className="w-16 h-auto"
            />
            <p className="text-sm font-medium">123123</p>
          </div>
          <p>{FormatPrice(20000)}</p>
        </div>
        <div className="flex justify-end items-center gap-4 p-3 bg-[#ffe6c7] mb-3">
          <p className="">Thành tiền:</p>
          <p className="font-bold text-2xl text-[#ff6000]">
            {FormatPrice(20000)}
          </p>
        </div>
      </div>
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

  return (
    <div className="container mb-10 mt-10 min-w-[1200px]">
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
                  <Tab.Panel>{listProduct}</Tab.Panel>
                  <Tab.Panel className="h-full">
                    <div className="w-full h-full">{noProduct}</div>
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
