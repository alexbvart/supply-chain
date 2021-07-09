import React, {useState} from 'react';
import DetailSideBar from '../../src/container/DetailSideBar';
const distributor = ({distributors}) => {
    return ( 
        <>
            <DetailSideBar title="Distributors" data={distributors}></DetailSideBar>
        </>
    );
}
export default distributor;

export async function getServerSideProps(context) {
    const { params } = context;
    console.log(context);
    /* const { query } = params; */
    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const distributors = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/distributor`)
    .then(res => res.json())

    return {
        props: {
            distributors: distributors,
        }
    };



}