import React from 'react'
import type { NextPage } from 'next'
import dynamic from "next/dynamic";
import Candlestick from "~components/charts/Candlestick";

// const Candlestick = dynamic(() => import('~components/charts/Candlestick'), {
//   ssr: false,
// });

const Home: NextPage = () => {
  return (
    <>
      <Candlestick />
    </>
  )
}

export default Home
