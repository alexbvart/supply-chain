import React, { useState } from 'react';
import {table} from './style.module.css'

const Table = ({ tableData, headingColumns, title }) => {

    const data = tableData.map((row, index) => {
        let rowData = []
        let i = 0;
        for(const key in row) {
            rowData.push({
                key: headingColumns[i],
                val: row[key]
            });
            i++;
        }
        return <tr key={index}>
            {rowData.map((data, index) => (
                <td key={index} data-heading={data.key}>{data.val}</td>
            ))}
        </tr>
    })

    return (
        <>
            <h2 cllasName="subtitle_section">{title}</h2>
            <table className={table }>
                <thead>
                    <tr>
                        {
                            headingColumns.map((col, index) => (
                                <th key={index} >
                                    {col}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </table>

        </>
    );
}
export default Table;