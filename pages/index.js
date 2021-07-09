import EnterpriseInfo from '../src/container/EnterpriseInfo/EnterpriseInfo'
import InputForm from '../src/components/InputForm/InputForm'
import RegisterForm from '../src/components/RegisterForm/RegisterForm'

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
       <RegisterForm />
    </>
  )
}
