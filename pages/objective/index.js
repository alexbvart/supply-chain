import Button from '@components/Buton';
import Table from '@components/Table';
import React, {useState} from 'react';
import Link from 'next/link'
import OptionCRUD from '@components/DropDown/optionsCRUD';

const Objective = ({objectives}) => {

    const orderedRows = objectives.map((i) => {
        const orderedRow = {
            "id" : <Link href={`/objective/${i.id}`}><a>{i.id}</a></Link>,
            "process" : i.process,
            "name" : i.name,
            "description" : i.description,
            "action": <OptionCRUD src="objective" id={i.id} />
        }
        return orderedRow
    })
    const heading = ["# ", "Procesos", "Nombre ", "Descripción",  "Acciones"]
    
    return ( 
        <>
            <>
            <div className="main main_container">
                <h1 className="subtitle_section">Objetivos</h1>
                <br/>
                <Link href={`/objective/new`}><a> <Button>Crear nuevo objetivo</Button></a></Link>
                <br/>
                <br/>
                <Table
                    tableData={orderedRows}
                    headingColumns={heading}
                    title="MATRIZ DE INDICADORES DE PROCESOS"
                />
            </div>
        </>
        </>
    );
}
export default Objective;

export async function getServerSideProps(context) {
    const { params } = context;

    /* const { query } = params; */
    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const objectives = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/objective`)
    .then(res => res.json())

    return {
        props: {
            objectives: objectives,
        }
    };
}