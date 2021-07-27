import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import axios from 'axios';
import capitalizeFirstLetterOfAString from '../../../utils/capitalizeFirstLetterOfAString';

import {
	container,
	header,
	headline,
	plus_icon,
	dropdowns,
	droplists_container,
	datalist_container,
	from_droplist,
	to_droplist,
	type_list_container,
} from './relationsForm.module.css';

const RelationsForm = () => {
	const [suppliers, getSuppliers] = useState(null);
	const [customers, getCustomers] = useState(null);
	const [enterprises, getEnterprises] = useState(null);

	const baseUrl = 'http://localhost:3001';

	useEffect(() => {
		axios.get(`${baseUrl}/supplier`).then((response) => {
			getSuppliers(response.data);
		});
		axios.get(`${baseUrl}/customer`).then((response) => {
			getCustomers(response.data);
		});
		axios.get(`${baseUrl}/enterprise`).then((response) => {
			getEnterprises(response.data);
		});
	}, []);

	const [typeFrom, setTypeFrom] = useState(customers);
	const [typeTo, setTypeTo] = useState(customers);

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

			<section className={dropdowns}>
				<div className={from_droplist}>
					<h2>From:</h2>
					<div className={droplists_container}>
						<article className={type_list_container}>
							<select
								name="typeTo"
								id="typeTo"
								onChange={(event) => {
									if (event.target.value === 'select') setTypeTo(null);
									if (event.target.value === 'supplier') setTypeTo(suppliers);
									if (event.target.value === 'customer') setTypeTo(customers);
									if (event.target.value === 'enterprise')
										setTypeTo(enterprises);
								}}
							>
								<option value="select">Select type</option>
								<option value="supplier">Supplier</option>
								<option value="customer">Customer</option>
								<option value="enterprise">Enterprise</option>
							</select>
							
						</article>
						<article className={datalist_container}>
							<input list="types_list" />
							<datalist id="types_list">
								{typeTo !== null
									? typeTo.map((element) => (
											<option
												key={element.id}
												value={
													typeTo === suppliers || typeTo === enterprises
														? element.COMPANY_NAME
															? capitalizeFirstLetterOfAString(
																	String(element.COMPANY_NAME)
															  )
															: capitalizeFirstLetterOfAString(
																	String(element.FULL_NAME)
															  )
														: element.FULL_NAME
														? capitalizeFirstLetterOfAString(
																String(element.FULL_NAME)
														  )
														: capitalizeFirstLetterOfAString(
																String(element.COMPANY_NAME)
														  )
												}
											/>
									  ))
									: ''}
							</datalist>
						</article>
					</div>
				</div>
				<div className={to_droplist}>
					<h2>To:</h2>
					<div className={droplists_container}>
						<article className={datalist_container}>
							<select
								name="typeFrom"
								id="typeFrom"
								onChange={(event) => {
									if (event.target.value === 'select') setTypeFrom(null);
									if (event.target.value === 'supplier') setTypeFrom(suppliers);
									if (event.target.value === 'customer') setTypeFrom(customers);
									if (event.target.value === 'enterprise')
										setTypeFrom(enterprises);
								}}
							>
								<option value="select">Select type</option>
								<option value="supplier">Supplier</option>
								<option value="customer">Customer</option>
								<option value="enterprise">Enterprise</option>
							</select>
						</article>
						<article className={datalist_container}>
							<input list="names_list" />
							<datalist id="names_list">
								{typeFrom !== null
									? typeFrom.map((element) => (
											<option
												key={element.id}
												value={
													typeFrom === suppliers || typeFrom === enterprises
														? element.COMPANY_NAME
															? capitalizeFirstLetterOfAString(
																	String(element.COMPANY_NAME)
															  )
															: capitalizeFirstLetterOfAString(
																	String(element.FULL_NAME)
															  )
														: element.FULL_NAME
														? capitalizeFirstLetterOfAString(
																String(element.FULL_NAME)
														  )
														: capitalizeFirstLetterOfAString(
																String(element.COMPANY_NAME)
														  )
												}
											/>
									  ))
									: ''}
							</datalist>
						</article>
					</div>
				</div>
			</section>
		</div>
	);
};

export default RelationsForm;
