import { useRef } from "react";
import { useDropdownToggle } from "../customHooks/useDropdownToggle";

interface DropDownProps {
  id: string;
  defaultString: string;
  dropDownList: string[];
  style?: string;
  listStyle?: string;
  showDropDown: boolean;
}

const DropDown = ({
  id,
  defaultString,
  dropDownList,
  style,
  listStyle,
  showDropDown,
}: DropDownProps) => {
  const currentRef = useRef<HTMLDivElement | null>(null);
  const { setDropdownHeight } = useDropdownToggle();

  return (
    <div className={`relative inline-block text-left ${style}`}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset cursor-pointer"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setDropdownHeight(currentRef, id)}
        >
          {defaultString}
          <svg
            className="-mr-1 size-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        ref={currentRef}
        style={{
          maxHeight: "0px",
          overflow: "hidden",
          transition: "max-height 0.1s ease-in-out",
        }}
        className={`${
          showDropDown ? "" : ""
        } overflow-hidden rounded absolute right-0 z-10 mt-2 w-56 bg-white origin-top-right ${listStyle}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="py-1" role="none">
          {dropDownList.map((value, index) => {
            return (
              <a
                key={index}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
                onClick={() => setDropdownHeight(currentRef, id)}
              >
                {value}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
