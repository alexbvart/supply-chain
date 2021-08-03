import React, { useState } from 'react';
import InputForm from '../InputForm/InputForm'
import {
  form_container,
  wrapper,
  register_form,
  headline,
  headline2, 
  personal_data, 
  form,
  person, 
  firstInput, 
  person_type,
  toggle, 
  toggle_person,
  selected_person,
  user_data,
  user_email,
  full_name,
  name_input,
  email_domain,
  domain_input,
  footer,
  footer_buttons,
  cancel_button,
  register_button
} from './registerForm.module.css';
import { input_container } from '../InputForm/inputForm.module.css'
import { useRouter } from 'next/router'


const ProcessRegisterForm = ({ type, title }) => {

  const router = useRouter()


	return (
    <div className={wrapper}>
      <div className={form_container}>
        <div className={register_form}>
          <h1 className={headline}>{title}</h1>          
          <section className={personal_data}>
            <p className={headline2}>Personal data</p>
              <form className={form} id="ProcessRegisterForm" action="">
                <InputForm
                  cssClass={`${input_container} ${firstInput}`}
                  type={'text'}
                  name={'name'} 
                  placeholder={'Full name'} 
                  maxLength={80}
                  pattern={'[a-z]'}
                  title={'Must only contain letters'}
                />
                
              </form>
          </section>
        </div>
        <footer className={footer}>
          <div className={footer_buttons}>
            <button className={cancel_button} onClick={() => router.back()} ><p>Cancel</p></button>
            <button type="button" form="ProcessRegisterForm" className={register_button}><p>Register {type}</p></button>
          </div>
        </footer>
      </div>
    </div>
	);
};

export default ProcessRegisterForm;
