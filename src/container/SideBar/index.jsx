import React, {useState} from 'react';
import Logo from '../../Icons/logo';
import sidebar from './sidebar.module.css'
const SideBar = () => {
    return ( 
        <aside className={sidebar.sidebar}>
            <header className={sidebar.header}>
                <Logo/> Cadena de suministros
            </header>

            <footer>
                
            </footer>

        </aside>
    );
}
export default SideBar;