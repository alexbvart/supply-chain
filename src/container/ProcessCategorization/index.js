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


const ProcessCatigorization = ({ processId,theType,status="610e55aee91a3d5a64e81049" }) => {

  const title={
    "610e55aee91a3d5a64e81056":"Process characterization",
    "610e55aee91a3d5a64e81057": "Process flow diagram",
}


  return (
    <div className={container}>
      <h2 className="subtitle_section">{`${title[theType]}`}</h2>
      <br></br>
      <UploadFile
        key={`CharacterizationCurrent${processId}Up`}
        processId={processId}
        types={theType}
        status={status}
      />
      <UploadedFilesLog
        key={`CharacterizationCurrent${processId}Log`}
        processId={processId}
        types={theType}
        status={status} />
    </div>
  )
}

export default ProcessCatigorization