import Head from "next/head";
import React from "react";
import Login from "../../src/containers/Portal/Login";

const login: React.FC = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/icons/ubb_press_logo.png" />
      </Head>
      <Login />
    </>
  );
};

export default login;
