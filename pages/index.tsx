import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <h1>Here is Header Area</h1>
      </Head>

      <main className={styles.main}>
        <h1>Welcome to Justin Toy project</h1>
        <div>Here is Main body</div>
      </main>

      <footer>
        <h1>Here is footer Area</h1>
      </footer>
    </div>
  );
};

export default Home;
