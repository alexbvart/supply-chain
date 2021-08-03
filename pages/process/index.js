import React, {useState} from 'react';
import DetailSideBar from '../../src/container/DetailSideBar';
import EnterpriseInfo from '../../src/container/EnterpriseInfo/EnterpriseInfo';
const process = ({processs, process}) => {
    return ( 
        <>
            <DetailSideBar title="processs" data={processs}></DetailSideBar>
            <EnterpriseInfo 
                address={process.ADDRESS} 
                name={process.COMPANY_NAME||process.FULL_NAME} 
                phone={process.TELEPHONE} 
                ruc={process.RUC}
                dni={process.DNI} 
                salesman={process.LEGAL_REPRESENTATIVE}
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
            process: processs[0],
        }
    };



}