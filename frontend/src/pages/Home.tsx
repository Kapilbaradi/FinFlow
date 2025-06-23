// import { useState } from "react";

import { useDropdownToggle } from "../customHooks/useDropdownToggle";
import Card from "../components/Card";
import expenseCard from "../assets/ExpenseCardImage(1).png";
import DropDown from "../components/DropDown";

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

const Home = () => {
  const { showDropDown } = useDropdownToggle();
  const groupExpense = groupExpenseByDate(expenseListData);

  return (
    <>
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
      <div>
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
                        className="flex justify-between items-center py-2 text-sm"
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
    </>
  );
};

export default Home;
