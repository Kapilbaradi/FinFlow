import BASE_URL from "./BaseURL";

const BASE_USER_URL = `${BASE_URL}/user`;

export const LOGIN_URL = BASE_USER_URL + "/login";
export const SIGNUP_URL = BASE_USER_URL + "/signup";
export const GETUSER_URL = BASE_USER_URL + "/getuser";
export const DELETEUSER_URL = BASE_USER_URL + "/delete-user";
export const UPDATE_USERNAME_URL = BASE_USER_URL + "/update-username";
export const UPDATE_EMAIL_URL = BASE_USER_URL + "/update-email";
export const UPDATE_PASSWORD_URL = BASE_USER_URL + "/update-password";