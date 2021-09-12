import Table from '@components/Table';
import React, { useState } from 'react';
import Link from 'next/link'
import DetailSideBar from '../../src/container/DetailSideBar';
import EnterpriseInfo from '../../src/container/EnterpriseInfo/EnterpriseInfo';
import Button from '@components/Buton';

const supplier = ({ indicators }) => {
/*     const orderedRows = indicators.map((i) => {
        const orderedRow = {
            "id" : i.id,
            "process": i.process,
            "name": i.name,
            "Formula" : i.Formula,
            "Objetivo" : i.Objetivo,
            "Frecuencia" : i.Frecuencia,
            "Responsable" : i.Responsable,
            "Base" : i.Base,
            "Meta" : i.Meta,
            "Malo" : i.Malo,
            "Regular" : i.Regular,
            "Bueno" : i.Bueno,
            "Iniciativas" : i.Iniciativas,
        }
        return orderedRow
    }) 
    const heading = ["# ", "Procesos", "Indicador ", "Formula", "Objetivo ", "Frecuencia", "Responsable", "Base", "Meta ", "Malo", "Regular ", "Bueno","Iniciativas", "Acciones"]
    */
   
    const orderedRows = indicators.map((i) => {
        const orderedRow = {
            "id" : <Link href={`/indicator/${i.id}`}><a>{i.id}</a></Link>,
            "process": i.process,
            "name": i.name,
            "Formula" : i.Formula,
            "Objetivo" : i.Objetivo,
            "Frecuencia" : i.Frecuencia,
            "Base" : i.Base,
            "Meta" : i.Meta,
            "Malo" : i.Malo,
            "Regular" : i.Regular,
            "Bueno" : i.Bueno,
            "action": <Link href={`/indicator/${i.id}`}><a> <Button>Visitar</Button></a></Link>
        }
        return orderedRow
    })
    const heading = ["# ", "Procesos", "Indicador ", "Formula", "Objetivo ", "Frecuencia", "Base", "Meta ", "Malo", "Regular ", "Bueno", "Acciones"]
    
    return (
        <>
            <div className="main main_container">
                <h1 className="subtitle_section">Indicadores</h1>
                <br/>
                <Link href={`/indicator/new`}><a> <Button>Crear nuevo indicador</Button></a></Link>
                <br/>
                <br/>
                <Table
                    tableData={orderedRows}
                    headingColumns={heading}
                    title="MATRIZ DE INDICADORES DE PROCESOS"
                />
            </div>
        </>
    );
}
export default supplier;

export async function getServerSideProps(context) {
    const { params } = context;

    /* const { query } = params; */
    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const indicators = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/indicators`)
        .then(res => res.json())

    return {
        props: {
            indicators: indicators,
        }
    };
}