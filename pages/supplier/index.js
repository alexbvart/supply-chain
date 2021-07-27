import React, {useState} from 'react';

import DetailSideBar from '../../src/container/DetailSideBar';
import EnterpriseInfo from '../../src/container/EnterpriseInfo/EnterpriseInfo';

const supplier = ({suppliers,supplier}) => {

    return ( 
        <>
            <DetailSideBar title="Suppliers" data={suppliers}></DetailSideBar>
            <EnterpriseInfo 
                address={supplier.ADDRESS} 
                name={supplier.COMPANY_NAME||supplier.FULL_NAME} 
                phone={supplier.TELEPHONE} 
                ruc={supplier.RUC}
                dni={supplier.DNI} 
                salesman={supplier.LEGAL_REPRESENTATIVE}
                />
        </>
    );
}
export default supplier;

export async function getServerSideProps(context) {
    const { params } = context;

    /* const { query } = params; */
    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const suppliers = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/supplier`)
    .then(res => res.json())

    return {
        props: {
            suppliers: suppliers,
            supplier: suppliers[0],
        }
    };
}