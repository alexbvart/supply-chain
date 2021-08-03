import React from 'react'
import { row,
  file_column,
  file_icon,
  actions_column,
  view_button,
  print_button,
  delete_button } from './styles.module.css'

const FilesLogTableRow = ({ fileName, fileId }) => {
  console.log(`name: ${fileName}, fileId: ${fileId}`);
  return (
    <article className={row}>
      <div className={file_column}>
        <picture className={file_icon}>
          <img src="../assets/icons/pdf_icon.png" alt="file icon" />
        </picture>
        <p id="rowFileName">{ fileName }</p>
      </div>
      <div className={actions_column}>
        <button className={view_button} >View</button>
        <button className={print_button}>Print</button>
        <button className={delete_button} onClick={() => window.localStorage.removeItem(fileId)}>Delete</button>
        {/* <button className={delete_button} onClick={() => console.log('si')}>Delete</button> */}
      </div>
    </article>
  )
}

export default FilesLogTableRow