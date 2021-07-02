import React, {Children, useState} from 'react';
import SideBar from '../SideBar';
const Layout = ({children}) => {
    return ( 
        <>
            <div>
                <SideBar></SideBar>
                <main>
                    {children}
                </main>
            </div>
        </>
    );
}
export default Layout;