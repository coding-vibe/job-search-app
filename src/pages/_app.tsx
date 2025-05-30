import { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import { NextPage } from "next";
import { SnackbarProvider } from "notistack";
import LikedJobsProvider from "@/components/LikedJobsProvider";
import "@/styles/globals.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SnackbarProvider>
      <LikedJobsProvider>
        {getLayout(<Component {...pageProps} />)}
      </LikedJobsProvider>
    </SnackbarProvider>
  );
}
