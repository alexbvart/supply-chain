import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import post from '../../../module/post';

import {
	upload,
	upload_container,
	select_file,
	select_button,
	input_file,
	file_name,
	cta_button,
} from './styles.module.css';

const UploadFile = ({ processId, types, status }) => {
	const [file, setFile] = useState('12');
console.log({types})
	const uploadNewFile = async (file) => {

		try {
			let formData = new FormData();
			formData.append('file', file)
			formData.append('type', types)
			formData.append('processId', processId)
			formData.append('status', status)

			const res = await axios({
				method: 'post',
				url: `${process.env.NEXT_PUBLIC_SERVER_HOST_}/uploads`,
				data: formData,
				headers: { 'Content-Type': 'multipart/form-data' }
			})
			/* .then(function (response) {
				//handle success
				console.log(response);
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			}); */
			swal("File sent", `Recorded in the database`, "success")
		} catch (error) {
			console.error(error);
		}
	};

	function checkDuplicated(newFile) {
		const storedFiles = Object.values(localStorage);

		return storedFiles.includes(newFile);
	}
	return (
		<section className={upload}>
			<h2>Upload file</h2>
			<div className={upload_container}>
				<p>Upload your file: </p>
				<article className={select_file}>
					<label htmlFor="upload" className={select_button}>
						Select file
					</label>
					<input 
						key={`${types}${status}${processId}`}
						id="upload"
						className={input_file}
						type="file"
						onChange={(event) => setFile(event.target.files[0])}
					></input>
				</article>
				<div id="fileName" className={file_name}>
					<p>Selected file: </p>
					<p id="fileName">{file.name}</p>
				</div>
				<button
					className={cta_button}
					onClick={() =>
						file !== '' && !checkDuplicated(`${file.name},${file.type}`)
							? uploadNewFile(file)
							: ''
					}
				>
					<p>Upload</p>
				</button>
			</div>
		</section>
	);
};

export default UploadFile;
