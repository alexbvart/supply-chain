import React from 'react';
import InputForm from '../InputForm/InputForm'
import { 
  register_form, 
  personal_info, 
  form, 
  firstInput, 
  person_type,
  toggle_person 
} from './registerForm.module.css';
import { input_container } from '../InputForm/inputForm.module.css'

const RegisterForm = ({ type = 'employee', title }) => {
	return (
		<div className={register_form}>
      <h1>Registrar nuevo empleado</h1>
      <section className={person_type}>
        <h2>Tipo de persona</h2>
        <div className={toggle_person}>
          <article>Natural</article>
          <article>Jurídica</article>
        </div>
      </section>
			<section className={personal_info}>
        <h2>Datos personales</h2>
          <form className={form} action="">
            <InputForm
              cssClass={`${input_container} ${firstInput}`}
              type={'text'}
              name={'name'} 
              placeholder={'Razón social'} 
              maxLength={80}
              pattern={'[a-z]'}
              title={'Debe contener solamente letras'}
            />
            <InputForm 
              type={'tel'}
              name={type === 'employee' ? 'dni' : ''} 
              placeholder={type === 'employee' ? 'DNI' : 'RUC'}   
              maxLength={type === 'employee' ? 8 : 10}
              pattern={'[0-9]'}
              title={'Debe contener solamente números del 0 al 9'}
            />
            <InputForm 
              type={'tel'}
              name={'phone'} 
              placeholder={'Teléfono'}
              maxLength={9}
              pattern={'[0-9]'}
              title={'Debe contener solamente números del 0 al 9'}
            />
            <InputForm 
              type={'text'}
              name={type === 'employee' ? 'email' : 'Teléfono'} 
              placeholder={type === 'employee' ? 'e-mail' : 'Repr. legal'}   
              maxLength={type === 'employee' ? 40 : 10}
              pattern={''}
              title={'Debe contener un caracter especial y una máyuscula'}
            />
            <InputForm 
              type={'text'}
              name={'address'} 
              placeholder={'Dirección'}   
              maxLength={50}
              pattern={'[a-z]'}   
            />  
          </form>
      </section>
		</div>
	);
};

export default RegisterForm;
