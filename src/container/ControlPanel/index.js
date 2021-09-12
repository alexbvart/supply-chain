
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link'
import Table from '@components/Table';

const SpeedometerCs = dynamic(() => import('react-d3-speedometer'), { ssr: false });


const ControlPanel = ({ indicator }) => {

    console.log(indicator)
    const orderedRow = {
        "id": <Link href={`/indicator/${indicator.id}`}><a>{indicator.id}</a></Link>,
        "process": indicator.process,
        "name": indicator.name,
        "Formula": indicator.Formula,
        "Objetivo": indicator.Objetivo,
        "Frecuencia": indicator.Frecuencia,
        "Base": indicator.Base,
        "Meta": indicator.Meta,
        "Malo": indicator.Malo,
        "Regular": indicator.Regular,
        "Bueno": indicator.Bueno,
    }
    const heading = ["# ", "Procesos", "Indicador ", "Formula", "Objetivo ", "Frecuencia", "Base", "Meta ", "Malo", "Regular ", "Bueno"]

    return (
        <>
            <Table
                tableData={[orderedRow]}
                headingColumns={heading}
                title="MATRIZ DE INDICADORES DE PROCESOS"
            />
            <br />
            <SpeedometerCs
                width={500}
                needleHeightRatio={0.7}
                value={`${indicator.Base}0`}
                customSegmentStops={[0,`${indicator.Malo}0`, `${indicator.Bueno}0`, 1000]}
                segmentColors={['#FF471A', '#ECDB23', '#6AD72D']}
                currentValueText={`${indicator.Base}`}
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
            />
        </>
    );
}
export default ControlPanel;