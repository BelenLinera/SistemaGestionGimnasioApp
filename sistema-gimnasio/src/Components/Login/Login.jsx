import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import "./Login.css";

const Login = () => {
  return (
    <section className='login-section'>
        <h2>BIENVENIDO/A</h2>
        <Form  className="login-form-group">
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Control className='input-login' type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control className='input-login' type="password" placeholder="Contraseña"/>
            </Form.Group>
        </Form>
        <Button variant="light" className='button-login'>Iniciar sesión</Button>
        <div className='forget-password'>
            No tenes cuenta?   <a href="">Registrate</a> 
        </div>

    </section>
  )
}

export default Login