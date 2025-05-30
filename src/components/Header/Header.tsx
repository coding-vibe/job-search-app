import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import ACCESS_TOKEN_COOKIE_NAME from "@/constants/accessTokenCookieName";
import routes from "@/constants/routes";
import useLogout from "@/hooks/useLogout";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const handleLogout = useLogout();

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get(ACCESS_TOKEN_COOKIE_NAME));
  }, []);

  return (
    <header className="bg-slate-900 text-white shadow-md border-b border-slate-700">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold hover:text-blue-400 transition-colors"
        >
          Job Search
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href={routes.LIKED_JOBS}
            className="transition-all duration-300 text-gray-300 hover:scale-110 hover:text-red-400"
            aria-label="Liked Jobs"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-red-500/80 text-white hover:bg-red-600 transition-colors"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                href={routes.SIGN_IN}
                className="px-4 py-2 rounded-md bg-blue-500/80 text-white hover:bg-blue-600 transition-colors"
              >
                Sign in
              </Link>
              <span className="text-gray-300 font-bold">|</span>
              <Link
                href={routes.CREATE_PROFILE}
                className="px-4 py-2 rounded-md bg-blue-500/80 text-white hover:bg-blue-600 transition-colors"
              >
                Create profile
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
