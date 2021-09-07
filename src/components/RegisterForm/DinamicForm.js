import React, { useEffect, useState } from 'react';

import { form, form_padding, FormRow, inputs, inputs__time, footer } from '../../container/ActivityTrackingDiagram/desing.module.css'
import Button from '../../components/Buton';
import CtaButton from '@components/CtaButton';



const emptyValues = {
    nameActivity: '',
    responsible: '',
    time: '',
    activity: ''
}
const DinamicForm = ({ emptyValues, data, onSubmit }) => {


    const [isEdit, setIsEdit] = useState(false)
    const [inputFields, setInputFields] = useState([
        emptyValues
    ])
    /*     const [id, setId] = useState(0)
        const [isEdit, setIsEdit] = useState(false) */


    /*     const getActivityTracking = async () => {
            const data = await get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/activity-tracking?processId=${processId}`)
            if (data[0] === undefined) {
                setInputFields([emptyValues])
            } else {
                setInputFields(data[0].data)
                setIsEdit(true)
                setId(data[0].id)
            }
        }
    */
    const getActivityTracking = async (data) => {
        if (data) console.log(data)

        if (data === undefined) {
            setInputFields([emptyValues])
        } else {
            setInputFields(data)
            setIsEdit(true)
        }
    }
    useEffect(() => {
        getActivityTracking(data)
    }, [data])

    console.log(data, "aaa", inputFields)
    /* form */

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        console.log(event.target.value);
        console.log(index);
        setInputFields(values)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Funciono");
        /* const ActivityForProcess = {
            "processId": processId,
            "status": "current",
            "data": inputFields
        }
        if (isEdit) {
            put(`${process.env.NEXT_PUBLIC_SERVER_HOST}/activity-tracking`,id,ActivityForProcess)
            swal("Updated data", `Activity tracking was updated`, "success")
        }else{
            post(`${process.env.NEXT_PUBLIC_SERVER_HOST}/activity-tracking`,ActivityForProcess)
            swal("Data recorded", `Activity tracking was recorded`, "success")
        } */
    }
    const handleAddFields = () => {
        setInputFields([...inputFields, emptyValues])
    }
    const handleLessFields = (index) => {

        const values = [...inputFields];
        /* const valuesFilter = values.filter((v) => v.index = index) */
        values.splice(index, 1);
        setInputFields(values)
    }
    return (
        <>
            <form className={form} onSubmit={handleSubmit}>
                <ul className={form_padding}>
                    {inputFields &&
                        inputFields.map((inputField, index) => (
                            <li key={index} className={FormRow} >
                                {
                                    Object.entries(inputField).map((inputF, index) => (
                                        (index == 0 | index == 1) ?
                                            <input
                                                type="text"
                                                name={inputF[0]}
                                                value={inputF[1]}
                                                onChange={event => handleChangeInput(index, event)}
                                                className={inputs}
                                                placeholder={inputF[1]}
                                                disabled
                                            />
                                            :
                                            <input
                                                type="text"
                                                name={inputF[0]}
                                                value={inputF[1]}
                                                onChange={event => handleChangeInput(index, event)}
                                                className={inputs}
                                                placeholder={inputF[1]}
                                            />
                                    ))
                                }
                                {/*                                 <Button onClick={() => handleAddFields()} >Agregar</Button>
                                <Button onClick={() => handleLessFields(index)} >Quitar</Button> */}
                            </li>
                        ))}
                </ul>
                <footer className={footer}>
                    {/* <input type="submit" value="enviar"/> */}
                    <CtaButton onClick={handleSubmit}>Send</CtaButton>
                    {/* <Button type="submit" onClick={handleSubmit}>Cancel</Button> */}
                </footer>
            </form>
        </>
    );
}
export default DinamicForm;