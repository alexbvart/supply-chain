import React, { useState } from 'react';
import {
    input_container,
    right_side, 
    characters_remaining, 
    input,
    toggle_visibility_pass,
    visible,
    hidden,
} from '../InputForm/inputForm.module.css'


const ActivityTrackingDesing = () => {

    const emptyValues = {
        nameActivity: '',
        responsible: '',
        time: '',
        activity: ''
    }

    const [inputFields, setInputFields] = useState([
        emptyValues
    ])

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputFields);
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
            <h1>Add new Activity</h1>
            <form onSubmit={handleSubmit}>
                {inputFields.map((inputField, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="nameActivity"
                            value={inputField.nameActivity}
                            onChange={event => handleChangeInput(index, event)} />

                        <input
                            type="text"
                            name="responsible"
                            list="responsible"
                            value={inputField.responsible}
                            onChange={event => handleChangeInput(index, event)} />
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
                            value={inputField.time}
                            onChange={event => handleChangeInput(index, event)} />

                        <select
                            name="activity"
                            value={inputField.activity}
                            onChange={event => handleChangeInput(index, event)}
                        >
                            <option value="operation">Activity</option>
                            <option value="operation">operation</option>
                            <option value="transport">transport</option>
                            <option value="inspection">inspection</option>
                            <option value="delay">delay</option>
                            <option value="storage">storage</option>
                            <option value="combinedActivity">combinedActivity</option>
                        </select>

                        <button onClick={handleAddFields} >Agregar_</button>
                        <button onClick={() => handleLessFields(index)} >Quitar</button>
                    </div>
                ))}
                <buton type="submit" onClick={handleSubmit} >Enviar</buton>
            </form>
        </>
    );
}
export default ActivityTrackingDesing;