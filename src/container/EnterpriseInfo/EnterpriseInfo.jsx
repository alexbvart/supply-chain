import React from 'react';
import {
	header,
	enterpriseHero,
	enterpriseData,
	editEnterpriseInfo,
} from './enterpriseInfo.module.css';

const EnterpriseInfo = (props) => {
	const { name, dni, ruc, salesman, phone, address, logo } = props;
	return (
		<header className={header}>
			<section className={enterpriseHero}>
				<figure>
					<img src="/" alt="enterprise logo" /> 
				</figure>
				<div className={enterpriseData}>
					<h1>REPSOL COMERCIAL SAC</h1>
					<p>20503840121</p>
				</div>
			</section>
			<div className={editEnterpriseInfo}>
				<button onClick={() => {}}></button>
			</div>
		</header>
	);
};

export default EnterpriseInfo;
