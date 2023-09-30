import React from 'react';
import Image from 'next/image';


import Navbar from './Navbar';
import Download from '../../public/download.svg';
import Un from '../../public/un.svg';
import Auto from '../../public/auto.svg';
import Search from '../components/Search';
import Style from "./Css/Homepage.module.css";



const Homepage = () => {
    return (
        <>
            <section className='pb-10'>
                <Navbar />
                <div>
                    <div className='text-center m-auto mt-20 w-3/6 p-10 rounded-md'>
                        <h2 className='text-black bolder text-2xl'>Youtube Video Downloader</h2>
                    </div>
                    <div>
                        <Search />
                    </div>
                </div>
            </section>
            <div className='mb-10'>
                <hr></hr>
            </div>

            <section className='flex justify-center'>
                <div className={`w-[25%] bg-white rounded-lg shadow-xl p-6 m-2 text-center flex flex-col justify-center items-center ${Style['fade-in-from-bottom']}`}>
                    <Image src={Un} width={100} alt='Unlimited Conversions' />
                    <h2 className='text-xl font-semibold mb-2'>Unlimited Conversions</h2>
                    <p className='text-gray-600'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse assumenda voluptatibus dolorum.
                    </p>
                </div>

                <div className={`w-[25%] bg-white rounded-lg shadow-xl p-6 m-2 text-center flex flex-col justify-center items-center ${Style['fade-in-from-bottom']}`}>
                    <Image src={Auto} width={80} alt='Auto Fetch from Youtube' />
                    <h2 className='text-xl font-semibold mb-2'>Auto Fetch from Youtube</h2>
                    <p className='text-gray-600'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse assumenda voluptatibus dolorum.
                    </p>
                </div>
                <div className={`w-[25%] bg-white rounded-lg shadow-xl p-6 m-2 text-center flex flex-col justify-center items-center ${Style['fade-in-from-bottom']}`}>
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

