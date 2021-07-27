import React, {useState} from 'react';
import {process,process_item} from './process.module.css'
const ProcessMap = () => {
    return ( 
        <>
            <section className={process}>
                <div className={process_item}>1</div>
                <div className={process_item}>2</div>
                <div className={process_item}>3</div>
            </section>
        </>
    );
}
export default ProcessMap;