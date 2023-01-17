import Head from "next/head";
import React from "react";
import Login from "../../src/containers/Portal/Login";

const login: React.FC = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/icons/dklogo.svg" />
      </Head>
      <Login />
    </>
  );
};

export default login;
