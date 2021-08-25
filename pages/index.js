import Head from 'next/head'
import DetailSideBar from '../src/container/DetailSideBar'
import styles from '../styles/Home.module.css'
import Form from '@components/RegisterForm/Form'
import { useForm } from "react-hook-form";
import { Input } from '@components/InputForm/Input';
import Footer from '@components/Footer/Footer';


export default function Home() {

  const data = [
    {name: "Juam",
    contact:"342423"},
    {name: "Juam",
    contact:"342423"},
    {name: "Juam",
    contact:"342423"},
    {name: "Juam",
    contact:"342423"},
    {name: "Juam",
    contact:"342423"},
    {name: "Juam",
    contact:"342423"},
    {name: "jorge",
    contact:"342423"},
    {name: "jorge",
    contact:"342423"},
    {name: "jorge",
    contact:"342423"},
  ]

  const onSubmit = data => console.log(data);

  return (
    <>
      <DetailSideBar title="Clientes" data={data}></DetailSideBar>

      <Form onSubmit={onSubmit} title="Registra Indicadores">
        <Input  name="Indicador" label="Nombre del indicador" span="6"/>
        <Input  name="Objetivo" type="number" span="3"/>
        <Input  name="Responsable" placeholder="Responsable" span="3"/>
        <Input  name="Frecuencia" span="3"/>
        <Input  name="UnidaddeMedida" label="Unidad de Medida" span="1.5"/>
        <Input  name="Meta" type="number" span="1.5"/>
        <Input  name="Malo" span="1"/>
        <Input  name="Regular" span="1"/>
        <Input  name="Bueno" span="1"/>
        <Input  name="Formula" span="3"/>
        <Input  name="Iniciativas" span="6"/>
        <Footer />
      </Form>


    </>

  )
}
