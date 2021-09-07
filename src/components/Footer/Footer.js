import { useRouter } from 'next/router';
import React from 'react';
import {
	footer,
	footer_buttons,
	cancel_button,
	register_button,
} from './footer.module.css';

function Footer({ textContent }) {
	const router = useRouter()

	const cancelForm = (e)=>{
		e.preventDefault();
		console.log("cancelar todo");
		router.back()
	}

	return (
		<footer className={footer}>
			<div className={footer_buttons}>
				<button className={cancel_button} onClick={(e)=>cancelForm(e)}>
					<p>Cancel</p>
				</button><button className={register_button} >
					<p>Registrar</p>
				</button>
				
			</div>
		</footer>
	);
}

export default Footer;
