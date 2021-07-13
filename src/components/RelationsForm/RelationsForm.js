import React from 'react';
import {
	container,
	header,
	headline,
	plus_icon,
} from './relationsForm.module.css';

function RelationsForm() {
	return (
		<div className={container}>
			<header className={header}>
				<div className={headline}>
					<h1>Add new relation</h1>
					<figure>
						<img src="./assets/icons/relation_icon.png" alt="relation icon" />
					</figure>
				</div>
				<div className={plus_icon}>
					<figure>
						<img src="./assets/icons/plus_icon.png" alt="plusicon" />
					</figure>
				</div>
			</header>
		</div>
	);
}

export default RelationsForm;
