import React, {useState} from 'react';
import BussinesUnitRegisterForm from '../../src/components/RegisterForm/BussinesUnitRegisterForm';
import DetailSideBar from '../../src/container/DetailSideBar';
const newBusinessUnit = ({businessunit}) => {
    return ( 
        <>
            <DetailSideBar title="Business units" data={businessunit} />
            <BussinesUnitRegisterForm type="Business Unit" title="Register the name of the business unit" />
        </>
    );
}
export default newBusinessUnit;

export async function getServerSideProps(context) {

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