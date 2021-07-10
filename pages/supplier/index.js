import React, {useState} from 'react';

import DetailSideBar from '../../src/container/DetailSideBar';
import EnterpriseInfo from '../../src/container/EnterpriseInfo/EnterpriseInfo';
import getAll from '../../utils/getAll';
const supplier = ({suppliers}) => {

    const unProveedor =     {
        "DNI": "73693057",
        "FULL_NAME": "JOSEFA SOLANYI HUAMAN CHINGUEL",
        "TELEPHONE": "973693057",
        "ADDRESS": "",
        "LEGAL_PERSON": false,
        "enterpriseId": 2,
        "id": 16
    }
    /* name, dni, ruc, salesman, phone, address, logo */

    return ( 
        <>
            <DetailSideBar title="Suppliers" data={suppliers}></DetailSideBar>
            <EnterpriseInfo 
                address={unProveedor.ADDRESS} 
                name={unProveedor.COMPANY_NAME||unProveedor.FULL_NAME} 
                phone={unProveedor.TELEPHONE} 
                ruc={unProveedor.RUC}
                dni={unProveedor.DNI} 
                salesman={unProveedor.LEGAL_REPRESENTATIVE}
                />
        </>
    );
}
export default supplier;

export async function getServerSideProps(context) {
    const { params } = context;
    console.log(context);

    /* const { query } = params; */
    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const suppliers = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/supplier`)
    .then(res => res.json())

    return {
        props: {
            suppliers: suppliers,
        }
    };
}