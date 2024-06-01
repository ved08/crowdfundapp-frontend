import type { NextPage,  } from "next";
import Head from "next/head";
import { BasicsView } from "views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>FunDApp by ved</title>
        <meta
          name="description"
          content="A crowdfunding application on solana"
        />
      </Head>
      <BasicsView />
    </div>
  );
};

export default Home;
