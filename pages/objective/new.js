import React, { useState } from 'react';
import Form from '@components/RegisterForm/Form'
import { useForm } from "react-hook-form";
import { Input, Select, TextArea } from '@components/InputForm/Input';
import DetailSideBar from '../../src/container/DetailSideBar';
import Footer from '@components/Footer/Footer';
import post from '@services/post'


const newSupplier = ({ objectives,process }) => {

    const onSubmit = async (data,e) => {
        const res = await post({src:"objective","data":data})
        if(res.status="201") e.target.reset()
    }
    const processNames = process.map((p)=>p.name)

    return (
        <>
            <Form onSubmit={onSubmit} title="Registra objetivos">
                <Select name="process" span="6"  options={processNames} span="6" />
                <Input name="name" span="6"  />
                <TextArea name="description" span="6" />
                <Footer />
            </Form>
        </>
    );
}
export default newSupplier;

export async function getServerSideProps(context) {
    const { params } = context;

    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const objectives = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/objective`)
    .then(res => res.json())
    const process = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/process`)
    .then(res => res.json())

    return {
        props: {
            objectives: objectives,
            process: process,
        }
    };
}