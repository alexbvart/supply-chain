import React from 'react'
/* import dynamic from 'next/dynamic' */
import {
  wrapper,
  container
} from './styles.module.css'
import UploadFile from '../../components/UploadFile'
import UploadedFilesLog from '../../components/UploadedFilesLog'

/* const UploadFile = dynamic(
  () => import('../../components/UploadFile/index'),
  { ssr: false }
)
const UploadedFilesLog = dynamic(
  () => import('../../components/UploadedFilesLog/index'),
  { ssr: false }
)
 */
const ProcessCatigorization = ({ processId }) => {
  return (
    <div className={container}>
      <h3 className="subtitle_section">Caracterización de procesos</h3>
      <br></br>
      <UploadFile
        key={`CharacterizationCurrent${processId}Up`}
        processId={processId}
        types="610e55aee91a3d5a64e81056"
        status="610e55aee91a3d5a64e81049"
      />
      <UploadedFilesLog
        key={`CharacterizationCurrent${processId}Log`}
        processId={processId}
        types="610e55aee91a3d5a64e81056"
        status="610e55aee91a3d5a64e81049" />
    </div>
  )
}

export default ProcessCatigorization