import Button from '@components/Buton';
import Link from 'next/link'
import { toogle_section, toogle_list } from './styles.module.css'
import React, { useState } from 'react';
const OptionCRUD = ({ src, id }) => {
    const [viewList, setViewList] = useState(false)
    const deleteItem = ({ src, id }) => {
        console.log(src, id)
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
                        <li><span onClick={() => deleteItem({ src: "indicator", id: id })}>Eliminar</span></li>
                    </ul>
                }
            </div>
        </>
    );
}
export default OptionCRUD;