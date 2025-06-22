import { useState, MouseEvent } from "react";

export const useDropdownToggle = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropdown = (event: MouseEvent) => {
    // console.log(event.currentTarget.parentElement)
    const parentElement = (event.currentTarget as HTMLElement).parentElement;
    const dropDownElement = parentElement?.nextSibling as HTMLElement;
    if (dropDownElement !== null && showDropDown) {
      console.log(dropDownElement?.scrollHeight);
      // dropDownElement.style.maxHeight = dropDownElement.scrollHeight + "px";
    }
    setShowDropDown((prev) => !prev);
  };
  return { showDropDown, toggleDropdown };
};
