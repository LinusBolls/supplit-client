import type { NextPage } from "next";
import Head from "next/head";
import NodeMapEditor from "../components/NewMapEditor";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <script
          defer
          src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"
          integrity="sha384-SlE991lGASHoBfWbelyBPLsUlwY1GwNDJo3jSJO04KZ33K2bwfV9YBauFfnzvynJ"
          crossOrigin="anonymous"
        />
      </Head>
      <NodeMapEditor />
    </>
  );
};
export default Page;
