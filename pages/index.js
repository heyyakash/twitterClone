import Head from 'next/head'
import Feed from '../Components/Feed'
import Login from '../Components/Login'
import { getProviders, getSession, useSession } from "next-auth/react"
import LeftSide from '../Components/LeftSide'
import Modal from '../Components/Modal'

export default function Home({providers}) {
  const { data: session } = useSession();
  if(!session) return <Login providers = {providers} />
  
  return (
    <div className="bg-black">
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Twitter clone made using next js" />
      </Head>

      <main className='bg-black relative min-h-screen flex max-w-[1200px] mx-auto'>
        <LeftSide />
        <Feed />
        <Modal />
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  // const trendingResult = await fetch("https://jsonkeeper.com/b/NKEV").then(
  //   (res) => res.json()
  // );
  // const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
  //   (res) => res.json()
  // );
  const session = await getSession(context);
  const providers = await getProviders();
  return {
    props:{
      // trendingResult,
      // followResults,
      session,
      providers
    }
  }

}