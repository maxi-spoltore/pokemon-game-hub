import Head from 'next/head'
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Pokémon Game Hub</title>
        <meta name="description" content="Pokémon mini game to play by yourself or among friends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
				<Navbar />
				{children}
			</main>
    </>
  )
}
