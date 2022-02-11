import React from 'react';
import TopBar from './TopBar';
import Head from 'next/head';

function Layout({children}) {
    return (
        <>
        <Head>
        <title>iKanban</title>
        </Head>
        <div className="min-w-full min-h-screen  h-screen overflow-hidden bg-gray-50">
            <TopBar/>
            <main className=" pt-16">
                {children}
            </main>
        </div>
        </>
        
    );
}

export default Layout;