import React, {useEffect, useRef, useState} from 'react';
import PlainText from '../../../Hooks/PlainText';
import ReactToPrint from 'react-to-print';
import Mermaid from '../Mermeid';
import processS from './process.module.css'
const ProcessMap = ({processmap}) => {

    console.log(processmap);
    const [process, setProcess] = useState(processmap)
    useEffect(() => {
        setProcess(processmap)
    }, [processmap])

    const strategicRef = useRef(null)
    const primaryRef = useRef(null)
    const supporttRef = useRef(null)

    const strategicPlainText= PlainText(process.strategic)
    const primaryPlainText  = PlainText(process.primary)
    const supportPlainText  = PlainText(process.support)
    const [stategicPT, setStategicPT] = useState(strategicPlainText)
    const [primaryPT, setPrimaryPT] = useState(primaryPlainText)
    const [supportPT, setsupportPT] = useState(supportPlainText)
    useEffect(() => {
        setStategicPT(PlainText(process.strategic))
        setPrimaryPT(PlainText(process.primary))
        setsupportPT(PlainText(process.support))
    }, [stategicPT,primaryPT,supportPT])


    return ( 
        <>
            <h1>Process map </h1>
            <ReactToPrint
                    trigger={() => <button ><p> Export</p></button>}
                    content={() => strategicRef.current}
                />
            <section className={processS.process}>

                <div className={processS.first_col}><h2>Requerimiento del Cliente</h2> </div>
                <div className={processS.process_item}>Procesos de gestion
                    <Mermaid 
                        chart={
                    `graph TB 
                        ${stategicPT}`
                    } ref={strategicRef}
                    className={processS.svg_auto}
                    />
                </div>
                <div className={processS.process_item}>Procesos productivos
                    <Mermaid 
                        chart={
                    `graph TB 
                        ${primaryPT}`
                    } ref={primaryRef}
                    className={processS.svg_auto}
                    />
                </div>
                <div className={processS.process_item}>¨Procesos de apoyo
                <Mermaid 
                        chart={
                    `graph TB 
                        ${supportPT}`
                    } ref={supporttRef}
                    className={processS.svg_auto}
                    /></div>
                <div className={processS.third_col}> <h2>Staisfaccion del Cliente</h2> </div>
            </section>
        </>
    );
}
export default ProcessMap;