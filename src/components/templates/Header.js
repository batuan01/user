import Link from "next/link";
import { MiniCart } from "../organisms/MiniCart";
import { Dropdown } from "../atoms/Dropdown";
import { FaShoppingCart } from "react-icons/fa";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Search } from "../organisms/Search";
import { LoginForm } from "../organisms/LoginForm";
import { AuthContext } from "../contexts/AuthContext";
import {
  FaRegUser,
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
  FaAngleDown,
  FaAngleRight,
} from "react-icons/fa6";
import { ImHome } from "react-icons/im";
import { ListCategories } from "../../utils/auth";
import { FiSettings } from "react-icons/fi";
import { useRouter } from "next/router";

export const Header = () => {
  const storedIdCustomer = Cookies.get("id_customer");
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { isShowLogin, setIsShowLogin, breadcrumb, totalProductCart } =
    useContext(AuthContext);

  const router = useRouter();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const pathname = router.pathname;

  const clickCart = () => {
    if (storedIdCustomer) {
      router.push("/cart");
    } else {
      setIsShowLogin(true);
    }
  };

  const clickUser = () => {
    if (storedIdCustomer) {
      router.push("/account");
    } else {
      setIsShowLogin(true);
    }
  };

  return (
    <>
      <header className="header" id="header">
        <nav className="nav container">
          <Link href="/" className="nav__logo flex items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/kenta-71006.appspot.com/o/images%2Flogo.png?alt=media&token=d5a22294-5af9-4163-b1bc-7619b29dfbdd"
              className="h-[80px] w-auto cursor-pointer"
            />
          </Link>

          <div
            className={`nav__menu ${showMenu ? "show-menu" : ""}`}
            id="nav-menu"
          >
            <ul className="nav__list">
              <li className="nav__item">
                <Link href="/" className="nav__link">
                  Home
                </Link>
              </li>

              <li className="nav__item">
                <Link href="/product" className="nav__link">
                  Products
                </Link>
              </li>

              <li className="nav__item">
                <Link href="/news" className="nav__link">
                  News
                </Link>
              </li>

              <li className="nav__item">
                <Link href="/contact" className="nav__link">
                  Contact
                </Link>
              </li>
            </ul>

            {/* Close button */}
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <AiOutlineClose />
            </div>
          </div>

          <div className="nav__actions">
            {/* Search button */}
            <span onClick={toggleSearch} id="search-btn">
              <FaSearch />
            </span>

            {/* Cart */}
            <div className="cursor-pointer" onClick={clickCart}>
              {storedIdCustomer ? (
                <span className="absolute text-xs ml-[20px] -mt-[12px]">
                  {totalProductCart || 0}
                </span>
              ) : null}
              <FaShoppingCart className=" w-5 h-5" />
            </div>

            {/* Login button */}
            <div className="cursor-pointer" onClick={clickUser}>
              <FaRegUser className=" w-4 h-4" />
            </div>

            {/* Toggle button */}
            <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
              <FiMenu />
            </div>
          </div>
        </nav>
      </header>

      {pathname !== "/" ? (
        <>
          <div className="h-[88px]"></div>
          <nav
            className="flex py-2 px-[10rem] bg-white dark:bg-gray-800 dark:text-white text-sm font-medium shadow-md rtl:justify-start rtl:px-0 rtl:pr-10 rtl:pl-[10rem] fixed w-full z-[5]"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link href="/">
                  <div className="flex gap-1 items-center text-sm font-medium hover:text-blue-600 dark:hover:text-white cursor-pointer">
                    <ImHome />
                    Home
                  </div>
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <FaAngleRight />
                  <span className="cursor-pointer ms-1 text-sm font-medium  hover:text-blue-600 md:ms-2 dark:hover:text-white">
                    {breadcrumb}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </>
      ) : null}

      <Search showSearch={showSearch} setShowSearch={setShowSearch} />

      <LoginForm isShowLogin={isShowLogin} setIsShowLogin={setIsShowLogin} />
    </>
  );
};
