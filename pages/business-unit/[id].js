
import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import PlainText from '../../Hooks/plainText';
import Mermaid from '../../src/components/Mermeid';


import PlusButton from '../../src/components/PlusButton/PlusButton';
import DetailSideBar from '../../src/container/DetailSideBar';

import EnterpriseInfo from '../../src/container/EnterpriseInfo/EnterpriseInfo';

import updateById from '../../utils/updateById';
import getById from '../../utils/getById';
import { supply_chain, float_tr, float_br, plus_button } from './businnes.module.css'

const businessunit = ({ businessunit, businessunits, supplychain }) => {

    const [chain, setChain] = useState(supplychain)
    useEffect(() => {
        setChain(supplychain)
    }, [supplychain])

    const printRef = useRef(null)
    const plainText = PlainText(chain.relation)


    const newRelation =
    {
        "from": {
            "name": "MADIC-S.A.C."
        },
        "to": {
            "name": "REPSOL-COMERCIAL-SAC"
        }
    }
    const allRelations = {
        "relation": [...chain.relation, newRelation]
    }

    const handleClick = async () => {
        await updateById("http://localhost:3001/supply-chain", chain.id, allRelations)
        const newgetChain = await getById("http://localhost:3001/supply-chain", chain.id)
        await setChain(newgetChain.data)
    }
    return (
        <>
            <DetailSideBar title="Business units" data={businessunits}></DetailSideBar>
            <div className={float_br} >
                <button onClick={e => { handleClick() }}>++++</button>
                <ReactToPrint
                    trigger={() => <button className={plus_button}><p> Export</p></button>}
                    content={() => printRef.current}
                />
            </div>
            <div className={float_tr} >
                <PlusButton text="New Relation" />
            </div>

            <Mermaid chart={
                `graph LR 
                    ${plainText}`
            } ref={printRef}
                className={` ${supply_chain}`}
            />
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
            businessunits: businessunits,
            businessunit: businessunit[0],
            supplychain: supplychain[0]
        }
    };
}


