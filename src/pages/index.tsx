import { type NextPage } from "next";
import Head from "next/head";

// import { api } from "@/utils/api";
import Header from "./components/Header";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from Note Taker" });
  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );
  return (
    <>
      <Head>
        <title>Cobra Note Taker</title>
        <meta
          name="description"
          content="NoteTaker app created using create-t3-app & Supabase"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start p-5">
        <Header />
      </main>
    </>
  );
};

export default Home;
