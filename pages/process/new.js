import React, {useState} from 'react';
import { Input } from '@components/InputForm/Input';
import DetailSideBar from '../../src/container/DetailSideBar';
import Form from '@components/RegisterForm/Form';
import Footer from '@components/Footer/Footer';
import post from '@services/post'

const process = ({processs}) => {

    const onSubmit = async (data) => {
        const res = await post({"src":"process","data":data})
        console.log(res)
    }

    return ( 
        <>
            <DetailSideBar title="processs" data={processs}></DetailSideBar>
            <Form onSubmit={onSubmit} title="Registra un nuevo proceso">
                <Input name="name" label="Nombre del proceso" placeholder="Nombre" span="6" />
                <Footer />
            </Form>
        </>
    );
}
export default process;

export async function getServerSideProps(context) {
    const { params } = context;
    /* const { query } = params; */
    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const processs = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/process`)
    .then(res => res.json())

    return {
        props: {
            processs: processs,
        }
    };



}