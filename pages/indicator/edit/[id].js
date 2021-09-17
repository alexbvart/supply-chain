import Footer from "@components/Footer/Footer";
import { Input, Select, TextArea } from "@components/InputForm/Input";
import Form from "@components/RegisterForm/Form";
import { useRouter } from 'next/router'

import DetailSideBar from "src/container/DetailSideBar";
import putRequest from "module/put";

const indicatorEdit = ({ indicators,indicator, objectives, responsible }) => {
    const router = useRouter()
    const onSubmit = async (data) => {
        const res = await putRequest({ "src": "indicators", "pup": data , "id":indicator.id})
        if(res.status="200") router.push("/indicator")
    }
    const objectivesNames = objectives.map((p) => p.name)

    return (
        <>
            <DetailSideBar title="Indicators" data={indicators} defaultValues={indicator}></DetailSideBar>

            <section >
                <Form onSubmit={onSubmit} title="Edita este indicador" defaultValues={indicator}>
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
            </section>
        </>
    );
}
export default indicatorEdit;

export async function getServerSideProps(context) {
    const { params } = context;

    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const objectives = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/objectives`)
        .then(res => res.json())
    const indicators = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/indicators`)
        .then(res => res.json())
    const indicator = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/indicators/?id=${params.id}`)
        .then(res => res.json())
    const responsible = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/responsible`)
        .then(res => res.json())

    return {
        props: {
            objectives: objectives,
            indicator: indicator[0],
            indicators: indicators,
            responsible: responsible,
        }
    };
}