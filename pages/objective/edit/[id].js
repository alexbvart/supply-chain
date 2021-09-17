import Footer from "@components/Footer/Footer";
import { Input, Select, TextArea } from "@components/InputForm/Input";
import Form from "@components/RegisterForm/Form";
import { useRouter } from 'next/router'

import DetailSideBar from "src/container/DetailSideBar";
import putRequest from "module/put";

const indicatorEdit = ({ objectives,objective, process }) => {
    const router = useRouter()
    const onSubmit = async (data) => {
        const res = await putRequest({ "src": "objective", "pup": data , "id":indicator.id})
        if(res.status="200") router.push("/objective")
    }
    const processNames = process.map((p)=>p.name)

    return (
        <>
            <DetailSideBar title="Indicators" data={objectives}></DetailSideBar>

            <section >
            <Form onSubmit={onSubmit} title="Actualiza el objetivo"  defaultValues={objective}>
                <Select name="process" span="6"  options={processNames} span="6" />
                <Input name="name" span="6"  />
                <TextArea name="description" span="6" />
                <Footer />
            </Form>
            </section>
        </>
    );
}
export default indicatorEdit;

export async function getServerSideProps(context) {
    const { params } = context;

    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const objectives = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/objective`)
    .then(res => res.json())
    const objective = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/objective/?id=${params.id}`)
    .then(res => res.json())
    const process = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/process`)
    .then(res => res.json())

    return {
        props: {
            objectives: objectives,
            objective:objective[0],
            process: process,
        }
    };
}