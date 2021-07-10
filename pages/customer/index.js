import React, {useState} from 'react';
import DetailSideBar from '../../src/container/DetailSideBar';
const customer = ({customers}) => {
    return ( 
        <>
            <DetailSideBar title="Customers" data={customers}></DetailSideBar>
        </>
    );
}
export default customer;

export async function getServerSideProps(context) {
    const { params } = context;
    console.log(context);
    /* const { query } = params; */
    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const customers = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/customer`)
    .then(res => res.json())

    return {
        props: {
            customers: customers,
        }
    };



}