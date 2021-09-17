import React, { Children, useState } from 'react';
import SideBar from '../SideBar';
import { layout, main } from './layout.module.css'

const Layout = ({ children }) => {
    const [isExpand, setIsExpand] = useState(true)
    
    const sizeSideBar = isExpand? "300px":"112px"
    return (
        <>
            <div className="layout">
                <SideBar sizeSideBar={sizeSideBar} isExpand={isExpand} setIsExpand={setIsExpand}></SideBar>
                <main className={main}>
                    {children}
                </main>
            </div>
            <style jsx>{`
                .layout{
                    display: grid;
                    grid-template-columns: ${sizeSideBar} 1fr;
                    height: 100vh;
                }
            `}</style>
        </>
    );
}
export default Layout;