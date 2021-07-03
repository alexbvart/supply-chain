import React, {Children, useState} from 'react';
import SideBar from '../SideBar';
import {layout } from './layout.module.css'

const Layout = ({children}) => {
    return ( 
        <>
            <div className={layout}>
                <SideBar></SideBar>
                <main>
                    {children}
                </main>
            </div>
        </>
    );
}
export default Layout;