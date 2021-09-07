import Footer from '@components/Footer/Footer';
import { Input } from '@components/InputForm/Input';
import Form from '@components/RegisterForm/Form';
import { login } from '@services/userApi';
import useUser from 'Hooks/useUser';
import React, { useEffect, useState } from 'react';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { mutate, loggedIn } = useUser();
    useEffect(() => {
        if (loggedIn) Router.replace("/");
    }, [loggedIn]);

    if (loggedIn) return <> Redirecting.... </>;

    const onSubmit = (data) => {
        /* e.preventDefault() */
        console.log("padre", data);
        if (email && password) {
            login({ email , password });
            mutate();
        }
    }
    return (
        <>
            <Form onSubmit={onSubmit} title="Inicia sesión">
                <Input name="email" label="Correo electrónico" placeholder="ejemplo@amail.com" span="6" />
                <Input name="password" label="Contraseña" type="password"  span="6" />
                <Footer />
            </Form>
        </>
    );
}
export default Login;