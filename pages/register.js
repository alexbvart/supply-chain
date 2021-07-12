import React, {useState} from 'react';
import RegisterForm from '../src/components/RegisterForm/RegisterForm';
const register = () => {
    return ( 
        <>
            <RegisterForm type="administrator" title="Register basic information about the company"/>
        </>
    );
}
export default register;