import React, {useState} from 'react';
import Anchor from '../../components/Anchor';
import Avatar from '../../components/Avatar';
import Logo from '../../Icons/logo';
import Options from '../../Icons/options';
import sidebar from './sidebar.module.css'
const SideBar = () => {
    return ( 
        <aside className={sidebar.sidebar}>
            <header className={sidebar.header}>
                <Anchor href="/">
                    <Logo/> Suplply Chain
                </Anchor>
            </header>

            <section className={sidebar.wrapper_nav}>
                <header>Overview</header>
                <nav>
                    <ul>
                        <li  key="business-unit" >
                            <Anchor href="/business-unit/">
                                Business unit
                            </Anchor>
                        </li>
                        <li key="process">
                            <Anchor href="/process/">
                                Processes
                            </Anchor>
                        </li>
                        <li key="supplier">
                            <Anchor href="/supplier/">
                                Suppliers
                            </Anchor>
                        </li>
                        <li key="distributor">
                            <Anchor href="/distributor/">
                                Distributors
                            </Anchor>
                        </li>
                        <li key="customer">
                            <Anchor href="/customer/">
                                Customers
                            </Anchor>
                        </li>
                        <li key="objective">
                            <Anchor href="/objective/">
                                Objectives
                            </Anchor>
                        </li>
                        <li key="indicator">
                            <Anchor href="/indicator/">
                                Indicators
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