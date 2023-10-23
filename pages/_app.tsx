import { AppProps } from "next/app";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import Layout from "../components/layout";
import "../scss/global.scss";
import { rtlCache } from "../rtl-cache";
import { NextIntlClientProvider } from "next-intl";
import { RouterTransition } from "../components/global/RouterTransition";
import { SessionProvider } from "next-auth/react";
import { Notifications } from "@mantine/notifications";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <div dir={pageProps.lang === "ar" ? "rtl" : "ltr"}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionCache={pageProps.lang === "ar" ? rtlCache : undefined}
        theme={{
          dir: pageProps.lang === "ar" ? "rtl" : "ltr",
          colors: {
            orange: [
              "#fff0e5",
              "#fedfd2",
              "#f5bda5",
              "#ee9975",
              "#e87a4c",
              "#e56832",
              "#e55d24",
              "#cc4c17",
              "#b64312",
              "#9f370a",
            ],
            blk: [
              "#31302E",
              "#2E2D2B",
              "#2C2B29",
              "#292826",
              "#272624",
              "#252422",
              "#232220",
              "#21201E",
              "#1F1E1C",
              "#1D1C1B",
            ],
          },
          colorScheme: "light",
          fontFamily: "Roboto",
        }}
      >
        <SessionProvider session={pageProps?.session}>
          <NextIntlClientProvider messages={pageProps?.messages}>
            <Layout
              lang={pageProps?.lang}
              messages={pageProps?.messages}
              session={pageProps?.session}
              >
              <Notifications position="top-right" zIndex={9999999} />
              <RouterTransition />
              <Component {...pageProps} />
            </Layout>
          </NextIntlClientProvider>
        </SessionProvider>
      </MantineProvider>
    </div>
  );
}
