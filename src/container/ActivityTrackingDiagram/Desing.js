import React, { useEffect, useState } from 'react';
import {
    input_container,
    right_side,
    characters_remaining,
    input,
    toggle_visibility_pass,
    visible,
    hidden,
} from '../../components/InputForm/inputForm.module.css'
import { form,form_padding,FormRow, inputs, inputs__time,footer } from './desing.module.css'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import post from '../../../utils/post';
import get from '../../../utils/getAll';
import Button from '../../components/Buton';
import CtaButton from '../../components/CtaButton';
import put from '../../../utils/put';
import swal from 'sweetalert';

const ActivityTrackingDesing = ({ processId }) => {

    const emptyValues = {
        nameActivity: '',
        responsible: '',
        time: '',
        activity: ''
    }

    const [inputFields, setInputFields] = useState([
        emptyValues
    ])
    const [id, setId] = useState(0)
    const [isEdit, setIsEdit] = useState(false)


    const getActivityTracking = async () => {
        const data = await get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/activity-tracking?processId=${processId}`)
        if (data[0] === undefined) {
            setInputFields([emptyValues])
        } else {
            setInputFields(data[0].data)
            setIsEdit(true)
            setId(data[0].id)
        }
    }

    useEffect(() => {
        getActivityTracking()
    }, [processId])


    /* form */

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const ActivityForProcess = {
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
        }
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

    /* D&D */
    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };


    return (
        <>
            <h1>Add new Activity</h1>
            <DragDropContext
                onDragEnd={(result) => {
                    const { source, destination } = result;
                    if (!destination) {
                        return;
                    }
                    if (
                        source.index === destination.index &&
                        source.droppableId === destination.droppableId
                    ) {
                        return;
                    }

                    setInputFields((prevInputFields) =>
                        reorder(prevInputFields, source.index, destination.index)
                    );
                }} >
                <form onSubmit={handleSubmit}
                    className={form}
                >
                    <Droppable droppableId="ActivityForm">
                        {(droppableProvided) => (
                            <ul
                                {...droppableProvided.droppableProps}
                                ref={droppableProvided.innerRef}
                                className={form_padding}
                            >
                                {inputFields &&
                                    inputFields.map((inputField, index) => (
                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                            {(draggableProvided) => (
                                                <li key={index}
                                                    {...draggableProvided.draggableProps}
                                                    ref={draggableProvided.innerRef}
                                                    {...draggableProvided.dragHandleProps}
                                                    className={FormRow}
                                                >
                                                    <input
                                                        type="text"
                                                        name="nameActivity"
                                                        value={inputField.nameActivity}
                                                        onChange={event => handleChangeInput(index, event)}
                                                        className={inputs}
                                                        placeholder="Name activity"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="responsible"
                                                        placeholder="Responsible"
                                                        list="responsible"
                                                        value={inputField.responsible}
                                                        onChange={event => handleChangeInput(index, event)}
                                                        className={inputs} />
                                                    <datalist id="responsible">
                                                        <option value="Gerente general" />
                                                        <option value="Jefe TI" />
                                                        <option value="Empresas Afiliadas" />
                                                        <option value="Cliente" />
                                                        <option value="Área de logística " />
                                                        <option value="Jefe de logística " />
                                                    </datalist>
                                                    <input
                                                        type="text"
                                                        name="time"
                                                        placeholder="Time"
                                                        value={inputField.time}
                                                        onChange={event => handleChangeInput(index, event)}
                                                        className={`${inputs} ${inputs__time}`} />
                                                    <select
                                                        name="activity"
                                                        value={inputField.activity}
                                                        onChange={event => handleChangeInput(index, event)}
                                                        className={inputs}>
                                                        <option value="_">Select an activity</option>
                                                        <option value="operation">operation</option>
                                                        <option value="transport">transport</option>
                                                        <option value="inspection">inspection</option>
                                                        <option value="delay">delay</option>
                                                        <option value="storage">storage</option>
                                                        <option value="combinedActivity">combinedActivity</option>
                                                    </select>

                                                    <Button onClick={handleAddFields} >Agregar</Button>
                                                    <Button onClick={() => handleLessFields(index)} >Quitar</Button>
                                                </li>
                                            )}

                                        </Draggable>
                                    ))}
                                {droppableProvided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                    <footer className={footer}>
                        <CtaButton  onClick={handleSubmit}>Send</CtaButton>
                        {/* <Button type="submit" onClick={handleSubmit}>Cancel</Button> */}
                    </footer>

                </form>
            </DragDropContext>

        </>
    );
}
export default ActivityTrackingDesing;