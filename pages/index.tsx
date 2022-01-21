import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from "next/dynamic";

const Candlestick = dynamic(() => import('~components/charts/Candlestick'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <Candlestick />
  )
}

export default Home
