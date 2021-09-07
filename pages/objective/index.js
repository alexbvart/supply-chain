import React, {useState} from 'react';

import DetailSideBar from '../../src/container/DetailSideBar';
import EnterpriseInfo from '../../src/container/EnterpriseInfo/EnterpriseInfo';

const supplier = ({objectives}) => {

    return ( 
        <>
            <DetailSideBar title="Objectives" data={objectives}></DetailSideBar>
        </>
    );
}
export default supplier;

export async function getServerSideProps(context) {
    const { params } = context;

    /* const { query } = params; */
    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const objectives = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/objectives`)
    .then(res => res.json())

    return {
        props: {
            objectives: objectives,
        }
    };
}