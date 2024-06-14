import React from 'react'
import ItemContainer from './itemContainer';

const Footer = () => {
    return <footer className='bg-[#0477bf] text-white'>
        <div className='md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#44556635] py-7'>
            <h1 className='lg:text-5xl text-4xl sm:text-center lg:text-left md:mb-0 mb-6 lg:leading-normal font-semibold 
            md:w-2/6'>
                <span className='text-[#ffc247]'>Engineering</span> Pro Track</h1>
            <div>
                <input type='text'
                    placeholder='Enter your feedback'
                    className='text-gray-800 md:w-auto w-full sm:w-72 sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none'
                />
                <button className='bg-[#ffc247] hover:bg-[#ffc247d1] duration-300 px-5 py-2.5 font-[poppins] rounded-md text-white md:w-auto w-full'>
                    Send
                </button>
            </div>
        </div>
        <ItemContainer />

    </footer>
};

export default Footer;