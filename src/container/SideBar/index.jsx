import React, {useState} from 'react';
import Logo from '../../Icons/logo';
import sidebar from './sidebar.module.css'
const SideBar = () => {
    return ( 
        <aside className={sidebar.sidebar}>
            <header className={sidebar.header}>
                <Logo/> Cadena de suministros
            </header>

            <section className={sidebar.wrapper_nav}>
                <header>Overview</header>
                <nav>
                    <ul>
                        <li>
                            <Anchor href="/business-unit">
                                Business unit
                            </Anchor>
                        </li>
                        <li>
                            <Anchor href="/supplier">
                                Suppliers
                            </Anchor>
                        </li>
                        <li>
                            <Anchor href="/distributor">
                                Distributors
                            </Anchor>
                        </li>
                        <li>
                            <Anchor href="/customer">
                                Customers
                            </Anchor>
                        </li>
                    </ul>
                </nav>
            </section>


            <section className={sidebar.wrapper_nav}>
                <header>Overview</header>
                <nav>
                    <ul>
                        <li>
                            <Anchor href="/account">
                                Account
                            </Anchor>
                        </li>
                        <li>
                            <Anchor href="/company">
                                Company
                            </Anchor>
                        </li>
                    </ul>
                </nav>
            </section>

            <footer className={sidebar.footer}>
                <Avatar name="Alexander Briones" otherInfo="EMTRAFESA"/>
                <Options/>
            </footer>

        </aside>
    );
}
export default SideBar;