import React from "react";
import { useForm } from "react-hook-form";
import Footer from '../Footer/Footer'
import {
  form_container,
  wrapper,
  register_form,
  grid_form,
  headline,
} from './registerForm.module.css';

const Form = ({ defaultValues, children, onSubmit, title }) => {

  const { handleSubmit, register } = useForm({ defaultValues });

  return (
    <div className={wrapper}>

        <form className={`${register_form}`} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={headline}>{title}</h1>
          <div className={`${grid_form} `}>
          {Array.isArray(children)
            ? children.map((child) => {
              return child.props.name
                ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name
                  }
                })
                : child;
            })
            : children}
            </div>
        </form>

    </div>
  );
};

export default Form;
