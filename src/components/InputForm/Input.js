import React from "react";
import {
    input_container,
    right_side,
    characters_remaining,
    input,
    span_6,
    span_3,
    span_2,
    span_1_5,
    span_1,
    toggle_visibility_pass,
    visible,
    hidden,
} from './inputForm.module.css'

const spanGrid = {
    "6": span_6,
    "3": span_3,
    "2": span_2,
    "1.5": span_1_5,
    "1": span_1,
}

export function Input({ register, name, label = name, span = "3", placeholder = label, className = "", ...rest }) {
    return (
        <>
            <article className={`${input_container} ${spanGrid[span]} ${className}`}>
                <label>{label}</label>
                <input {...register(name)} {...rest} className={input} placeholder={placeholder} min="0"/>
            </article>
        </>
    );
}
export function TextArea({ register, name, label = name, span = "3", placeholder = label, className = "", ...rest }) {
    return (
        <>
            <article className={`${input_container} ${spanGrid[span]} ${className}`}>
                <label>{label}</label>
                <textarea rows="3" {...register(name)} {...rest} className={input} placeholder={placeholder} />
            </article>
        </>
    );
}

export function Select({ register, options, name, label = name, span = "3", placeholder = label, className = "", ...rest  }) {
    return (
        <article className={`${input_container} ${spanGrid[span]} ${className}`}>
            <label>{label}</label>
            <select {...register(name)} {...rest} className={input}>
                {options.map((value,index) => (
                    <option key={index? index: value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        </article>

    );
}
export function SelectKeyValue({ register, options, name, label = name, span = "3", placeholder = label, className = "", ...rest  }) {
    return (
        <article className={`${input_container} ${spanGrid[span]} ${className}`}>
            <label>{label}</label>
            <select {...register(name)} {...rest} className={input}>
                {options.map(({key,value},index) => (
                    <option key={index} value={key}>
                        {value}
                    </option>
                ))}
            </select>
        </article>

    );
}