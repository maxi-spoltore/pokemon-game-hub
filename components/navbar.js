import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
	const router = useRouter();
	const navLinkClasses = `flex ${router.asPath == '/' ? 'font-medium' : ''}`;

  return (
    <nav className='w-full h-16 bg-red-500 flex'>
			<ul className='w-9/12 mx-auto flex '>
				<li className={navLinkClasses}>
					<Link href="/">
						<a className='text-white flex items-center hover:bg-red-700 px-4'>Home</a>
					</Link>
				</li>
			</ul>
    </nav>
  )
}
