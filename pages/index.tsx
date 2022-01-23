import React from 'react'
import type { NextPage } from 'next'
import dynamic from "next/dynamic";

const Candlestick = dynamic(() => import('src/components/charts/Candlestick'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <>
      <Candlestick />
    </>
  )
}

export default Home
