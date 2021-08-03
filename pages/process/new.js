import React, {useState} from 'react';
import ProcessRegisterForm from '../../src/components/RegisterForm/ProcessRegisterForm';

import DetailSideBar from '../../src/container/DetailSideBar';
const process = ({processs}) => {
    return ( 
        <>
            <DetailSideBar title="processs" data={processs}></DetailSideBar>
            <ProcessRegisterForm 
                title="Register new process"
            />
        </>
    );
}
export default process;

export async function getServerSideProps(context) {
    const { params } = context;
    /* const { query } = params; */
    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const processs = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/process`)
    .then(res => res.json())

    return {
        props: {
            processs: processs,
        }
    };



}