import Head from "next/head";
import React from "react";

import ContactComponent from "../../../src/containers/Portal/Webinfo/Contact";


const Book: React.FC = () => {
  return (
    <>
      <Head>
        <title>Portal - Contact</title>
        <link rel="icon" href="/icons/dklogo.svg" />
      </Head>
      <ContactComponent />
    </>
  );
};

export default Book;