import { Dispatch, SetStateAction } from "react";
import { useDropdownToggle } from "../customHooks/useDropdownToggle";
import Card from "./Card";
import DropDown from "./DropDown";

interface PropeType {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ setShowModal }: PropeType) => {
  const { showDropDown } = useDropdownToggle();
  return (
    <div className="py-4 my-2 w-full">
      <Card style="bg-white shadow-sm px-2 w-full">
        <>
          <div className="flex justify-between items-center py-2 border-b-1 border-gray-100">
            <h1 className="text-xl">Create Expense</h1>
            <div onClick={() => setShowModal(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 cursor-pointer"
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
                  className="block text-left font-semibold text-sm my-1"
                >
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="w-full ring-1 ring-gray-300 ring-inset rounded outline-none py-1 px-2"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="type"
                  className="block text-left font-semibold text-sm my-1"
                >
                  Type:
                </label>
                <DropDown
                  id="Type"
                  defaultString="Asset"
                  dropDownList={["Asset", "Liability"]}
                  showDropDown={showDropDown === "Type"}
                  style="w-full"
                  listStyle="w-full"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="Payment"
                  className="block text-left font-semibold text-sm my-1"
                >
                  Payment:
                </label>
                <DropDown
                  id="Payment"
                  defaultString="Payment Type"
                  dropDownList={["Cash", "Card", "UPI"]}
                  showDropDown={showDropDown === "Payment"}
                  style="w-full"
                  listStyle="w-full"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="amount"
                  className="block text-left font-semibold text-sm my-1"
                >
                  Amount:
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  className="w-full ring-1 ring-gray-300 ring-inset rounded outline-none py-1 px-2 appearance-none"
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                  }}
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="category"
                  className="block text-left font-semibold text-sm my-1"
                >
                  Category:
                </label>
                <DropDown
                  id="Category"
                  defaultString="Shopping"
                  dropDownList={[
                    "Shopping",
                    "Grocories",
                    "Transpotation",
                    "Food",
                  ]}
                  showDropDown={showDropDown === "Category"}
                  style="w-full"
                  listStyle="w-full"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="sub-category"
                  className="block text-left font-semibold text-sm my-1"
                >
                  sub-category:
                </label>
                <DropDown
                  id="sub-category"
                  defaultString="Shirt"
                  dropDownList={["Shiit", "Pants", "T-shirt"]}
                  showDropDown={showDropDown === "sub-category"}
                  style="w-full"
                  listStyle="w-full"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="date"
                  className="block text-left font-semibold text-sm my-1"
                >
                  Date:
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="w-full ring-1 ring-gray-300 ring-inset rounded outline-none py-1 px-2"
                />
              </div>
              <div className="my-5">
                <button
                  className="text-white bg-[#636AE8FF] rounded-md outline-none border-0 py-1 px-5 cursor-pointer"
                  onClick={() => setShowModal(false)}
                >
                  Create Expense
                </button>
              </div>
            </form>
          </div>
        </>
      </Card>
    </div>
  );
};

export default Modal;
