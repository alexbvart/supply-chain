import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import get from '../../../module/getAll';
import Summary from '../../components/Summary';
import { grid_container, summary_grid } from './static.module.css'

import ChartRC from '../../components/ChartRC';
import SummaryInterpretation from '../../../Hooks/SummaryInterpretation';

const Static = ({ processId }) => {

    const emptyValues = {
        nameActivity: '',
        responsible: '',
        time: '',
        activity: ''
    }
    const [dataTableS, setDataTableS] = useState([emptyValues])
    const [forRole, setForRole] = useState([])
    const [forActivity, setForActivity] = useState([])

    const getActivityTracking = async () => {
        const data = await get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/activity-tracking?processId=${processId}`)
        if (data[0] !== undefined) {
            setDataTableS(data[0].data)
            
        }else{
            setDataTableS([emptyValues])
        }
    }

    useEffect(() => {
        getActivityTracking()
        return () => { }
    }, [processId])

    useEffect(() => {
        if (dataTableS.length > 1) {
            const [forActivityRes, forRoleRes] =  SummaryInterpretation(dataTableS)
            setForRole(forRoleRes)
            setForActivity(forActivityRes)
            /* console.log("entra datos desde la api", { dataTableS },{forRoleRes},{forActivity});
            console.log("tu grafico ya no esta vacio") */
        }else
        {
            setForRole([])
            setForActivity([])
            /* console.log("tu grafico esta vacio") */
        }
        return () => { }
    }, [dataTableS])

    return (
        <>

            {/* table Node */}
            <Table
                tableData={dataTableS}
                headingColumns={["Activity ", "Role", "Time (minutes)", "Flow"]}
                title="Seguimiento a las Actividades"
            />

            <div className={grid_container}>
                <Table
                    tableData={forActivity}
                    headingColumns={["Activity", "Time (minutes)", "Percentage (%)"]}
                    title="Table by activity"
                />
                <ChartRC title="Donut chart by actrivities" data={forActivity} />
                <Summary
                    className={summary_grid}
                    data={forActivity}
                    title="Interpretation"
                    type="activity"
                />
            </div>

            <div className={grid_container}>

                <Table
                    tableData={forRole}
                    headingColumns={["Role", "Time (minutes)", "Percentage (%)"]}
                    title="Table by roles"
                />
                <ChartRC title="Donut chart by roles" data={forRole} />
                <Summary
                    className={summary_grid}
                    data={forRole}
                    title="Interpretation"
                    type="rol"
                />
            </div>

        </>
    );
}
export default Static;