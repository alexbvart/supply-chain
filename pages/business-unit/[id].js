
import { useState } from 'react';
import DetailSideBar from '../../src/container/DetailSideBar';
import EnterpriseInfo from '../../src/container/EnterpriseInfo/EnterpriseInfo';
import updateById from '../../utils/updateById';
import {supply_chain} from './businnes.module.css'

const businessunit = ({businessunit,businessunits, supplychain}) => {

    const newRelation = 
            {
                "from": {
                    "name": "MADIC S.A.C."
                },
                "to": {
                    "name": "SCANIA SERVICES DEL PERU S.A"
                }
            }
    const allRelations = {
        "relation": [...supplychain.relation, newRelation]
    }         

    const handleClick =()=>{
        const upSuplltChain = updateById("http://localhost:3001/supply-chain",supplychain.id, allRelations)
        console.log(upSuplltChain);
    }


    
    const regex = / /ig;
    const relationshipList = supplychain.relation.map((relation)=>(
        `${Object.values(relation)[0].name.replace(regex, '-')} --> ${Object.values(relation)[1].name.replace(regex, '-')}`
    ))
    
    const regex_coma = /,/ig;
    const relationshipList_plainText = relationshipList.join(',').replace(regex_coma,'\n')

    return ( 
        <>
            <DetailSideBar title="Business units" data={businessunits}></DetailSideBar>

            <buton onClick={handleClick}> presioname</buton>

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