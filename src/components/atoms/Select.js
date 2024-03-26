import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaAngleDown, FaCheck } from "react-icons/fa6";
import { FaAngleDoubleDown } from "react-icons/fa";
import { FaAngleDoubleUp } from "react-icons/fa";

export function Select({ selected, onChange, content }) {
  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <>
          <div className="relative mt-2 w-full h-12">
            <Listbox.Button className="relative h-full cursor-default bg-inherit py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm border border-solid border-stone-400 focus:outline-none sm:text-sm sm:leading-6 min-w-[150px] min-h-[40px] w-full hover:cursor-pointer">
              <span className="flex items-center">
                <span className="block truncate">{selected?.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                {open ? (
                  <FaAngleDoubleUp
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <FaAngleDoubleDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-52 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm w-full">
                {content}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export const pushData = ({ arrayForm, data }) => {
  return (
    arrayForm &&
    arrayForm?.push(
      ...(data?.map((item, index) => (
        <Listbox.Option
          key={index}
          className={({ active }) =>
            classNames(
              active ? "bg-indigo-600 text-white" : "text-gray-900",
              "relative cursor-default select-none py-2 pl-3 pr-9"
            )
          }
          value={item}
        >
          {({ selected, active }) => (
            <>
              <div className="flex items-center">
                <span
                  className={classNames(
                    selected ? "font-semibold" : "font-normal",
                    "block truncate"
                  )}
                >
                  {item.name}
                </span>
              </div>

              {selected ? (
                <span
                  className={classNames(
                    active ? "text-white" : "text-indigo-600",
                    "absolute inset-y-0 right-0 flex items-center pr-4"
                  )}
                >
                  <FaCheck className="h-5 w-5" aria-hidden="true" />
                </span>
              ) : null}
            </>
          )}
        </Listbox.Option>
      )) || [])
    )
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
