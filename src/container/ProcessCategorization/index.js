import React from 'react'
import dynamic from 'next/dynamic'
import {
  wrapper,
  container
} from './styles.module.css'

const UploadFile = dynamic(
  () => import('../../components/UploadFile/index'),
  { ssr: false }
)
const UploadedFilesLog = dynamic(
  () => import('../../components/UploadedFilesLog/index'),
  { ssr: false }
)

const ProcessCatigorization = () => {
  return (
      <div className={container}>
        <h3 className="subtitle_section">Caracterización de procesos</h3> 
        <br></br>
        <UploadFile />
        <UploadedFilesLog />
      </div>
  )
}

export default ProcessCatigorization