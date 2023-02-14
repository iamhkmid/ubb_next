import Head from "next/head";
import React from "react";
import FooterInfoComponent from "../../../src/containers/Portal/Webinfo/FooterInfo";

const Book: React.FC = () => {
  return (
    <>
      <Head>
        <title>Portal - Footer Info</title>
        <link rel="icon" href="/icons/ubb_press_logo.png" />
      </Head>
      <FooterInfoComponent />
    </>
  );
};

export default Book;