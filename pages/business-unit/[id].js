
import { useState } from 'react';
import DetailSideBar from '../../src/container/DetailSideBar';
import EnterpriseInfo from '../../src/container/EnterpriseInfo/EnterpriseInfo';
import {supply_chain} from './businnes.module.css'

const businessunit = ({businessunit,businessunits, supplychain}) => {


    const regex = / /ig;
    const relationshipList = supplychain.relation.map((relation)=>(
                    
        `${Object.values(relation)[0].name.replace(regex, '-')} --> ${Object.values(relation)[1].name.replace(regex, '-')}`
    ))
    
    const regex_coma = /,/ig;
    const relationshipList_plainText = relationshipList.join(',').replace(regex_coma,'\n')

    return ( 
        <>
            <DetailSideBar title="Business units" data={businessunits}></DetailSideBar>

            <div className={`mermaid ${supply_chain}`}>
                {`
                
                    graph LR
                    
                    ${relationshipList_plainText}
                    
                `}
            </div>
        </>
    );
}
export default businessunit;

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;
    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const businessunits = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/business-unit`)
    .then(res => res.json())
    

    const businessunit = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/business-unit/?id=${id}`)
        .then(res => res.json())

    const supplychain = await fetch(`${SERVER_HOST}/supply-chain?enterpriseId=${ENTERPRISE_ID}&business-unitId=${id}`)
    .then(res => res.json())


    return {
        props: {
            businessunits:businessunits,
            businessunit: businessunit[0],
            supplychain: supplychain[0]
        }
    };



}