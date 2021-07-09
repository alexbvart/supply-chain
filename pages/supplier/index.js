import React, {useState} from 'react';
import DetailSideBar from '../../src/container/DetailSideBar';
const supplier = ({suppliers}) => {
    return ( 
        <>
            <DetailSideBar title="Suppliers" data={suppliers}></DetailSideBar>
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