import Head from "next/head";
import React from "react";
import PortalComponent from "../../src/containers/Portal";


export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/portal/master/book",
    },
    props: {},
  };
}

const Portal: React.FC = () => {

  return (
    <>
      <Head>
        <title>Portal</title>
        <link rel="icon" href="/icons/dklogo.svg" />
      </Head>
      <PortalComponent />
    </>
  );
};

export default Portal;
