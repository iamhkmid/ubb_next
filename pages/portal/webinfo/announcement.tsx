import Head from "next/head";
import React from "react";

import AnnouncementComponent from "../../../src/containers/Portal/Webinfo/Announcement";


const Announcement: React.FC = () => {
  return (
    <>
      <Head>
        <title>Portal - Announcement</title>
        <link rel="icon" href="/icons/ubb_press_logo.png" />
      </Head>
      <AnnouncementComponent/>
    </>
  );
};

export default Announcement;