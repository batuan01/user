import Link from "next/link";
import { Button, ButtonModal } from "../atoms/Button";
import { TruncateText } from "../atoms/TruncateText";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";

import { Loading } from "../atoms/Loading";
import { FormatPrice } from "../atoms/FormatPrice";
import Cookies from "js-cookie";
import Pagination from "../atoms/Pagination";
import { Select, pushData } from "../atoms/Select";
import Notification from "../atoms/Notification";
import { AuthContext } from "../contexts/AuthContext";
import {
  BuyProduct,
  GetProductLatests,
  GetProductRandoms,
  GetProductSearch,
  ListProducts,
  ListProductsByCategory,
} from "../../utils/auth";
import { useRouter } from "next/router";
import {
  FaAngleDoubleRight,
  FaSortAmountUp,
  FaSortAmountDown,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
} from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";

const Product = ({ data }) => {
  const router = useRouter();
  const filteredDataColor = data.product_colors.filter(
    (item) => item.quantity > 0
  );
  const { isShowLogin, setIsShowLogin } = useContext(AuthContext);

  const handleBuyNow = async () => {
    try {
      const storedIdCustomer = Cookies.get("id_customer");
      if (storedIdCustomer) {
        const IdCustomer = atob(storedIdCustomer);
        const buyData = {
          customer_id: IdCustomer,
          products: [
            {
              product_id: data.product_id,
              color_id: filteredDataColor[0].color_id,
              product_quantity: 1,
            },
          ],
        };

        await BuyProduct(buyData);
        Notification.success("Add to cart successfully!");
      } else {
        Notification.error("Please log in to purchase!");
        setIsShowLogin(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li>
      <div className="">
        <div className=" h-[430px] w-[275px] relative p-4 bg-white shadow-md rounded-xl transition duration-300 ease-in-out hover:drop-shadow-2xl hover:shadow-blue-500 cursor-pointer hover_card">
          <div
            className="py-4 card_img"
            onClick={() => router.push("/product/" + data.product_id)}
          >
            <img
              src={data.product_image}
              alt="product"
              className="w-full h-44"
            />
          </div>
          <div className="h-32">
            <p
              className="text-sm text-black dark:text-white overflow-hidden overflow-ellipsis leading-5 line-clamp-2 font-semibold h-10"
              onClick={() => router.push("/product/" + data.product_id)}
            >
              {TruncateText(data.product_name, 50)}
            </p>
            <div className="flex items-center flex-wrap gap-2 my-2">
              <span className="font-semibold card__status">
                {FormatPrice(
                  filteredDataColor[0].product_price -
                    (filteredDataColor[0].product_price * data.product_sale) /
                      100
                )}
              </span>
              {data.product_sale || data.product_sale > 0 ? (
                <del className="text-sm text-gray-500">
                  {FormatPrice(filteredDataColor[0].product_price)}
                </del>
              ) : null}
            </div>
            <div className="flex items-center justify-center flex-wrap gap-3 mb-3">
              <span className="px-4 py-2 bg-slate-300 rounded-md text-xs text-gray-600">
                New 100%
              </span>

              {data.product_sale && data.product_sale > 0 ? (
                <span className="px-4 py-2 bg-[#E72929] rounded-md text-xs text-white">
                  Sale {data.product_sale}%
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="py-3 px-5 rounded-full border border-solid button_hover"
              onClick={handleBuyNow}
            >
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
export const ListProductHome = () => {
  const [dataAll, setDataAll] = useState([]);
  const [dataAllRandom, setDataAllRandom] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetProductLatests();
        setDataAll(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchDataRandom = async () => {
      try {
        const result = await GetProductRandoms();
        setDataAllRandom(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    fetchDataRandom();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center pt-10 pb-5">
        <p className="text-xl font-bold">TOP RANKINGS</p>
        <Link href="/product">
          <div className="flex items-center gap-1 cursor-pointer arrow_right">
            <p>View more</p>
            <div className="">
              <FaAngleDoubleRight />
            </div>
          </div>
        </Link>
      </div>
      {loading ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <ul className="cards">
          {dataAll?.data?.map((item, index) => (
            <Product data={item} key={index} />
          ))}
        </ul>
      )}

      <div className="flex justify-between items-center pt-10 pb-5">
        <p className="text-xl font-bold">TOP SELECTION</p>
        <Link href="/product">
          <div className="flex items-center gap-1 cursor-pointer arrow_right">
            <p>View more</p>
            <div className="">
              <FaAngleDoubleRight />
            </div>
          </div>
        </Link>
      </div>
      {loading ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <ul className="cards">
          {dataAllRandom?.data?.map((item, index) => (
            <Product data={item} key={index} />
          ))}
        </ul>
      )}
    </>
  );
};

export const AllProducts = ({ category }) => {
  const [dataAll, setDataAll] = useState();
  const [dataSort, setDataSort] = useState();
  const router = useRouter();
  const params = router.query;
  const { setBreadcrumb, setLoad } = useContext(AuthContext);

  const [paginationPage, setPaginationPage] = useState(params.page ?? 1);

  useEffect(() => {
    const fetchDataAllProduct = async () => {
      try {
        const result = await ListProducts({ page: paginationPage });
        setDataAll(result);
        setLoad(false);
        setBreadcrumb("All Products");
        setDataSort(result?.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!category) {
      fetchDataAllProduct();
    }

    const fetchDataByCategory = async () => {
      try {
        const result = await ListProductsByCategory({ params });
        setDataAll(result);
        setLoad(false);
        setBreadcrumb(result?.category_name);
        setDataSort(result?.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (category && params.id) {
      fetchDataByCategory();
    }
  }, [paginationPage, params.id]);

  // Hàm sắp xếp theo thứ tự a-z theo productName
  const sortAscending = (products) => {
    return products
      .slice()
      .sort((a, b) => a.product_name.localeCompare(b.product_name));
  };

  // Hàm sắp xếp theo thứ tự z-a theo productName
  const sortDescending = (products) => {
    return products
      .slice()
      .sort((a, b) => b.product_name.localeCompare(a.product_name));
  };

  // Sắp xếp tăng dần theo giá sản phẩm
  const productsSortedAscending = (products) => {
    return [...products].sort((a, b) => {
      const priceA = a.product_colors[0].product_price;
      const priceB = b.product_colors[0].product_price;
      return priceA - priceB;
    });
  };

  // Sắp xếp giảm dần theo giá sản phẩm
  const productsSortedDescending = (products) => {
    return [...products].sort((a, b) => {
      const priceA = a.product_colors[0].product_price;
      const priceB = b.product_colors[0].product_price;
      return priceB - priceA;
    });
  };

  return (
    <>
      <p className="text-left text-2xl font-semibold pt-5 text-black">
        Sort By:
      </p>
      <div className="flex gap-5 justify-start items-center pb-4">
        <ButtonModal
          title={"Price Low"}
          type={"button"}
          sizeSm={true}
          onClick={() => {
            const sortedProducts= productsSortedAscending(dataAll?.data.data);
            setDataSort(sortedProducts);
          }}
          textBlack
          className={"border border-slate-400 border-solid bg-white"}
          icon={<FaSortAmountUp />}
        />
        <ButtonModal
          title={"Price High"}
          type={"button"}
          sizeSm={true}
          onClick={() => {
            const sortedProducts= productsSortedDescending(dataAll?.data.data);
            setDataSort(sortedProducts);
          }}
          textBlack
          className={"border border-slate-400 border-solid bg-white"}
          icon={<FaSortAmountDown />}
        />
        <ButtonModal
          title={"A → Z"}
          type={"button"}
          sizeSm={true}
          onClick={() => {
            const sortedProducts = sortAscending(dataAll?.data.data);
            setDataSort(sortedProducts);
          }}
          textBlack
          className={"border border-slate-400 border-solid bg-white"}
          icon={<FaSortAlphaDown />}
        />
        <ButtonModal
          title={"Z → A"}
          type={"button"}
          sizeSm={true}
          onClick={() => {
            const sortedProductsDescending = sortDescending(dataAll?.data.data);
            setDataSort(sortedProductsDescending);
          }}
          textBlack
          className={"border border-slate-400 border-solid bg-white"}
          icon={<FaSortAlphaDownAlt />}
        />
      </div>

      {dataAll?.data.data?.length > 0 ? (
        <>
          <ul className="cards">
            {dataSort?.map((item, index) => (
              <Product data={item} key={index} />
            ))}
          </ul>
          <Pagination
            total={dataAll?.data?.total}
            paginationPage={paginationPage}
            setPaginationPage={setPaginationPage}
          />
        </>
      ) : (
        <center className="h-40">No Products</center>
      )}
    </>
  );
};

export const AllSearchProducts = ({}) => {
  const [dataAll, setDataAll] = useState();
  const { setBreadcrumb, setLoad } = useContext(AuthContext);
  const router = useRouter();
  const params = router.query;
  const search = params.keyword;
  console.log(search);

  useEffect(() => {
    const fetchDataSearchProduct = async () => {
      try {
        const result = await GetProductSearch({ product_name: search });
        setDataAll(result);
        setLoad(false);
        setBreadcrumb("Search");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (search) {
      fetchDataSearchProduct();
    }
  }, [search]);
  return (
    <>
      <div className="py-10">
        <p className="text-center font-semibold text-3xl">Tìm kiếm</p>
        <p className="text-center py-2">
          Có {dataAll?.data.length} sản phẩm phù hợp với từ khóa
        </p>
        <p className="flex justify-center">
          <span className="w-10 h-[2px] bg-gray"></span>
        </p>
      </div>

      {dataAll?.data?.length > 0 ? (
        <>
          <ul className="cards">
            {dataAll?.data.map((item, index) => (
              <Product data={item} key={index} />
            ))}
          </ul>
        </>
      ) : (
        <div className="h-40">
          <center>No Products</center>
        </div>
      )}
    </>
  );
};
