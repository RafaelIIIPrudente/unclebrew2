import Head from "next/head";
import { Navbar } from "../components/components";
import { type NextPage } from "next";
import { api } from "~/utils/api";


const Inventory: NextPage = () => {
  return (
    <>  
      <Navbar></Navbar>
      <Head> 
        {/* <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
       <h1> HELLO </h1>
      </main>
    </>
  ); 
}

export default Inventory;
