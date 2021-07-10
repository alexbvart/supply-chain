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

const RegisterForm = ({ type, title }) => {
  const [personType , setPersonType ] = useState('natural');

	return (
    <div className={wrapper}>
      <div className={form_container}>
        <div className={register_form}>
          <h1 className={headline}>{title}</h1>
          { (type === 'client' || type === 'provider') ? 
              <section className={person_type}>
                <p className={headline2}>Type of person</p>
                <div className={`${toggle} ${toggle_person}`}>
                  <article 
                    className={`${person} ${personType === 'natural' ? selected_person : ''}`} 
                    onClick={() => setPersonType('natural')}
                  >
                    <p>Natural</p>
                  </article>
                  <article 
                    className={`${person} ${personType === 'legal' ? selected_person : ''}`} 
                    onClick={() => setPersonType('legal')}
                  >
                    <p>Legal</p>
                  </article> 
                </div>
              </section>
              : ''    
          }
          
          <section className={personal_data}>
            <p className={headline2}>Personal data</p>
              <form className={form} id="registerForm" action="">
                <InputForm
                  cssClass={`${input_container} ${firstInput}`}
                  type={'text'}
                  name={'name'} 
                  placeholder={'Full name'} 
                  maxLength={80}
                  pattern={'[a-z]'}
                  title={'Must only contain letters'}
                />
                <InputForm 
                  type={'tel'}
                  name={personType === 'natural' ? 'dni' : 'ruc'} 
                  placeholder={personType === 'natural' ? 'DNI' : 'RUC'}   
                  maxLength={personType === 'natural' ? 8 : 10}
                  pattern={'[0-9]'}
                  title={'Must only contain numbers from 9 to 0'}
                />
                <InputForm 
                  type={'tel'}
                  name={'phone'} 
                  placeholder={'Phone'}
                  maxLength={9}
                  pattern={'[0-9]'}
                  title={'Must only contain numbers from 9 to 0'}
                />
                <InputForm 
                  type={'text'}
                  name={personType === 'natural' ? 'email' : 'businessName'} 
                  placeholder={personType === 'natural' ? 'e-mail' : 'Business name'}   
                  maxLength={40}
                  pattern={''}
                  title={personType === 'natural' ? 'Must contain one special character and one capital letter' : ''}
                />
                <InputForm 
                  type={'text'}
                  name={'address'} 
                  placeholder={'Address'}   
                  maxLength={50}
                  pattern={'[a-z]'}
                />
              </form>
          </section>
          { type === 'employee' || type === 'administrator' ?
              <section className={user_data}>
                <p className={headline2}>User data</p>
                <div className={`${toggle} ${user_email}`}>
                  <article className={full_name}>
                    <input className={name_input} type="text" name="name" placeholder="name_secondname"/>
                  </article>
                  <article className={email_domain}>
                    <input className={domain_input} type="text" name="domain" placeholder="@domain.com" />
                  </article>
                </div>
                  <InputForm 
                    type={'password'}
                    name={'password'} 
                    placeholder={'Password'}   
                    maxLength={50}
                    pattern={'[a-z]'}   
                  />
              </section>
              : ''  
          }
        </div>
        <footer className={footer}>
          <div className={footer_buttons}>
            <button className={cancel_button}><p>Cancel</p></button>
            <button type="button" form="registerForm" className={register_button}><p>Register {type}</p></button>
          </div>
        </footer>
      </div>
    </div>
	);
};

export default RegisterForm;
