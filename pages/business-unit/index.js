import React, {useState} from 'react';
import DetailSideBar from '../../src/container/DetailSideBar';
const customer = ({businessunit}) => {
    return ( 
        <>
            <DetailSideBar title="Business units" data={businessunit}></DetailSideBar>
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

    const businessunit = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/business-unit`)
    .then(res => res.json())

    return {
        props: {
            businessunit: businessunit,
        }
    };



}