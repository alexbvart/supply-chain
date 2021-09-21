
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link'
import Table from '@components/Table';
import Button from '@components/Buton';
import dateToSpanish from '@module/dateToSpanish';
import ChartBar from '@components/ChartRC/bar';
import { dashboard } from './styles.module.css'
const SpeedometerCs = dynamic(() => import('react-d3-speedometer'), { ssr: false });


const ControlPanel = ({ indicator, currentvalue,lastmonths }) => {
    const currentDate = dateToSpanish(new Date())
    const orderedRow = {
        "id": <Link href={`/indicator/${indicator.id}`}><a>{indicator.id}</a></Link>,
        "process": indicator.process,
        "name": indicator.name,
        "Formula": indicator.Formula,
        "Objetivo": indicator.Objetivo,
        "Frecuencia": indicator.Frecuencia,
        "Base": indicator.Base,
        "Meta": indicator.Meta,
        "Malo": <p className="malo-value"> {indicator.Malo}</p>,
        "Regular": <p className="regular-value">{indicator.Regular}</p>,
        "Bueno": <p className="bueno-value">{indicator.Bueno}</p>,
    }
    const heading = ["# ", "Procesos", "Indicador ", "Formula", "Objetivo ", "Frecuencia", "Base", "Meta ", "Malo", "Regular ", "Bueno"]

    return (
        <>
            <Table
                tableData={[orderedRow]}
                headingColumns={heading}
                title={`Tablero del indicador: ${indicator.name}`}
            />
            <br />
            <div className={dashboard}>
                <div>
                    <h1 className="subtitle_section">Valor para el {currentDate} </h1>
                    <br />
                    <br />
                    <br />
                    <SpeedometerCs
                        width={500}
                        needleHeightRatio={0.7}
                        value={`${currentvalue}0`}
                        customSegmentStops={[0, `${indicator.Malo}0`, `${indicator.Bueno}0`, 1000]}
                        segmentColors={['#FF471A', '#ECDB23', '#6AD72D']}
                        currentValueText={`Valor: ${currentvalue}%`}
                        customSegmentLabels={[
                            {
                                text: 'Malo',
                                position: 'OUTSIDE',
                                color: '#d8dee9',
                            },
                            {
                                text: 'Regular',
                                position: 'OUTSIDE',
                                color: '#d8dee9',
                            },
                            {
                                text: 'Bueno',
                                position: 'OUTSIDE',
                                color: '#d8dee9',
                            },
                        ]}
                        ringWidth={47}
                        needleTransitionDuration={3333}
                        needleTransition="easeElastic"
                        needleColor={'#a7ff83'}
                        textColor={'#d8dee9'}
                    /></div>
                <div>
                    <ChartBar labels={["Julio", "Agosto", "Septiembre"]} values={lastmonths} title="Valores en los últimos 3 meses" />
                </div>
            </div>
        </>
    );
}
export default ControlPanel;