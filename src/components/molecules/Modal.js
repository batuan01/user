import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export const Modal = ({ isOpen, setIsOpen, content }) => {
  return (
    <>
      <Transition.Root as={Fragment} show={isOpen}>
        <Dialog
          as="div"
          className="fixed inset-0 flex items-center justify-center sm:pb-0 z-10"
          onClose={setIsOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0 transform translate-y-full"
            enterTo="opacity-100 transform translate-y-0"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100 transform translate-y-0"
            leaveTo="opacity-0 transform translate-y-full"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="w-auto mx-auto z-[52]">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="bg-white overflow-hidden">
                <div className="flex flex-col h-full">
                  <div className="py-6 px-8 bg-white text-black rounded-t-[32px] w-full transition-all">
                    {content}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
