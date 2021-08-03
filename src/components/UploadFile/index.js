import axios from 'axios';
import React, { useState } from 'react';
import post from '../../../utils/post';

import {
	upload,
	upload_container,
	select_file,
	select_button,
	input_file,
	file_name,
	cta_button,
} from './styles.module.css';

const UploadFile = () => {
	const [file, setFile] = useState('');

	const uploadNewFile = async (file) => {
		
		try {
			let formData = new FormData();
			formData.append('file', file)
			const res = await axios.post("http://localhost:5000/uploads", formData,
				{ 
					headers:{
						"Authorization": "YOUR_API_AUTHORIZATION_KEY_SHOULD_GOES_HERE_IF_HAVE",
                        "Content-type": "multipart/form-data",
					},
				}
			)
			console.log(res);
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
