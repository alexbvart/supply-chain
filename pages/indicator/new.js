import React, { useState } from 'react';
import Form from '@components/RegisterForm/Form'
import { useForm } from "react-hook-form";
import { Input, Select, TextArea } from '@components/InputForm/Input';
import DetailSideBar from '../../src/container/DetailSideBar';
import Footer from '@components/Footer/Footer';
import post from '@services/post'

const newIndicator  = ({ indicators, objectives, responsible,process }) => {

    const onSubmit = async (data,e) => {
        const res = await post({ src: "indicator", "data": data })
        if(res.status="200") e.target.reset()
    }
    const objectivesNames = objectives.map((p) => p.name)

    return (
        <>
            <DetailSideBar title="Indicators" data={indicators}></DetailSideBar>

            <Form onSubmit={onSubmit} title="Registra Indicadores">
                <Input name="name" label="Nombre del indicador" span="6" />
                <Select name="Objetivo" span="3" options={objectivesNames} />
                <Select name="Responsable" span="3" options={responsible} />
                <Select name="Frecuencia" span="3" options={["Diaria", "Semanal", "Mensual", "Trimestral", "Semestral", "Anual"]} />
                <Input name="Base"      span="1.5" type="number"  label="Línea base (%)" />
                <Input name="Meta"      span="1.5" type="number"  label="Meta (%)"  />
                <Input name="Malo"      span="1"   type="number"  label="Malo (%)" />
                <Input name="Regular"   span="1"   type="number"  label="Regular (%)" />
                <Input name="Bueno"     span="1"   type="number"  label="Bueno (%)" />
                <Input name="Formula"   span="3"    />
                <TextArea name="Iniciativas" span="6" />
                <Footer />
            </Form>
        </>
    );
}
export default newIndicator;

export async function getServerSideProps(context) {
    const { params } = context;

    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const objectives = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/objective`)
        .then(res => res.json())
    const process = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/process`)
        .then(res => res.json())
    const indicators = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/indicator`)
        .then(res => res.json())
    const responsible = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/responsible`)
        .then(res => res.json())

    return {
        props: {
            objectives: objectives,
            process: process,
            indicators: indicators,
            responsible: responsible,
        }
    };
}