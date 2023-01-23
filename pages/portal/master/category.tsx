import Head from "next/head";
import React from "react";

import CategoryComponent from "../../../src/containers/Portal/Master/Category";


const Book: React.FC = () => {
  return (
    <>
      <Head>
        <title>Portal - Book</title>
        <link rel="icon" href="/icons/dklogo.svg" />
      </Head>
      <CategoryComponent />
    </>
  );
};

export default Book;