import React, {useState} from 'react';
import Link from 'next/link'
import {anchor} from './anchor.module.css'
const Anchor = ({href,children}) => {
    return ( 
        <>
            <div className={anchor}>
                <Link href={href} >
                    <a >
                        {children}
                    </a>
                </Link>
            </div>
            
        </>
    );
}
export default Anchor;