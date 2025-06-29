import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const MainLayouts = () => {
    return (
        <>
        <header className='bg-background'>
            <NavBar></NavBar>
        </header>
        <main>
            <Outlet></Outlet>
        </main>
        
        <footer>
        <Footer></Footer>
        </footer>
        </>
    );
};

export default MainLayouts;