import Head from 'next/head'
import DetailSideBar from '../src/container/DetailSideBar'
import styles from '../styles/Home.module.css'
import Form from '@components/RegisterForm/Form'
import { useForm } from "react-hook-form";
import { Input, Select, TextArea } from '@components/InputForm/Input';
import Footer from '@components/Footer/Footer';
import Table from '@components/Table';
import DinamicForm from '@components/RegisterForm/DinamicForm';
import useUser from 'Hooks/useUser';


export default function Home({process}) {

  
  const ratings = [
    {
      "rating": "Muy alto",
      "points": "5"
    },
    {
      "rating": "Alto",
      "points": "4"
    },
    {
      "rating": "Medio",
      "points": "3"
    },
    {
      "rating": "Bajo",
      "points": "2"
    },
    {
      "rating": "Muy bajo",
      "points": "1"
    },
  ]

  const prior = [
    {"name": 'ID',
    "contest": '4',
    "impacton": '4',
    "impactocali": '5',
    "impactoccrecli": '5',
    "total": '82',
  },
    {"name": 'AE',
    "contest": '4',
    "impacton": '3',
    "impactocali": '5',
    "impactoccrecli": '78',
    "total": '',
  }
  ]
  const onSubmit = (data) => {
    /* e.preventDefault() */
    console.log("padre",data);
  }

  const { user, loading, loggedIn } = useUser();
  const DisplayInfo = () => {
    if (loading) return <div className="container"> Loading... </div>;
    if (loggedIn && user._id)
      return (
        <div className="container">
          {" "}
          Id: {user._id} <br />
          Email: {user.email} <br />
        </div>
      );

    return <div className="container"> Login to get info </div>;
  };
  return (
    <>
    <DisplayInfo />
{/*       <Form onSubmit={onSubmit} title="Registra Indicadores">
        <Select name="Proceso" span="3" options={["Diaria","Semanal","Mensual","Trimestral","Semestral","Anual"]}  span="6"/>
        <Input name="Indicador" label="Nombre del indicador" span="6" />
        <Input name="Objetivo" type="number" span="3" />
        <Input name="Responsable" placeholder="Responsable" span="3" />
        <Select name="Frecuencia" span="3" options={["Diaria","Semanal","Mensual","Trimestral","Semestral","Anual"]} />
        <Input name="UnidaddeMedida" label="Unidad de Medida" span="1.5" />
        <Input name="Meta" type="number" span="1.5" />
        <Input name="Malo" span="1" />
        <Input name="Regular" span="1" />
        <Input name="Bueno" span="1" />
        <Input name="Formula" span="3" />
        <TextArea name="Iniciativas" span="6" />
        <Footer />
      </Form>

      <Table
        tableData={ratings}
        headingColumns={["Calificación ", "Puntos"]}
        title="Valores de la calificación"
      /> */}

{/*       <DinamicForm emptyValues={emptyValues} data={process}>

      </DinamicForm> */}
    </>

  )
}
export async function getServerSideProps(context) {

  const SERVER_HOST = "http://localhost:3001";

  const process = await fetch(`${SERVER_HOST}/process`)
  .then(res => res.json())

  return {
      props: {
          process: process,
      }
  };



}