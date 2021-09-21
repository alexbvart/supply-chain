import Button from '@components/Buton';
import Table from '@components/Table';
import React, {useState} from 'react';
import Link from 'next/link'
import OptionCRUD from '@components/DropDown/optionsCRUD';


const process = ({processs, process}) => {
    const orderedRows = processs.map((i,index) => {
        const orderedRow = {
            "id" : <Link href={`/indicator/${i.id}`}><a>{index+1}</a></Link>,
            "name": i.name,
            "total" : i.total,
            "action": <OptionCRUD src="process" id={i.id} />
        }
        return orderedRow
    })
    const heading = ["# ", "Proceso", "Total ", "Acciones"]
    
    return ( 
        <>
            <div className="main main_container">
                <h1 className="subtitle_section">Procesos</h1>
                <br/>
                <Link href={`/process/new`}><a> <Button>Crear nuevo proceso</Button></a></Link>
                <br/>
                <br/>
                <Table
                    tableData={orderedRows}
                    headingColumns={heading}
                    title="MATRIZ PRIORIZADA DE PROCESOS"
                />
            </div>
        </>
    );
}
export default process;

export async function getServerSideProps(context) {
    const { params } = context;
    /* const { query } = params; */
    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const processs = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/process`)
    .then(res => res.json())
    const processOrder = processs.sort(function (a, b) {
        if (a.total > b.total) {
            return -1;
        }
        if (a.total < b.total) {
            return 1;
        }
        return 0;
    });
    return {
        props: {
            processs: processOrder,
            process: processs[0],
        }
    };



}