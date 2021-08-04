import React from 'react'
import { row,
  file_column,
  file_icon,
  actions_column,
  view_button,
  print_button,
  delete_button } from './styles.module.css'

const FilesLogTableRow = ({ fileName, fileId, pathDocument }) => {

  const url= process.env.NEXT_PUBLIC_SERVER_HOST_
  const regex = /\\/
  const path = pathDocument.replace(regex,"/")



/*   console.log(`name: ${fileName}, fileId: ${fileId}`); */
  return (
    <article className={row}>
      <div className={file_column}>
        <picture className={file_icon}>
          <img src="../assets/icons/pdf_icon.png" alt="file icon" />
        </picture>
        <p id="rowFileName">{ fileName }</p>
      </div>
      <div className={actions_column}>
        <button className={view_button} >
          <a href={`${url}/${path}`} target="_blank" >View</a>       
        </button>
        <button className={print_button}>
          <a href={`${url}/${path}`}  download="filename">Download File</a>  
        </button>
        <button className={delete_button} onClick={() => window.localStorage.removeItem(fileId)}>Delete</button>
        {/* <button className={delete_button} onClick={() => console.log('si')}>Delete</button> */}
      </div>

      {/* <div className="">
        <embed src={`${url}/${path}`} type="application/pdf" width="100%" height="600px" />
      </div> */}
    </article>
  )
}

export default FilesLogTableRow