import Head from 'next/head';
import Homepage from "./index/Homepage";
import 'tailwindcss/tailwind.css';

// Your component code here


export default function Home() {
  return (
    <>
      <Head>
        <title>Youtube Video Downloader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <Homepage/>
        </div>

      </main>
    </>
  );
}
