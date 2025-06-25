import { Dispatch, SetStateAction } from "react";

import { useDropdownToggle } from "../customHooks/useDropdownToggle";
import Card from "../components/Card";
import expenseCard from "../assets/ExpenseCardImage(1).png";
import DropDown from "../components/DropDown";
import Modal from "../components/Modal";

const expenseListData = [
  {
    day: "Tuesday",
    date: "14",
    category: "Shop",
    title: "Buy new clothes",
    price: "97",
  },
  {
    day: "Tuesday",
    date: "14",
    category: "Electronics",
    title: "Buy new phone",
    price: "1290",
  },
  {
    day: "Monday",
    date: "13",
    category: "Electronics",
    title: "Buy new phone",
    price: "1290",
  },
  {
    day: "Sunday",
    date: "12",
    category: "Food",
    title: "Pizza",
    price: "250",
  },
];

type ExpenseListDataType = {
  day: string;
  date: string;
  category: string;
  title: string;
  price: string;
};

type GroupedExpense = {
  date: string;
  day: string;
  total: number;
  items: ExpenseListDataType[];
};

interface PropeType {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const groupExpenseByDate = (expenseListData: ExpenseListDataType[]) => {
  const expenseMap = new Map<string, GroupedExpense>();
  for (const expense of expenseListData) {
    const numericPrice = Number(expense.price.replace(/,/g, ""));
    const key = `${expense.day}-${expense.date}`;
    if (!expenseMap.has(key)) {
      expenseMap.set(key, {
        day: expense.day,
        date: expense.date,
        total: numericPrice,
        items: [expense],
      });
    } else {
      const existingExpense = expenseMap.get(key)!;
      existingExpense.total += numericPrice;
      existingExpense.items.push(expense);
    }
  }

  return Array.from(expenseMap.values());
};

const Home = ({ showModal, setShowModal }: PropeType) => {
  const { showDropDown } = useDropdownToggle();
  const groupExpense = groupExpenseByDate(expenseListData);

  return (
    <>
      <div
        className={`fixed top-[0px] w-full bg-black/25 h-full transition-all duration-500 ${
          showModal
            ? "opacity-100 z-50 pointer-events-auto"
            : "opacity-0 -z-5 pointer-events-none"
        } overflow-y-auto`}
      >
        <div
          className={`flex justify-center items-center w-full h-full transition-all duration-500 transform ${
            showModal
              ? "translate-y-0 opacity-100"
              : "translate-y-[-1000px] opacity-0"
          }`}
        >
          <Modal setShowModal={setShowModal} />
        </div>
      </div>
      <div>
        <Card style="bg-[#636AE8FF] shadow-sm">
          <div className="px-4 py-4 relative">
            <div className="my-2">
              <p className="text-white text-sm text-start">Monthly Expense</p>
            </div>
            <div className="my-2">
              <p className="text-white text-3xl text-start">&#8377;3,337</p>
            </div>
            <div className="my-2">
              <p className="text-white text-sm text-start">
                <span className="bg-red-500 py-1 px-2 rounded text-xs me-1">
                  +&#8377;240
                </span>{" "}
                <span className="opacity-50 text-xs">then last month</span>
              </p>
            </div>
            <div className="w-auto absolute top-[24px] right-[-2px]">
              <img src={expenseCard} alt="" className="w-full h-[100px]" />
            </div>
          </div>
        </Card>
      </div>
      <div className="p-4 flex justify-between items-center w-full">
        <h2 className="text-lg text-start font-semibold">Expense List</h2>
        <DropDown
          id="dateRange"
          defaultString="This Week"
          dropDownList={[
            "This Week",
            "This Month",
            "This Year",
            "Custom Range",
          ]}
          showDropDown={showDropDown === "dateRange"}
        />
      </div>
      <div className="overflow-y-auto pb-4">
        {groupExpense.map((expense, index) => {
          return (
            <Card key={index} style="border-2 border-gray-100">
              <div className="p-3">
                <div className=" pb-2 border-2 border-white border-b-gray-100 flex items-center justify-between text-sm font-semibold">
                  <p>
                    {expense.day}, {expense.date}
                  </p>
                  <p>-&#8377;{expense.total.toLocaleString()}</p>
                </div>
                <div>
                  {expense.items.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 text-sm cursor-pointer"
                      >
                        <div>
                          <h4 className="font-semibold text-left">
                            {item.category}
                          </h4>
                          <p className="text-gray-500 text-xs">{item.title}</p>
                        </div>
                        <p className="text-red-500 font-semibold">
                          -&#8377;{item.price}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="py-4 my-2 w-full">
        <Card style="bg-white shadow-sm px-2 w-full">
          <>
            <div className="flex justify-between items-center py-2 mx-2 border-b-1 border-gray-100">
              <h1 className="text-xl">Expense</h1>
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
                <div className="flex justify-start items-center">
                  <h6 className="text-left font-semibold text-base my-1 mx-2 inline-block">
                    Title:
                  </h6>
                  <p className="text-base">Buy new phone</p>
                </div>
                <div className="flex justify-start items-center">
                  <h6 className="text-left font-semibold text-base my-1 mx-2 inline-block">
                    Type:
                  </h6>
                  <p className="text-base">Liablility</p>
                </div>
                <div className="flex justify-start items-center">
                  <h6 className="text-left font-semibold text-base my-1 mx-2 inline-block">
                    Payment:
                  </h6>
                  <p className="text-base">Card</p>
                </div>
                <div className="flex justify-start items-center">
                  <h6 className="text-left font-semibold text-base my-1 mx-2 inline-block">
                    Amount:
                  </h6>
                  <p className="text-base">1290</p>
                </div>
                <div className="flex justify-start items-center">
                  <h6 className="text-left font-semibold text-base my-1 mx-2 inline-block">
                    Category:
                  </h6>
                  <p className="text-base">Electronics</p>
                </div>
                <div className="flex justify-start items-center">
                  <h6 className="text-left font-semibold text-base my-1 mx-2 inline-block">
                    Sub-Category:
                  </h6>
                  <p className="text-base">Phone</p>
                </div>
                <div className="flex justify-start items-center">
                  <h6 className="text-left font-semibold text-base my-1 mx-2 inline-block">
                    Date:
                  </h6>
                  <p className="text-base">12/06/2025</p>
                </div>
                <div className="my-5">
                  <button
                    className="text-white bg-[#636AE8FF] rounded-md outline-none border-0 py-1 px-5 cursor-pointer mx-2"
                    onClick={() => setShowModal(false)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-white bg-[#636AE8FF] rounded-md outline-none border-0 py-1 px-5 cursor-pointer mx-2"
                    onClick={() => setShowModal(false)}
                  >
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </>
        </Card>
      </div>
    </>
  );
};

export default Home;
