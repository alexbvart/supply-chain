import React, {useEffect, useState} from 'react';
import Table from '../../components/Table';
import get from '../../../utils/getAll';
import Summary from '../../components/Summary';

const Static = ({processId}) => {   
    
    const emptyValues = {
        nameActivity: '',
        responsible: '',
        time: '',
        activity: ''
    }
    const [dataTableS, setDataTableS] = useState([emptyValues])

    const getActivityTracking = async () => {
        const data = await get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/activity-tracking?processId=${processId}`)
        if (data[0] === undefined) {
            setDataTableS([emptyValues])
        } else {
            setDataTableS(data[0].data)
        }

    }

    useEffect(() => {
        getActivityTracking()
    }, [processId])


    const forActivity =  [
        {
            activityName:"operation",
            time:"8",
            percentage:"40.0%"
        },
        {
            activityName:"transport",
            time:"0",
            percentage:"0%"
        },
        {
            activityName:"inspection",
            time:"5",
            percentage:"25.0%"
        },
        {
            activityName:"delay",
            time:"7",
            percentage:"35.0%"
        },
        {
            activityName:"storage",
            time:"0",
            percentage:"0%"
        },
        {
            activityName:"Combined activity",
            time:"0",
            percentage:"0%"
        },
        {
            activityName:"Total",
            time:"20",
            percentage:"100%"
        }
    ]
    const forRol =  [
        {
            rol:"cliente",
            time:"2",
            percentage:"10.0%"
        },
        {
            rol:"Encargado de recepción",
            time:"13",
            percentage:"65.0%"
        },
        {
            rol:"Personal de piso",
            time:"5",
            percentage:"25.0%"
        },
        {
            rol:"Total",
            time:"20",
            percentage:"100%"
        }
    ]

    return ( 
        <>
            <Table 
                tableData={dataTableS}
                headingColumns={["Actividad","Rol","Tiempo","Flujo"]}
                title="Seguimiento a las Actividades"
            /> 
            <br />
            <Table 
                tableData={forActivity}
                headingColumns={["Actividad","Tiempo","%"]}
                title="Cuadro por actividades"
            /> 
            <br />
            <Summary 
                data={forActivity}
                title="Interpretation"
                type="activity"
            /> 
            <br />
            <br />
            <Table 
                tableData={forRol}
                headingColumns={["Rol","Tiempo","%"]}
                title="Cuadro por roles"
            /> 
            <br />
            <Summary 
                data={forRol}
                title="Interpretation"
                type="rol"
            /> 
        </>
    );
}
export default Static;