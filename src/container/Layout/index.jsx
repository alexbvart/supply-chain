import React, {Children, useState} from 'react';
import SideBar from '../SideBar';
import { wrapper, awas } from './layout.module.css'
const Layout = ({children}) => {
    return ( 
        <>
            <div className={wrapper}>
                <SideBar></SideBar>
                <div className={awas}></div>
                <main>
                    {children}
                </main>
            </div>
        </>
    );
}
export default Layout;