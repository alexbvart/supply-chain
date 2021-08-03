import React from 'react';
import {
	footer,
	footer_buttons,
	cancel_button,
	register_button,
} from './footer.module.css';

function Footer({ textContent }) {
	return (
		<footer className={footer}>
			<div className={footer_buttons}>
				<button className={cancel_button}>
					<p>Cancel</p>
				</button>
				<button type="button" form="registerForm" className={register_button}>
					<p>{textContent}</p>
				</button>
			</div>
		</footer>
	);
}

export default Footer;
