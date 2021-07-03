import React from 'react';
import EnterpriseHeader from '../../components/EnterpriseHeader/EnterpriseHeader'
import PlusButton from '../../components/PlusButton/PlusButton'
import {
  enterprise_info,
	main_section,
	info_field,
	grid_info_fields,
	container,
	ruc_field,
	button_container
} from './enterpriseInfo.module.css';

const EnterpriseInfo = (props) => {
	const { name, dni, ruc, salesman, phone, address, logo } = props;
	return (
		<div className={enterprise_info}>
			<EnterpriseHeader />
			<section className={main_section}>
				<article className={`${info_field} ${ruc_field}`}>
					<h2>Registro único de contribuyente</h2>
					<p>20503840121</p>
				</article>
				<article className={info_field}>
					<h2>Representante legal</h2>
					<p>Sanchez Retis Gilma Clelia</p>
				</article>
				<article className={info_field}>
					<h2>Teléfono</h2>
					<p>(01) 4419604</p>
				</article>
				<article className={info_field}>
					<h2>Dirección</h2>
					<p>Av. Victor Andres Belaunde Nro. 147 Int. 301 Edificio Real 5</p>
				</article>
				<article className={button_container}>
					<PlusButton text={'Relaciones'}/>
				</article>
			</section>			
		</div>
	);
};

export default EnterpriseInfo;
