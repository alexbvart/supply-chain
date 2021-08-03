import React, { useState } from 'react';
// import FilesLogTableRow from '../FilesLogTableRow/index'
import dynamic from 'next/dynamic';
import { log, log_table, top_row } from './styles.module.css';
const storage = typeof window !== 'undefined' ? localStorage : null;

const FilesLogTableRow = dynamic(() => import('../FilesLogTableRow/index'), {
	ssr: false,
});

const UploadedFilesLog = () => {
	const storedFiles = [];
	const entries = Object.entries(storage);

	for (let file of entries) {
		storedFiles.push(file);
	}

	console.log(storedFiles);
	const isFile = (file) => file.charAt(0) !== '{';

	return (
		<section className={log}>
			<h2>Recorded files</h2>
			<div className={log_table}>
				<div className={top_row}>
					<p>File name</p>
					<p>Actions</p>
				</div>
				{storedFiles.map((file) =>
					/* file[0] = key,  file[1] = name*/
					isFile(file[1]) ? (
						<FilesLogTableRow
							key={file.id}
							fileName={file[1].split(/,/)[0]}
							fileId={file[0]}
						/>
					) : (
						''
					)
				)}
			</div>
		</section>
	);
};

export default UploadedFilesLog;
