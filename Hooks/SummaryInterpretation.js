import { useState } from "react"

const SummaryInterpretation = (datareq) => {
const ROL_FLOW = {
    'Gerente general': 0,
    'Empresas Afiliadas': 0,
    'Jefe TI': 0,
    'Cliente': 0,
    'Área de logística': 0,
    'Jefe de logística': 0,
}
const ACTIVITYS_FLOW = {
    'operation': 0,
    'transport': 0,
    'inspection': 0,
    'delay': 0,
    'storage': 0,
    'combinedActivity': 0,
}
let TIME_TOTAL = 0
const forRoleRes = []
const forActivityRes = []


const calculatePercentage =  (time) => {
    return ((time / TIME_TOTAL) * 100).toFixed(2)
}



    console.log('aaaaaaaaaaaaaaaaaaaaa',{datareq});
    datareq.forEach(d => {
        if (!Number.isNaN(parseInt(Object.values(d)[2], 10))) {
            ROL_FLOW[Object.values(d)[1]] += parseInt(Object.values(d)[2], 10);
            ACTIVITYS_FLOW[Object.values(d)[3]] += parseInt(Object.values(d)[2], 10);
            TIME_TOTAL += parseInt(Object.values(d)[2], 10)
        }
    })
    
    Object.entries(ROL_FLOW).forEach(r => {
        if (!Number.isNaN(parseInt(calculatePercentage(r[1]),10))) {
            let oner = {
                rol: r[0],
                time: r[1],
                percentage: `${calculatePercentage(r[1])}%`
            }
            forRoleRes.push(oner)
        }
    });
    
    Object.entries(ACTIVITYS_FLOW).forEach(r => {
        if (!Number.isNaN(parseInt(calculatePercentage(r[1]),10))) {
            let onea = {
                activityName: r[0],
                time: r[1],
                percentage: `${calculatePercentage(r[1])}%`
            }
            forActivityRes.push(onea)
        }
    });

    console.log({ ROL_FLOW }, { ACTIVITYS_FLOW }, { TIME_TOTAL }, { forRoleRes},{forActivityRes});
    return [forActivityRes,forRoleRes]

}
export default SummaryInterpretation;