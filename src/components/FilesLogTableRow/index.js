import React from 'react'
import deleteById from '../../../module/deleteById'
import swal from 'sweetalert';
import {
  row,
  file_column,
  file_icon,
  actions_column,
  view_button,
  print_button,
  delete_button
} from './styles.module.css'
/* import pdf_img from '../../../public/assets/icons/pdf_icon.png ' */

const FilesLogTableRow = ({ fileName, fileId, pathDocument }) => {

  const url = process.env.NEXT_PUBLIC_SERVER_HOST_
  const regex = /\\/
  const path = pathDocument.replace(regex, "/")

  const deleteDocument = async () =>{
    const res = await deleteById(`${url}/uploads`,fileId)
    console.log(res);
  }
  const triggerAlert = () => {
    swal({
      title:`Delete document this document `,
      text:`Are you sure you want to delete ${fileName}?`,
      icon:"error",
      buttons: ["No","Yes"],
    }).then(res=>{
      if(res){
        swal({
          title:`this document was deleted`,
          icon:"success"
        })
        deleteDocument()
      }
    })
  }
    /* console.log(`name: ${fileName}, fileId: ${fileId}`); */
  return (
    <article className={row}>
      <div className={file_column}>
        {/* <picture className={file_icon}>
          <img src="../../../public/assets/icons/pdf_icon.png" alt="file icon" />
        </picture> */}
        <p id="rowFileName">{fileName}</p>
      </div>
      <div className={actions_column}>
        <button className={view_button} >
          <a href={`${url}/${path}`} target="_blank" >View</a>
        </button>
        <button className={print_button}>
          <a href={`${url}/${path}`} download="filename">Download File</a>
        </button>
        <button
          className={delete_button}
          onClick={() => triggerAlert()}>
          Delete
        </button>
      </div>

      {/* <div className="">
        <embed src={`${url}/${path}`} type="application/pdf" width="100%" height="600px" />
      </div> */}
    </article>
  )
}

export default FilesLogTableRow