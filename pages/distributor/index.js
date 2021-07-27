import React from 'react';
import DetailSideBar from '../../src/container/DetailSideBar';
import EnterpriseInfo from '../../src/container/EnterpriseInfo/EnterpriseInfo';
const distributor = ({distributors,distributor}) => {
    return ( 
        <>
            <DetailSideBar title="Distributors" data={distributors}></DetailSideBar>
            {distributor&&
                <EnterpriseInfo 
                    address={distributor.ADDRESS} 
                    name={distributor.COMPANY_NAME||distributor.FULL_NAME} 
                    phone={distributor.TELEPHONE} 
                    ruc={distributor.RUC}
                    dni={distributor.DNI} 
                    salesman={distributor.LEGAL_REPRESENTATIVE}
                    />
            }
            
        </>
    );
}
export default distributor;

export async function getServerSideProps(context) {
    const { params } = context;

    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const distributors = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/distributor`)
    .then(res => res.json())

    return {
        props: {
            distributors: distributors,
            distributor: distributors[0]||false,
        }
    };



}