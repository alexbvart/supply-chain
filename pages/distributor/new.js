import React, {useState} from 'react';
import RegisterForm from '../../src/components/RegisterForm/RegisterForm';
import DetailSideBar from '../../src/container/DetailSideBar';
const newDistributor = ({distributors}) => {
    return ( 
        <>
            <DetailSideBar title="Distributors" data={distributors}></DetailSideBar>
            <RegisterForm 
                type="provider"
                title="Register new distributor"
            />
        </>
    );
}
export default newDistributor;

export async function getServerSideProps(context) {
    
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