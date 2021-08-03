import React, { useState,useEffect } from 'react';
// import FilesLogTableRow from '../FilesLogTableRow/index'
import dynamic from 'next/dynamic';
import { log, log_table, top_row } from './styles.module.css';
import getAll from '../../../utils/getAll';

const storage = typeof window !== 'undefined' ? localStorage : null;

const FilesLogTableRow = dynamic(() => import('../FilesLogTableRow/index'), {
	ssr: false,
});

const UploadedFilesLog = () => {

	const [Files, setFiles] = useState([])
	const getFiles = async () =>{
		const res = await getAll("http://localhost:5000/uploads")
		await setFiles(res)
	}

	useEffect(() => {
		getFiles()
		console.log(Files)
	}, [])
	
	return (
		<section className={log}>
			<h2>Recorded files</h2>
			<div className={log_table}>
				<div className={top_row}>
					<p>File name</p>
					<p>Actions</p>
				</div>
				{Files.map((file) =>
						<FilesLogTableRow
							key={file.id}
							fileName={file.name}
							fileId={file.id}
							pathDocument={file.pathDocument}
						/>
					
				)}
			</div>
		</section>
	);
};

export default UploadedFilesLog;
