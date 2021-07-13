import React, { useState } from 'react';
import InputForm from '../InputForm/InputForm'
import Footer from '../Footer/Footer'
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
  domain_input  
} from './registerForm.module.css';
import { input_container } from '../InputForm/inputForm.module.css'

const RegisterForm = ({ formType, title }) => {
  const [isNaturalPerson , setNaturalPerson ] = useState(true);

	return (
    <div className={wrapper}>
      <div className={form_container}>
        <div className={register_form}>
          <h1 className={headline}>{title}</h1>
          { (formType === 'client' || formType === 'provider') ? 
              <section className={person_type}>
                <p className={headline2}>Type of person</p>
                <div className={`${toggle} ${toggle_person}`}>
                  <article 
                    className={`${person} ${isNaturalPerson ? selected_person : ''}`} 
                    onClick={() => setNaturalPerson(true)}
                  >
                    <p>Natural</p>
                  </article>
                  <article 
                    className={`${person} ${!isNaturalPerson ? selected_person : ''}`} 
                    onClick={() => setNaturalPerson(false)}
                  >
                    <p>Legal</p>
                  </article> 
                </div>
              </section>
              : ''    
          }
          
          <section className={personal_data}>
              <p className={headline2}>{formType !== 'enterprise' ? 'Personal data' : ''}</p>
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
                  name={isNaturalPerson && formType !== 'enterprise' ? 'dni' : 'ruc'} 
                  placeholder={isNaturalPerson && formType !== 'enterprise' ? 'DNI' : 'RUC'}   
                  maxLength={isNaturalPerson && formType !== 'enterprise' ? 8 : 10}
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
                  name={isNaturalPerson ? 'email' : 'businessName'} 
                  placeholder={isNaturalPerson ? 'e-mail' : 'Business name'}   
                  maxLength={40}
                  pattern={''}
                  title={isNaturalPerson ? 'Must contain one special character and one capital letter' : ''}
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
          { formType === 'employee' || formType === 'administrator' ?
              <section className={user_data}>
                <p className={headline2}>User data</p>
                <div className={`${toggle} ${user_email}`}>
                  <article className={full_name}>
                    <input className={name_input} type="text" name="name" placeholder="secondname" disabled/>
                  </article>
                  <article className={email_domain}>
                    <input className={domain_input} type="text" name="domain" placeholder="@domain.com" disabled/>
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
        <Footer textContent={`Register ${formType ? 'new ' + formType : ''}`}/>  
      </div>
    </div>
	);
};

export default RegisterForm;
