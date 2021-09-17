import Button from '@components/Buton';
import Link from 'next/link'

import React, { useState } from 'react';
const OptionCRUD = ({src,id}) => {
        const deleteItem = ({src,id})=>{
        console.log(src,id)
    }
    return (
        <>
            <Link href={`/${src}/${id}`}><a> <Button>Visitar</Button></a></Link> {" "}
            <Link href={`/${src}/edit/${id}`}><a> <Button>Editar</Button></a></Link>
            <Button onClick={()=> deleteItem({src:"indicator",id:id})}>Eliminar</Button>
        </>
    );
}
export default OptionCRUD;