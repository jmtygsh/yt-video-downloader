import React from 'react'
import Link from 'next/link'
import Logo from '../../public/logo.svg'
import Image from 'next/image'

const Navbar = () => {
    return (

        <header className="border-b border-gray-300 shadow-xl w-[85%] m-auto rounded-b-lg bg-[#FF0000]">
            <nav className="container mx-auto flex justify-center items-center py-4">
                <Image src={Logo} width={100} height={100} alt='yt' />
                <Link href="/" className="text-white hover:text-gray-900 font-bold px-4">Home</Link>
                <Link href="/home" className="text-white hover:text-gray-900 font-bold px-4">Video to Mp3</Link>
                <Link href="/" className="text-white hover:text-gray-900 font-bold px-4">Youtube Shorts</Link>
                <Link href="/" className="text-white hover:text-gray-900 font-bold px-4">Playlist Download</Link>
            </nav>
        </header>

    )
}

export default Navbar
