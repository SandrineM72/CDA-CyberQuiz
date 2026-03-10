import { Quantico } from "next/font/google";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client/react";
import type { AppProps } from "next/app";
import client from "@/graphql/client";
import dynamic from "next/dynamic";

const quantico = Quantico({
  weight: "400",
  subsets: ["latin"],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div className={quantico.className}>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default dynamic(() => Promise.resolve(App), { ssr: false });