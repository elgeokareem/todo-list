import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Auth0Provider } from "@auth0/auth0-react";
import theme from "../components/theme";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "../components/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    // <UserProvider>
    <Auth0Provider
      domain={"dev-f1avuyxt.us.auth0.com"}
      clientId={"f0E9m9StgTWZDwN87LKD5CaM4TAcoOqW"}
      redirectUri={"http://localhost:3000/dashboard"}
    >
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Auth0Provider>
    // </UserProvider>
  );
}
