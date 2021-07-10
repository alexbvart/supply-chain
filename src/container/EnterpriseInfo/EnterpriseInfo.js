import React from 'react';
import EnterpriseHeader from '../../components/EnterpriseHeader/EnterpriseHeader'
import PlusButton from '../../components/PlusButton/PlusButton'
import {
  	enterprise_info,
	main_section,
	info_field,
	ruc_field,
	button_container
} from './enterpriseInfo.module.css';

const EnterpriseInfo = (props) => {
	const { name, dni, ruc, salesman, phone, address, logo } = props;
	return (
		<div className={enterprise_info}>
			<EnterpriseHeader name={name} dni={dni} ruc={ruc} logo={logo} />
			<section className={main_section}>

				{(ruc)&&
					<article className={`${info_field} ${ruc_field}`}>
						<h2>Registro único de contribuyente</h2>
						<p>{ruc}</p>
					</article>
				}
				{(dni)&&
					<article className={`${info_field} ${ruc_field}`}>
						<h2>Documento Nacional de Identificación</h2>
						<p>{dni}</p>
					</article>
				}
				{salesman&&
					<article className={info_field}>
						<h2>Representante legal</h2>
						<p>{salesman}</p>
					</article>
				}
				{phone&&
					<article className={info_field}>
						<h2>Teléfono</h2>
						<p>{phone}</p>
					</article>
				}
				{address&&
					<article className={info_field}>
						<h2>Dirección</h2>
						<p>{address}</p>
					</article>
				}

			</section>			
		</div>
	);
};

export default EnterpriseInfo;
/* 				<article className={button_container}>
					<PlusButton text={'Relaciones'}/>
				</article> */