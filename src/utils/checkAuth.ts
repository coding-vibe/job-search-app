import ACCESS_TOKEN_COOKIE_NAME from "@/constants/accessTokenCookieName";
import Cookies from "js-cookie";

export default function checkAuth() {
  return !!Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
}
