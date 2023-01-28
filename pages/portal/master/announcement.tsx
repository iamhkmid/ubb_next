import Head from "next/head";
import React from "react";

import AnnouncementComponent from "../../../src/containers/Portal/Master/Announcement";


const Announcement: React.FC = () => {
  return (
    <>
      <Head>
        <title>Portal - Book</title>
        <link rel="icon" href="/icons/dklogo.svg" />
      </Head>
      <AnnouncementComponent/>
    </>
  );
};

export default Announcement;