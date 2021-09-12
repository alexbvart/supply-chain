import Link from 'next/link';
import React, {useState} from 'react';
import ActivityTrackingDiagram from '../../../../src/container/ActivityTrackingDiagram';
import DetailSideBar from '../../../../src/container/DetailSideBar';
import ProcessCatigorization from '../../../../src/container/ProcessCategorization';

import {main_types,header} from './styles.module.css'

const index = ({processs,process,type,id}) => {
    const types={
        characterization: "610e55aee91a3d5a64e81056",
        flow:"610e55aee91a3d5a64e81057",
    }

    const theType = types[type];
    console.log({process},{theType},{types},{type})

    return ( 
        <>
            <DetailSideBar title="processs" data={processs}></DetailSideBar>
            <div className={`main ${main_types}`}>
            <header className={header}>

            <Link href={`http://localhost:3000/process/${id}/tracking`}><a>Activity tracking diagram</a></Link>
                    <Link href={`http://localhost:3000/process/${id}/characterization`}><a>Process characterization</a></Link>
                    <Link href={`http://localhost:3000/process/${id}/flow`}><a>Flowchart</a></Link>
            </header>
                <br></br>
                <h1 className="subtitle_section">{process.name}</h1>
                <br></br>
                {
                    type =="tracking"?
                    <ActivityTrackingDiagram processId={process.id} />
                    :<ProcessCatigorization processId={process.id} theType={theType}/>
                }
            </div>
        </>
    );
}
export default index;

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;
    const SERVER_HOST = "http://localhost:5000";
    const SERVER_HOST_ = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const processs = await fetch(`${SERVER_HOST}/data`)
        .then(res => res.json())
    const processOrder = processs.process.sort(function (a, b) {
        if (a.priority > b.priority) {
            return -1;
        }
        if (a.priority < b.priority) {
            return 1;
        }
        return 0;
    });

    /*    
       const process = processs.process.filter((p)=> p._id === id)
       console.log(process) 
        
       const processs = await fetch(`${SERVER_HOST_}/enterprise/${ENTERPRISE_ID}/process`)
           .then(res => res.json())
       */

    const process = await fetch(`${SERVER_HOST_}/enterprise/${ENTERPRISE_ID}/process/?id=${id}`)
        .then(res => res.json())

    return {
        props: {
            processs: processOrder,
            process: process[0],
            type :params.types,
            id:id
        }
    };
}