import React from 'react';
import Image from 'next/image';


import Navbar from './Navbar';
import Search from '../components/Search';
import Download from '../../public/download.svg';
import Un from '../../public/un.svg';
import Auto from '../../public/auto.svg';



const Homepage = () => {
    return (
        <>
            <section className='pb-20'>
                <Navbar />
                <div>
                    <div className='text-center m-auto mt-20 w-3/6 p-10 rounded-md'>
                        <h2 className='text-black bolder text-2xl'>Youtube Video Downloader</h2>
                    </div>
                    <div className='w-2/5 m-auto shadow-xl'>
                        <Search/>
                        {/* <form>
                            <label htmlFor="default-search" className="b-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300  rounded-lg bg-gray-50 focus:ring-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500" placeholder="Paste Youtube Video Link" required />
                                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                        </form> */}
                    </div>
                </div>
            </section>
            <div className='mb-10'>
                <hr></hr>
            </div>

            <section className='flex justify-center'>
                <div className='w-[25%] bg-white rounded-lg shadow-xl p-6 m-2 text-center flex flex-col justify-center items-center'>
                    <Image src={Un} width={100} alt='Unlimited Conversions' />
                    <h2 className='text-xl font-semibold mb-2'>Unlimited Conversions</h2>
                    <p className='text-gray-600'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse assumenda voluptatibus dolorum.
                    </p>
                </div>

                <div className='w-[25%] bg-white rounded-lg shadow-xl p-6 m-2 text-center flex flex-col justify-center items-center'>
                    <Image src={Auto} width={80} alt='Auto Fetch from Youtube' />
                    <h2 className='text-xl font-semibold mb-2'>Auto Fetch from Youtube</h2>
                    <p className='text-gray-600'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse assumenda voluptatibus dolorum.
                    </p>
                </div>
                <div className='w-[25%] bg-white rounded-lg shadow-xl p-6 m-2 text-center flex flex-col justify-center items-center'>
                    <Image src={Download} width={100} alt='High Speed Download' />
                    <h2 className='text-xl font-semibold mb-2'>High Speed Download</h2>
                    <p className='text-gray-600'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse assumenda voluptatibus dolorum.
                    </p>
                </div>

            </section>

        </>
    );
};

export default Homepage;

