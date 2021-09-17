
import ReactToPrint from 'react-to-print';
import PlainText from '../../../Hooks/PlainText'

import Mermaid from '../../components/Mermeid';
import PlusButton from '../../components/PlusButton/PlusButton';


import updateById from '../../../module/updateById';
import getById from '../../../module/getById';
import { supply_chain, float_tr, float_br, plus_button } from './businnes.module.css'
import { useRef, useEffect,useState } from 'react';



const SupplyChain = ({supplychain}) => {

    const [chain, setChain] = useState(supplychain)
    useEffect(() => {
        setChain(supplychain)
    }, [supplychain])

    const printRef = useRef(null)
    const chainPlainText = PlainText(chain)


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
                        ${chainPlainText}`
                } 
                ref={printRef}
                className={` ${supply_chain}`}
            />
        </>
    );
}
export default SupplyChain;