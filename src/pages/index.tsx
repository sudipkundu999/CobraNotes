import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";
import { Header } from "./components/Header";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from Note Taker" });

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

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && (
          <span>
            Logged in as
            <img
              src={sessionData.user?.image as string}
              className="mx-2 inline h-10 w-10 overflow-hidden rounded-full"
            />
            {sessionData.user?.name}
          </span>
        )}
        {secretMessage && <div> {secretMessage}</div>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
