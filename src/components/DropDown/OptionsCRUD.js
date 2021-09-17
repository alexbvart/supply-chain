import Button from '@components/Buton';
import Link from 'next/link'
import { toogle_section, toogle_list } from './styles.module.css'
import React, { useState } from 'react';
import swal from 'sweetalert';
import deleteById from '@module/deleteById';
const OptionCRUD = ({ src, id }) => {
    const [viewList, setViewList] = useState(false)
    const deleteItem = async () => {
        console.log(src, id)
        swal({
            title: "¿Está seguro?",
            text: "Una vez borrado, no podrá recuperar esta información.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const res = deleteById({ src, id }).then(res=>res)
                    if (res.status="200") {
                        swal("Registro eliminado", {
                            icon: "success",
                        });
                    }
                } else {
                    swal("¡Tu unformacion esta a salvo!");
                }
            });
    }
    const toogleList = () => {
        setViewList(!viewList)
        console.log("toogle list", viewList)
    }
    return (
        <>
            <div className={toogle_section}>
                <Button onClick={() => toogleList()} >Opciones</Button>
                {viewList &&
                    <ul className={toogle_list}>
                        <li><Link href={`/${src}/${id}`}><a> <span> Visitar </span></a></Link></li>
                        <li><Link href={`/${src}/edit/${id}`}><a> <span> Editar </span></a></Link></li>
                        <li><span onClick={() => deleteItem()}>Eliminar</span></li>
                    </ul>
                }
            </div>
        </>
    );
}
export default OptionCRUD;