import React, { useEffect, useState } from "react";
import { InputForm } from "../atoms/Input";
import { Controller, useForm } from "react-hook-form";
import { Select, pushData } from "../atoms/Select";
import { Listbox, RadioGroup, Tab } from "@headlessui/react";
import { Modal } from "../molecules/Modal";

import { TextRequired } from "../atoms/Text";
import { FormatPrice } from "../atoms/FormatPrice";
import { ListDistricts, ListProvinces, ListWards } from "../../utils/auth";

const shipping = [
  {
    name: "Giao Hàng Nhanh",
    img: "https://cdn.ntlogistics.vn/images/NTX/new_images/don-vi-giao-hang-nhanh-uy-tin-ghn-giao-hang-nhanh.jpg",
    time: "2-3 ngày",
    price: "25.000đ",
  },
  {
    name: "Giao Hàng Tiết Kiệm",
    img: "https://pos.nvncdn.com/4e732c-26/art/artCT/20181228_SbXO18pl4kMio4juj73bLjYK.png",
    time: "3-4 ngày",
    price: "20.000đ",
  },
  {
    name: "J&T Express",
    img: "https://pos.nvncdn.com/4e732c-26/art/artCT/20230227_wgp7wUbuOUJ7bTUG.png",
    time: "5-6 ngày",
    price: "15.000đ",
  },
];

const imgBank = [
  "https://cdn.tuoitre.vn/thumb_w/1200/471584752817336320/2023/2/23/62ce8018d5cacb6b28727421mb-bank-logo-1677142193380605336933.jpg",
  "https://danhbaict.vn/uploads/business/logo/business1619171978-logo%20170x125-01.jpg",
  "https://cafefcdn.com/203337114487263232/2023/12/1/screen-shot-2023-12-01-at-08-40-46-1701394890371130086612.png",
  "https://upload.wikimedia.org/wikipedia/vi/e/e5/Logo-Ngan_hang_Phuong_Dong.png",
  "https://zinpro.vn/public/images/images/tin-tuc/agribank.jpg",
  "https://apithanhtoan.com/wp-content/uploads/2020/08/Logo-ngan-hang-vietinbank.png",
  "https://image.tienphong.vn/w890/Uploaded/2024/Osgmky/5/ae7/5ae7fb4cb2e8118b45fe10e8778a2757.jpg",
  "https://419.vn/wp-content/uploads/2020/10/logo-Techcombank.jpg",
  "https://thebank.vn/uploads/2020/05/02/thebank_logotpbank_1588408748.jpg",
  "https://cdn.haitrieu.com/wp-content/uploads/2023/11/Logo-PVcombank.png",
];

export const CheckoutForm = ({
  setIsCheckout,
  dataSend,
  setDataSend,
  setIsBill,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(shipping[0]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [allProvince, setAllProvince] = useState();

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [allDistrict, setAllDistrict] = useState();

  const [selectedWards, setSelectedWards] = useState(null);
  const [allWards, setAllWards] = useState();

  const {
    register,
    handleSubmit,
    reset,
    methods,
    control,
    formState: { errors },
  } = useForm();

  const handleNextClick = () => {
    if (currentStep === 3) {
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePrevClick = () => {
    if (currentStep === 1) {
      return;
    }

    setCurrentStep(currentStep - 1);
  };

  const handleCloseCheckout = () => {
    setIsCheckout(false);
  };

  const arrNameStep = [
    "Personal Information",
    "Shipping Unit",
    "Payment Method",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ListProvinces();
        setAllProvince(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ListDistricts(selectedProvince);
        setAllDistrict(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedProvince) {
      fetchData();
    }
  }, [selectedProvince]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ListWards(selectedDistrict);
        setAllWards(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedDistrict) {
      fetchData();
    }
  }, [selectedProvince, selectedDistrict]);

  const ContentModal = [];

  ContentModal.push(
    <div className="flex justify-center items-center flex-col gap-5">
      <img
        src="https://scontent.fhan14-5.fna.fbcdn.net/v/t1.15752-9/430624647_3817558161796879_5055141579412754074_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=wjukGNWcFhIAX94WjY7&_nc_ht=scontent.fhan14-5.fna&oh=03_AdQnPdWDY8-qAs3AGmuHzJrWmqKNBirOesaWKQNQ4JJe6A&oe=66155E56"
        className="max-w-[200px]"
      />
      <p>Thông tin chuyển khoản ngân hàng</p>
      <p className="p-3 bg-slate-100">
        Vui lòng chuyển khoản với nội dung MUAHANG để chúng tôi xác nhận
      </p>
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="p-3 border border-gray-300 border-solid">
              Tên tài khoản
            </th>
            <th className="p-3 border border-gray-300 border-solid">
              Số tài khoản
            </th>
            <th className="p-3 border border-gray-300 border-solid">
              Ngân hàng
            </th>
            <th className="p-3 border border-gray-300 border-solid">Số tiền</th>
            <th className="p-3 border border-gray-300 border-solid">
              Nội dung
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border border-gray-300 border-solid">
              NGUYEN THI PHUONG
            </td>
            <td className="p-3 border border-gray-300 border-solid">
              12341234
            </td>
            <td className="p-3 border border-gray-300 border-solid">MB</td>
            <td className="p-3 border border-gray-300 border-solid">
              {FormatPrice(dataSend.order_total)}
            </td>
            <td className="p-3 border border-gray-300 border-solid">MUAHANG</td>
          </tr>
        </tbody>
      </table>

      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 border-solid hover:border-transparent rounded "
        onClick={() => {
          setIsBill(true);
          setDataSend({ ...dataSend, payment_id: 2 });
        }}
      >
        Payment completed
      </button>
    </div>
  );

  let ContentProvinces = [];
  pushData({
    arrayForm: ContentProvinces,
    data: allProvince?.provinces,
  });

  let ContentDistrict = [];
  pushData({
    arrayForm: ContentDistrict,
    data: allDistrict?.districts,
  });

  let ContentWards = [];
  pushData({
    arrayForm: ContentWards,
    data: allWards?.wards,
  });

  const onSubmit = (data) => {
    const shipping_info = {
      shipping_name: data.name,
      shipping_address: `${data.ward.name} , ${data.district.name}, ${data.province.name}`,
      shipping_phone: data.phonenumber,
      shipping_notes: data?.notes,
    };
    setDataSend({ ...dataSend, shipping_info });
    handleNextClick();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title">Checkout</h1>
        <div className={`step-${currentStep}`} id="checkout-progress">
          <div className="progress-bar">
            {arrNameStep.map((step, index) => (
              <div
                key={index}
                className={`step step-${step} ${
                  currentStep === index + 1 ? "active" : ""
                }`}
              >
                <span>{index + 1}</span>
                <div
                  className={`fa fa-check ${
                    currentStep >= index + 1 ? "" : "opaque"
                  }`}
                ></div>
                <div className="step-label"> {step}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="m-14">
          {currentStep === 1 ? (
            <>
              <div className="flex gap-10 justify-center">
                <div className="w-full">
                  <TextRequired>Name</TextRequired>
                  <InputForm
                    register={register("name", {
                      required: "Name cannot be left blank",
                    })}
                    type="text"
                    placeholder={"Name"}
                  />
                  {errors.name && (
                    <p className="text-[#FF6868] italic">{errors.name.message}</p>
                  )}
                </div>
                <div className="w-full">
                  <TextRequired>PhoneNumber</TextRequired>
                  <InputForm
                    register={register("phonenumber", {
                      required: "Phonenumber cannot be left blank",
                    })}
                    type="text"
                    placeholder={"PhoneNumber"}
                  />
                  {errors.phonenumber && (
                    <p className="text-[#FF6868] italic">
                      {errors.phonenumber.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-10 justify-center mt-5">
                <div className="w-full h-12">
                  <TextRequired>Province</TextRequired>
                  <Controller
                    methods={methods}
                    name="province"
                    control={control}
                    rules={{ required: "Province is required" }}
                    render={({ field }) => {
                      const { onChange, value, ref } = field;
                      return (
                        <Select
                          selected={selectedProvince}
                          content={ContentProvinces}
                          onChange={(value) => {
                            onChange(value);
                            setSelectedProvince(value);
                          }}
                        />
                      );
                    }}
                  />

                  {errors.province && (
                    <p className="text-[#FF6868] pb-3">
                      {errors.province.message}
                    </p>
                  )}
                </div>
                <div className="w-full h-12">
                  <TextRequired>District</TextRequired>
                  <Controller
                    methods={methods}
                    name="district"
                    control={control}
                    rules={{ required: "District is required" }}
                    render={({ field }) => {
                      const { onChange, value, ref } = field;
                      return (
                        <Select
                          selected={selectedDistrict}
                          content={ContentDistrict}
                          onChange={(value) => {
                            onChange(value);
                            setSelectedDistrict(value);
                          }}
                        />
                      );
                    }}
                  />

                  {errors.district && (
                    <p className="text-[#FF6868] pb-3">
                      {errors.district.message}
                    </p>
                  )}
                </div>
                <div className="w-full h-12">
                  <TextRequired>Wards</TextRequired>
                  <Controller
                    methods={methods}
                    name="ward"
                    control={control}
                    rules={{ required: "Wards is required" }}
                    render={({ field }) => {
                      const { onChange, value, ref } = field;
                      return (
                        <Select
                          selected={selectedWards}
                          content={ContentWards}
                          onChange={(value) => {
                            onChange(value);
                            setSelectedWards(value);
                          }}
                        />
                      );
                    }}
                  />

                  {errors.ward && (
                    <p className="text-[#FF6868] pb-3">{errors.ward.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-14">
                <p>Notes</p>
                <textarea
                  className="resize-y rounded-md w-full border border-gray-300 border-solid p-3"
                  {...register("notes")}
                ></textarea>
              </div>
            </>
          ) : null}
        </div>

        <div className="m-14">
          {currentStep === 2 ? (
            <>
              <div className="w-full px-4 py-16">
                <div className="mx-auto w-full">
                  <RadioGroup
                    value={selectedShipping}
                    onChange={setSelectedShipping}
                  >
                    <div className="space-y-2">
                      {shipping.map((plan, index) => (
                        <RadioGroup.Option
                          key={index}
                          value={plan}
                          className={({ active, checked }) =>
                            `${
                              active
                                ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                                : ""
                            }
                  ${checked ? "bg-sky-900/75 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center justify-between w-full mr-10">
                                  <div className="text-sm">
                                    <RadioGroup.Label
                                      as="p"
                                      className={`font-medium flex flex-col gap-3 justify-center items-center w-36 ${
                                        checked ? "text-white" : "text-gray-900"
                                      }`}
                                    >
                                      <img src={plan.img} className="w-20" />
                                      {plan.name}
                                    </RadioGroup.Label>
                                  </div>
                                  <span>{plan.time}</span>
                                  <span>{plan.price}</span>
                                </div>
                                {checked && (
                                  <div className="shrink-0 text-white">
                                    <CheckIcon className="h-6 w-6" />
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className="m-14">
          {currentStep === 3 ? (
            <>
              <div className="w-full px-2 pt-16 sm:px-0">
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {["Cash On Delivery", "Payment Via Card"].map(
                      (category, index) => (
                        <Tab
                          key={index}
                          className={({ selected }) =>
                            classNames(
                              "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                              "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                              selected
                                ? "bg-white text-blue-700 shadow"
                                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                            )
                          }
                        >
                          {category}
                        </Tab>
                      )
                    )}
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    <Tab.Panel>
                      <p className="mt-5">
                        Thanh toán khi nhận hàng: Phí thu hộ:
                        {FormatPrice(dataSend.order_total)}.
                      </p>
                      <p>
                        (Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí
                        thu hộ.)
                      </p>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className="w-full px-4 py-16 grid grid-cols-5 grid-rows-2 gap-4">
                        {imgBank.map((item, index) => (
                          <div
                            key={index}
                            className="aspect-w-1 aspect-h-1 overflow-hidden cursor-pointer"
                          >
                            <img
                              src={item}
                              className="w-full h-full"
                              alt={`Image ${index}`}
                              onClick={() => setIsOpen(true)}
                            />
                          </div>
                        ))}
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </>
          ) : null}
        </div>

        {isOpen && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} content={ContentModal} />
        )}

        <div className="button-container">
          <div
            className={`btn btn-prev ${currentStep === 0 ? "disabled" : ""}`}
            onClick={currentStep === 1 ? handleCloseCheckout : handlePrevClick}
          >
            Previous step
          </div>
          <button
            className={`btn btn-next ${currentStep === 4 ? "disabled" : ""}`}
            type={currentStep === 1 ? "submit" : "button"}
            onClick={() => {
              if (currentStep === 2) {
                handleNextClick();
              }
              if (currentStep === 3) {
                setIsBill(true);
                setDataSend({ ...dataSend, payment_id: 1 });
              }
            }}
          >
            Next step
          </button>
        </div>
      </form>
    </>
  );
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}