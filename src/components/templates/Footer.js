import { Facebook, Instagram, Twitter } from "../atoms/Icon";
import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <footer className="bg-[#8CB9BD] mt-10">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <div className="flex justify-center">
                <img src="./logo.png" className="w-40" />
              </div>

              <p className="mt-4 text-gray-500 text-center">
                Thank you for choosing our store. We strive to provide you with
                the best experience possible.
              </p>

              {/* <ul className="mt-8 flex gap-6 justify-center">
                <li>
                  <Link
                    href={"/"}
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <Facebook className={"w-7 h-7 cursor-pointer"} />
                  </Link>
                </li>

                <li>
                  <Link
                    href={"/"}
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <Instagram className={"w-7 h-7 cursor-pointer"} />
                  </Link>
                </li>

                <li>
                  <Link
                    href={"/"}
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <Twitter className={"w-7 h-7 cursor-pointer"} />
                  </Link>
                </li>
              </ul> */}
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              <div>
                <p className="font-semibold text-gray-900">Services</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link
                      href={"/news"}
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      News
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-900">Company</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      About{" "}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-900">Helpful Links</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link
                      href={"/contact"}
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 p-3 text-center">
          &copy; 2024 • <b>Nguyen Thi Phuong</b>
        </p>
      </footer>
    </>
  );
};
