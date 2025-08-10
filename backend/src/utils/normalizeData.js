// this method returns the first letter of string as UpperCase.
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.substring(1);
};

//removing whitespace from both sides of a string and converting it into lowercase.
export const normalizeString = (string) => {
  return string.trim().toLowerCase();
};
