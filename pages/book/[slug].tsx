import { GetServerSideProps } from "next";
import BookDetail from "../../src/containers/BookDetail";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;
  const slug = params!.slug;
  return {
    props: { slug }, // will be passed to the page component as props
  }
}

export default BookDetail;
