import { useContext } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import routes from '@/constants/routes';
import ACCESS_TOKEN_COOKIE_NAME from '@/constants/accessTokenCookieName';
import LikedJobContext from '@/contexts/LikedJobContext';

export default function useLogout() {
  const router = useRouter();
  const { reset } = useContext(LikedJobContext);

  const handleLogout = async () => {
    Cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
    router.push(routes.SIGN_IN);
    reset();
  };

  return handleLogout;
}
