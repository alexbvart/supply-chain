import React, { useState } from 'react';
import Account from 'src/Icons/Account';
import Bussines from 'src/Icons/Bussines';
import Company from 'src/Icons/Company';
import Customer from 'src/Icons/Customer';
import Distributor from 'src/Icons/Distributor';
import Indicator from 'src/Icons/Indicator';
import Objectives from 'src/Icons/Objectives';
import Process from 'src/Icons/Process';
import Supplier from 'src/Icons/Supplier';
import Anchor from '../../components/Anchor';
import Avatar from '../../components/Avatar';
import Logo from '../../Icons/logo';
import Options from '../../Icons/options';
import sidebar from './sidebar.module.css'
const SideBar = ({sizeSideBar,isExpand,setIsExpand}) => {
    return (
        <>
            <aside className="sidebar">
                <header className={sidebar.header}>
                    <Anchor href="/">
                        <Logo /> <span>Suplply Chain</span>
                    </Anchor>
                </header>

                <section className={sidebar.wrapper_nav}>
                    <header onClick={()=>setIsExpand(!sizeSideBar)}>Overview</header>
                    <nav>
                        <ul>
                            <li key="business-unit" >
                                <Anchor href="/business-unit/">
                                    <Bussines/> <span>Business unit</span>
                                </Anchor>
                            </li>
                            <li key="process">
                                <Anchor href="/process/">
                                    <Process/> <span>Processes</span>
                                </Anchor>
                            </li>
                            <li key="supplier">
                                <Anchor href="/supplier/">
                                    <Supplier /> <span>Suppliers</span>
                                </Anchor>
                            </li>
                            <li key="distributor">
                                <Anchor href="/distributor/">
                                    <Distributor/> <span>Distributors</span>
                                </Anchor>
                            </li>
                            <li key="customer">
                                <Anchor href="/customer/">
                                    <Customer/> <span>Customers</span>
                                </Anchor>
                            </li>
                            <li key="objective">
                                <Anchor href="/objective/">
                                    <Objectives/> <span>Objectives</span>
                                </Anchor>
                            </li>
                            <li key="indicator">
                                <Anchor href="/indicator/">
                                    <Indicator/> <span>Indicators</span>
                                </Anchor>
                            </li>
                        </ul>
                    </nav>
                </section>


                <section className={sidebar.wrapper_nav}>
                    <header>Account</header>
                    <nav>
                        <ul>
                            <li>
                                <Anchor href="/account">
                                    <Account/> <span> Profile</span>
                                </Anchor>
                            </li>
                            <li>
                                <Anchor href="/company">
                                    <Company/> <span>Company</span>
                                </Anchor>
                            </li>
                        </ul>
                    </nav>
                </section>

                <footer className={sidebar.footer}>
                    <Avatar name={isExpand?"Alexander Briones":""} otherInfo="EMTRAFESA" />
                    <Options />
                </footer>

            </aside>
            <style jsx>{`
                .sidebar{
                    width: ${sizeSideBar} ;
                    height: 100vh;
                    background: rgba(37, 35, 46, 0.2);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    position: sticky;
                    top:0;
                }
                span{
                    display: ${isExpand ? "block" :"none"}
                }
            `}</style>
        </>
    );
}
export default SideBar;