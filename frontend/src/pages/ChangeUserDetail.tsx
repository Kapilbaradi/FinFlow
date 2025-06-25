import React from "react";

const ChangeUserDetail = () => {
  return (
    <div>
      <form className="p-4">
        <label htmlFor="username" className="w-100 text-start block my-1 text-base font-semibold">
          Change Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full ring-1 ring-gray-300 ring-inset rounded outline-none p-2 focus:ring-gray-400"
          defaultValue="username"
        />
        <button className="px-4 py-1 outline-hidden shadow-sm bg-[#636AE8FF] text-white border-0 rounded my-5 cursor-pointer font-semibold">
          Change Username
        </button>
      </form>
    </div>
  );
};

export default ChangeUserDetail;
