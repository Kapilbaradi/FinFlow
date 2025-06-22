import React from "react";

import { useDropdownToggle } from "../customHooks/useDropdownToggle";
import Card from "./Card";
import DropDown from "./DropDown";

const Modal = () => {
  const { showDropDown, toggleDropdown } = useDropdownToggle();
  return (
    <div className="py-4 my-2">
      <Card style="bg-white shadow-sm px-2">
        <>
          <div className="flex justify-between items-center py-2 border-b-1 border-gray-100">
            <h1>Create Expense</h1>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div className="py-2">
            <form>
              <div>
                <label
                  htmlFor="title"
                  className="block text-left font-semibold text-sm"
                >
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="w-full border-0 bg-gray-100 rounded outline-none py-1 px-2"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="type"
                  className="block text-left font-semibold text-sm"
                >
                  Type:
                </label>
                {/* <input
                type="text"
                name="type"
                id="type"
                className="w-full border-0 bg-gray-100 rounded outline-none py-1 px-2"
              /> */}
                <DropDown
                  defaultString="Asset"
                  dropDownList={["Asset", "Liability"]}
                  showDropDown={showDropDown}
                  toggleDropdown={toggleDropdown}
                  style="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="Payment"
                  className="block text-left font-semibold text-sm"
                >
                  Payment:
                </label>
                {/* <input
                  type="text"
                  name="Payment"
                  id="Payment"
                  className="w-full border-0 bg-gray-100 rounded outline-none py-1 px-2"
                /> */}
                <DropDown
                  defaultString="Payment Type"
                  dropDownList={["Cash", "Card", "UPI"]}
                  showDropDown={showDropDown}
                  toggleDropdown={toggleDropdown}
                />
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-left font-semibold text-sm"
                >
                  Amount:
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  className="w-full border-0 bg-gray-100 rounded outline-none py-1 px-2"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-left font-semibold text-sm"
                >
                  Category:
                </label>
                {/* <input
                  type="text"
                  name="category"
                  id="category"
                  className="w-full border-0 bg-gray-100 rounded outline-none py-1 px-2"
                /> */}
                <DropDown
                  defaultString="Shopping"
                  dropDownList={[
                    "Shopping",
                    "Grocories",
                    "Transpotation",
                    "Food",
                  ]}
                  showDropDown={showDropDown}
                  toggleDropdown={toggleDropdown}
                />
              </div>
              <div>
                <label
                  htmlFor="sub-category"
                  className="block text-left font-semibold text-sm"
                >
                  sub-category:
                </label>
                {/* <input
                  type="text"
                  name="sub-category"
                  id="sub-category"
                  className="w-full border-0 bg-gray-100 rounded outline-none py-1 px-2"
                /> */}
                <DropDown
                  defaultString="Shirt"
                  dropDownList={["Shiit", "Pants", "T-shirt"]}
                  showDropDown={showDropDown}
                  toggleDropdown={toggleDropdown}
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-left font-semibold text-sm"
                >
                  Date:
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="w-full border-0 bg-gray-100 rounded outline-none py-1 px-2"
                />
              </div>
            </form>
          </div>
        </>
      </Card>
    </div>
  );
};

export default Modal;
