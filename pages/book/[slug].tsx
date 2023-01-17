import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC } from "react";
import Book from "../../src/containers/Book";
import { TBook } from "../../src/types/book";
import useQuery from "../../src/hooks/useQuery";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;
  const slug = params!.slug;
  return {
    props: { slug }, // will be passed to the page component as props
  }
}

type TBookPath = {
  slug: string;
};

type TResBook = {
  statusCode: string;
  data: TBook
}

const BookPath: FC<TBookPath> = ({ slug }) => {
  const { data, error, loading } = useQuery<TResBook>({
    method: "GET",
    url: "/api/book",
    params: { slug: slug as string }
  })
  return (
    <>
      <Head key={data?.data?.id}>
        <title>{data?.data?.title || "Book"}</title>
        <link rel="icon" href="/icons/dklogo.svg" />
      </Head>
      <Book data={data?.data} loading={loading} />
    </>
  );
};

export default BookPath;
