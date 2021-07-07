import EnterpriseInfo from '../src/container/EnterpriseInfo/EnterpriseInfo'
import InputForm from '../src/components/InputForm/InputForm'

import Head from 'next/head'
import DetailSideBar from '../src/container/DetailSideBar'
import styles from '../styles/Home.module.css'
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

  return (
    <>
      {/* <DetailSideBar title="Clientes" data={data}></DetailSideBar> */}
      <form action="aja.php" id="info_form">
        <InputForm 
          type={'text'}
          name={'name'} 
          placeholder={'Razón social'} 
          maxLength={80}
          pattern={'[a-z]'}
          title={'Debe contener solamente letras'}
        />
        <InputForm 
          type={'tel'}
          name={'phone'} 
          placeholder={'Teléfono'} 
          maxLength={10}
          pattern={'[0-9]'} 
          title={'Debe contener únicamente números del 0 al 9'}
        />
      </form>
    </>
  )
}
