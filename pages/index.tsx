import Head from "next/head";
import { FC } from "react";
import Homepage from "../src/containers/Homepage";

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>UBB PRESS</title>
        <link rel="icon" href="/icons/ubb_press_logo.png" />
      </Head>
      <Homepage />
    </>
  );
};

export default Home;
