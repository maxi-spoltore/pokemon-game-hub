import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {

  return (
    <nav className='w-full h-16 bg-red-500 flex'>
			<ul className='w-full md:w-9/12 mx-auto flex '>
				<li className='flex'>
					<Link href="/">
						<a className='text-white flex items-center hover:bg-red-700 px-4'>
							<Image src='/images/pokemon_center.png' width={40} height={40} />
						</a>
					</Link>
				</li>
			</ul>
    </nav>
  )
}
