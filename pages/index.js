import Head from 'next/head'
import Layout from '../components/layout'
import GameList from '../components/gamelist'
import { getGameList } from './api/gamedata'

export default function Home({ gameData }) {
  return (
    <div className='container w-full max-w-full'>
      <Head>
        <title>Pokémon Game Hub</title>
        <meta name="description" content="Pokémon mini game to play by yourself or among friends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className='w-full md:h-screen-vertical bg-opening bg-cover xl:bg-contain overflow-hidden'>
          <div className='w-full md:w-9/12 p-4 md:p-0 mx-auto'>
            <h1 className='main-title text-4xl md:text-7xl mb-4 pt-8 text-center'>Pokémon Game HUB</h1>
            <p className='text-sm md:text-lg font-medium text-center mt-2'>A collection of Pokémon mini games to play among friends!</p>
          </div>
          <GameList gameData={gameData} />
        </div>
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  const gameData = getGameList();
  return {
    props: {
      gameData
    }
  }
}