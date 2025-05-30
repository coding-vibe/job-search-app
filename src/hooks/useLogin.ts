import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import authAPIClient from "@/api/authAPI";
import { SignInValuesType } from "@/components/SignInForm/validationSchema";
import routes from "@/constants/routes";
import ACCESS_TOKEN_COOKIE_NAME from "@/constants/accessTokenCookieName";

export default function useLogin(redirectUrl?: string) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (values: SignInValuesType) => {
    try {
      const {
        data: { accessToken },
      } = await authAPIClient.post<{ accessToken: string }>(
        "/auth/login",
        values
      );

      Cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken);

      if (redirectUrl) {
        router.push(routes.JOBS);
      }
    } catch {
      enqueueSnackbar("Invalid email or password", { variant: "error" });
    }
  };

  return handleLogin;
}
