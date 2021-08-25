import React, { useState, useEffect } from 'react';
// import FilesLogTableRow from '../FilesLogTableRow/index'
import dynamic from 'next/dynamic';
import { log, log_table, top_row } from './styles.module.css';
import getAll from '../../../utils/getAll';
import FilesLogTableRow from '../FilesLogTableRow';

const storage = typeof window !== 'undefined' ? localStorage : null;

/* const FilesLogTableRow = dynamic(() => import('../FilesLogTableRow/index'), {
	ssr: false,
}); */

const UploadedFilesLogComponent = ({ processId, types, status }) => {

	const [filesLogList, setFilesLogList] = useState([])
	console.log("quien llega",{types})
	const getFiles = async () => {
		const res = await getAll(`${process.env.NEXT_PUBLIC_SERVER_HOST_}/uploads`)
		if (res!==undefined) {
			/* setFilesLogList(res) */
			if(processId){
				let filteredFiles =await res.filter((r)=>r.type==types && r.process==processId)
				setFilesLogList(filteredFiles)
				console.log("f", {filesLogList},{processId}, {types}, {status})
			}
		}



		/* await getAll(`${process.env.NEXT_PUBLIC_SERVER_HOST_}/uploads`)
        .then(respuesta => {
            setFilesLogList(respuesta)
        })
        .catch(error => {
            console.log(error)
        }) */
	}
	useEffect(() => {
		getFiles()

	}, [types])
	
	return (
		<section className={log}>
			<h2>Recorded files</h2>
			<div className={log_table}>
				<div className={top_row}>
					<p>File name</p>
					<p>Actions</p>
				</div>
				{filesLogList.map((file) =>
					<FilesLogTableRow
						key={file._id}
						fileName={file.name}
						fileId={file._id}
						pathDocument={file.pathDocument}
					/>
				)}
			</div>
		</section>
	);
};

const UploadedFilesLog = React.memo(UploadedFilesLogComponent, (prevProps,props)=>{
	return prevProps.id === props.id
});
export default UploadedFilesLog;
