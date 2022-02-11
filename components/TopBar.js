import React from 'react';
import {SearchIcon, AtSymbolIcon, BellIcon} from '@heroicons/react/outline';
import Image from 'next/image';

function TopBar(props) {
    return (
        <div className=" pl-6 fixed py-5
         w-full flex items-center justify-between pr-5">
            <div className="w-full px-5  text-center ">
                <span className=' font-bold text-4xl'>
                    iKan
                    <span className=' text-blue-700'>ban</span>
                    </span>
            </div>
            {/* <div className="flex space-x-6">
               <button className=' bg-white px-5 py-3 rounded font-semibold'>+ Add New Card</button>
            </div> */}
        </div>
    );
}

export default TopBar;