import Head from "next/head";
import { FC } from "react";
import Homepage from "../src/containers/Homepage";

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>Homepage</title>
        <link rel="icon" href="/icons/dklogo.svg" />
      </Head>
      <Homepage />
    </>
  );
};

export default Home;
