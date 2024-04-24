import React from 'react';
import Form from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
import "./Register.css";

const Register = () => {
  return (
    <section className='register-section'>
        <h2>CREA TU CUENTA</h2>
        <Form className= "register-form-group">
            <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Control className='input-register' type="name" placeholder="Nombre" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupLastName">
                <Form.Control className='input-register' type="lastname" placeholder="Apellido" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Control className='input-register' type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control className='input-register' type="password" placeholder="Contraseña"/>
            </Form.Group>
        </Form>
        <Button variant="light" className='button-register'>Registrarse</Button>
        <div className='have-account'>
            Ya tenes cuenta?   <a href="">Inicia sesion</a> 
        </div>
    </section>
  )
}

export default Register