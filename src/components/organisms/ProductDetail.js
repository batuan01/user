import { useContext, useEffect, useState } from "react";
import { InputQuantity } from "../atoms/Input";
import { FaMobileScreenButton } from "react-icons/fa6";
import { FaCamera, FaRegClock } from "react-icons/fa";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { FormatPrice } from "../atoms/FormatPrice";
import Notification from "../atoms/Notification";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";
import { ButtonRadio } from "../atoms/ButtonRadio";
import {
  BuyProduct,
  GetGalleries,
  GetProductDetail,
  GetProductRelated,
  ListCarts,
} from "../../utils/auth";
import { useRouter } from "next/router";
import { RadioGroupForm } from "../atoms/RadioGroup";
import { TruncateText } from "../atoms/TruncateText";
import { CgSmartphoneRam } from "react-icons/cg";

export const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [detailProduct, setDetailProduct] = useState();
  const [relatedProduct, setRelatedProduct] = useState();
  const [listGalleries, setListGalleries] = useState();
  const [selectedColor, setSelectedColor] = useState();

  const { setBreadcrumb, setLoad } = useContext(AuthContext);

  const router = useRouter();
  const params = router.query;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const storedIdCustomer = Cookies.get("id_customer");
  let IdCustomer;
  if (storedIdCustomer) {
    IdCustomer = atob(storedIdCustomer);
  }

  const images = [
    {
      original: detailProduct?.data?.product_image,
      thumbnail: detailProduct?.data?.product_image,
      originalHeight: 380,
      sizes: "auto",
    },
  ];

  //lấy ra color mà sản phẩm có
  const getColorName = (colorId) => {
    const color = detailProduct?.colors?.find(
      (item) => item.color_id === colorId
    );
    return color ? color.color_name : "";
  };

  const colorNames = detailProduct?.data?.product_colors?.map((item) =>
    getColorName(item.color_id)
  );
  const dataColors = colorNames?.map((item, index) => ({
    label: item,
    value: String(detailProduct?.data?.product_colors[index].color_id),
  }));

  // lấy ra quantity với màu đã chọn
  const quantityColor = detailProduct?.data?.product_colors?.find(
    (item) => String(item.color_id) === selectedColor
  )?.quantity;

  //lấy ra data detail
  useEffect(() => {
    const fetchDetail = async () => {
      const dataDetail = await GetProductDetail({ product_id: params.id });
      setLoad(false);
      setDetailProduct(dataDetail);
      setBreadcrumb(dataDetail?.data.product_name);
      setSelectedColor(String(dataDetail?.data.product_colors[0].color_id));
    };
    const fetchGalleries = async () => {
      const dataGalleries = await GetGalleries({ product_id: params.id });

      const data = dataGalleries?.map((item, index) => ({
        original: item.gallery_image,
        thumbnail: item.gallery_image,
        originalHeight: 380,
        sizes: "auto",
      }));
      setListGalleries(data);
    };
    if (params.id) {
      fetchDetail();
      fetchGalleries();
    }
  }, [params]);

  //lấy ra product related
  useEffect(() => {
    const fetchRelated = async () => {
      const dataDetail = await GetProductRelated({
        product_id: params.id,
        category_id: detailProduct?.data?.category_id,
      });
      setRelatedProduct(dataDetail?.data);
    };
    if (params && detailProduct) {
      fetchRelated();
    }
  }, [detailProduct]);

  const onSubmit = async () => {
    const storedIdCustomer = Cookies.get("id_customer");
    if (storedIdCustomer) {
      const IdCustomer = atob(storedIdCustomer);
      const buyData = {
        customer_id: IdCustomer,
        products: [
          {
            product_id: params.id,
            color_id: Number(selectedColor),
            product_quantity: quantity,
          },
        ],
      };

      await BuyProduct(buyData);
      Notification.success("Add to cart successfully!");
    } else {
      Notification.error("Please log in to purchase!");
    }
  };
  const BuyNow = async () => {
    const storedIdCustomer = Cookies.get("id_customer");
    if (storedIdCustomer) {
      const IdCustomer = atob(storedIdCustomer);
      const buyData = {
        customer_id: IdCustomer,
        products: [
          {
            product_id: params.id,
            color_id: Number(selectedColor),
            product_quantity: quantity,
          },
        ],
      };

      await BuyProduct(buyData);
      Notification.success("Add to cart successfully!");
    } else {
      Notification.error("Please log in to purchase!");
    }
    router.push("/cart");
  };

  const getPrice = (colorId) => {
    if (detailProduct && detailProduct.data) {
      const productColors = detailProduct.data.product_colors;
      if (productColors) {
        const foundColor = productColors.find(
          (product) => product.color_id === colorId
        );
        if (foundColor) {
          return foundColor.product_price;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    setQuantity(1);
  }, [selectedColor]);
  console.log(detailProduct);

  return (
    <>
      <section className="pt-10 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-wrap mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <div className="sticky top-0 overflow-hidden ">
                <ImageGallery
                  items={listGalleries || images || []}
                  showFullscreenButton={true} // Optional: Allow fullscreen mode
                  showPlayButton={true} // Optional: Remove play button
                  showBullets={true} // Optional: Show bullet indicators
                  showThumbnails={true} // Optional: Show thumbnail navigation
                  infinite={true} // Optional: Allow infinite navigation
                  slideInterval={3000} // Optional: Slide interval in milliseconds
                  slideOnThumbnailOver={true} // Optional: Slide on thumbnail
                  showIndex={true} // Optional: Show index
                  autoPlay={true} // Optional: Auto play
                  renderItem={renderCustomItem}
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full px-4 md:w-1/2"
            >
              <div className="lg:pl-20">
                <div className="mb-6 ">
                  <span className="px-2.5 py-0.5 mr-3 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                    New Arrival
                  </span>
                  {detailProduct?.data?.product_sale ? (
                    <span className="px-2.5 py-0.5 text-xs text-white bg-[#FF6868] dark:bg-gray-700 rounded-xl dark:text-gray-200">
                      Sale({detailProduct?.data?.product_sale}%)
                    </span>
                  ) : null}
                  <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                    {detailProduct?.data?.product_name}
                  </h2>

                  <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    {detailProduct?.data?.product_sale ? (
                      <span>
                        {FormatPrice(
                          getPrice(Number(selectedColor)) -
                            (getPrice(Number(selectedColor)) *
                              Number(detailProduct?.data?.product_sale)) /
                              100
                        )}
                      </span>
                    ) : (
                      <span>
                        {FormatPrice(getPrice(Number(selectedColor)))}
                      </span>
                    )}
                    {detailProduct?.data?.product_sale ? (
                      <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">
                        {FormatPrice(getPrice(Number(selectedColor)))}
                      </span>
                    ) : null}
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                    System Specs :
                  </h2>
                  <div className="bg-gray_light dark:bg-gray-700 rounded-xl">
                    <div className="p-3 lg:p-5 ">
                      <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50">
                        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                          <div className="w-full mb-4 md:w-2/5">
                            <div className="flex ">
                              <span className="mr-3 text-gray-500 dark:text-gray-400 text-3xl">
                                <FaMobileScreenButton />
                              </span>
                              <div>
                                <p className=" text-sm font-medium text-gray-500 dark:text-gray-400">
                                  Screen
                                </p>
                                <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                  {detailProduct?.data.product_detail.desktop}
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="w-full mb-4 md:w-2/5">
                            <div className="flex ">
                              <span className="mr-3 text-gray-500 dark:text-gray-400 text-3xl">
                                <CgSmartphoneRam />
                              </span>
                              <div>
                                <p className=" text-sm font-medium text-gray-500 dark:text-gray-400">
                                  Ram
                                </p>
                                <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                  {
                                    detailProduct?.data.product_detail
                                      .product_ram
                                  }
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                            <div className="flex ">
                              <span className="mr-3 text-gray-500 dark:text-gray-400">
                                <ProcessorIcon />
                              </span>
                              <div>
                                <p className=" text-sm font-medium text-gray-500 dark:text-gray-400">
                                  Hard Drive
                                </p>
                                <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                  {
                                    detailProduct?.data.product_detail
                                      .hard_drive
                                  }
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                            <div className="flex ">
                              <span className="mr-3 text-gray-500 dark:text-gray-400 text-3xl">
                                <FaRegClock />
                              </span>
                              <div>
                                <p className=" text-sm font-medium text-gray-500 dark:text-gray-400">
                                  Pin
                                </p>
                                <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                  {detailProduct?.data.product_detail
                                    .product_card
                                    ? `${detailProduct?.data.product_detail.product_card} h`
                                    : ""}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                  <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                    Color:
                  </h2>
                  <RadioGroupForm
                    options={dataColors}
                    selectedOption={selectedColor}
                    setSelectedOption={setSelectedColor}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-start gap-10 mb-6">
                  <div className="mb-4 mr-4 lg:mb-0 ">
                    <div className="w-28">
                      <InputQuantity
                        quantity={quantity}
                        setQuantity={setQuantity}
                        maxQuantity={quantityColor}
                      />
                    </div>
                  </div>
                  <span>
                    {quantityColor ? `${quantityColor} products` : null}
                  </span>
                </div>
                <div className="flex-col gap-4 mb-6">
                  <button
                    className="w-full px-4 py-3 mb-3 text-center text-gray hover:text-white bg-blue-100 border border-blue-600 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 hover:bg-blue-600 hover:text-gray-100 rounded-xl"
                    type="submit"
                  >
                    Add to cart
                  </button>
                  <button
                    className="w-full px-4 py-3 text-center text-white bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                    type="button"
                    onClick={BuyNow}
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="pb-10 grid grid-cols-2 grid-rows-2 gap-x-5 lg:grid-cols-4 lg:grid-rows-1 max-w-6xl mx-5">
        {relatedProduct?.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full cursor-pointer"
            onClick={() => router.push("/product/" + item.product_id)}
          >
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl min-h-[250px]">
              <img
                src={item.product_image}
                alt="profile-picture"
                className="h-full"
              />
            </div>
            <div className="p-6 text-center">
              <h4 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {TruncateText(item.product_name, 50)}
              </h4>
              <p className="">
                {FormatPrice(item.product_colors[0].product_price)}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

const renderCustomItem = (item) => {
  return (
    <div className="image-gallery-item">
      <img
        src={item.original}
        alt={item.description}
        sizes={item.sizes}
        srcSet={item.srcSet}
        className="image-gallery-image"
        style={{ width: "100%", height: item.originalHeight }}
      />
    </div>
  );
};

const ProcessorIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="w-7 h-7 bi bi-cpu"
      viewBox="0 0 16 16"
    >
      <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"></path>
    </svg>
  );
};
