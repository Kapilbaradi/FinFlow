import { useState, RefObject } from "react";

export const useDropdownToggle = () => {
  const [showDropDown, setShowDropDown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setShowDropDown((prev) => (prev === id ? null : id)); // dateRange.
  };

  const setDropdownHeight = (
    currentRef: RefObject<HTMLDivElement | null>,
    id: string
  ) => {
    const currentElement = currentRef.current;
    if (currentElement) {
      if (!showDropDown) {
        const height = currentElement.scrollHeight;
        currentElement.style.maxHeight = height + "px";
        currentElement.style.border = "1px solid #d1d5dc";
      } else {
        currentElement.style.border = "none";
        currentElement.style.maxHeight = "0px";
      }
    }

    toggleDropdown(id);
  };
  return { showDropDown, toggleDropdown, setDropdownHeight };
};
