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
        <div className='w-9/12 mt-8 mx-auto'>
          <h1 className='text-4xl font-bold text-center'>Pokémon Game HUB</h1>
          <p className='text-lg font-medium text-center mt-2'>A collection of pokémon mini games to play among friends!</p>
        </div>
        <GameList gameData={gameData} />
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