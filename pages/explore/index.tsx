import Head from "next/head";
import React from "react";
import Explore from "../../src/containers/Explore";

const ExploreRoute: React.FC = () => {

  return (
    <>
      <Head>
        <title>UBB Press | Explore Book</title>
        <link rel="icon" href="/icons/ubb_press_logo.png" />
      </Head>
      <Explore />
    </>
  );
};

export default ExploreRoute;
