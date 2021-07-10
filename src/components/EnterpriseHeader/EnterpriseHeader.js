import React from 'react'
import {
	header,
	enterprise_hero,
	enterprise_data,
	edit_enterprise_info,
} from './enterpriseHeader.module.css';

const EnterpriseHeader = (props) => {
  const { name, dni, ruc, logo } = props;
	return (
		<header className={header}>
			<section className={enterprise_hero}>
				{logo &&
					<figure>
						<img src="./assets/images/logo.png" alt="enterprise logo" /> 
					</figure>
				}
				<div className={enterprise_data}>
					<h1>{name}</h1>
					<p>{ruc||dni}</p>
				</div>
			</section>
			<figure className={edit_enterprise_info}>
				<img src="../assets/icons/edit_icon.png" alt="edit icon" /> 
			</figure>
		</header>
	);
}

export default EnterpriseHeader