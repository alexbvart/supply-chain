import Table from '@components/Table';
import Link from 'next/link'
import React, { useState } from 'react';
const Datafuente = ({ sourcedata, indicator }) => {
    const sourcedataFilter = sourcedata.filter( (d) => d.indicatorId==indicator.id)
    const orderedRows = sourcedataFilter.map((i, index) => {
        const orderedRow = {
            "id": index+1,
            "responsible": i.responsible,
            "supplier": i.supplier,
            "date": i.date,
            "status": i.status?"Fundado":"Infundado",
        }
        return orderedRow
    })
    /* console.log(sourcedata, indicator,orderedRows) */
    const heading = ["# ", "Responsable ", "Cliente", "Fecha ", "Estado"]


    return (
        <>

                <h1 className="subtitle_section">{indicator.process}</h1>
                <h2 className="subtitle_section">{indicator.name}</h2>
                <br />
                <br />
                <Table
                    tableData={orderedRows}
                    headingColumns={heading}
                    title="DATA FUENTE DEL INDICADOR"
                />

        </>
    );
}
export default Datafuente;