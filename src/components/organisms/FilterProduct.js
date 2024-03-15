import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { ListCategories } from "../../utils/auth";

export const FilterProduct = () => {
  const listCategory = ["Smartphone", "Laptop", "Tablet", "Accessories"];
  const [dataAll, setDataAll] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ListCategories();
        setDataAll(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="w-full mt-2">
        <div className="mx-auto w-full max-w-md">
          {listCategory.map((category, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between text-left text-sm font-medium hover:bg-[var(--white-color-alt)] focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 py-3 px-1">
                    <span>{category}</span>
                    <FaAngleDown
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  {dataAll
                    ?.filter((item) => Number(item.category_type) === index + 1)
                    .map((filteredItem, mapIndex) => {
                      return (
                        <Link
                          href={`/category/${filteredItem.category_id}`}
                          key={mapIndex}
                        >
                          <Disclosure.Panel className="px-4 pb-4 pt-4 text-sm text-gray-500 cursor-pointer hover:bg-[var(--white-color-alt)]">
                            {filteredItem.category_name}
                          </Disclosure.Panel>
                        </Link>
                      );
                    })}
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </>
  );
};
