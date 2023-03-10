import Head from "next/head";
import React from "react";
import BookComponent from "../../../src/containers/Portal/Master/Book"

const Book: React.FC = () => {
  return (
    <>
      <Head>
        <title>Portal - Book</title>
        <link rel="icon" href="/icons/ubb_press_logo.png" />
      </Head>
      <BookComponent />
    </>
  );
};

export default Book;
