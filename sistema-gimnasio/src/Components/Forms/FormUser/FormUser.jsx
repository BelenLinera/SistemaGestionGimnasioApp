import React from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./FormUser.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createAdmin } from "../../Admin/AdminServices";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  firstName: yup
    .string()
    .required("El nombre es requerido")
    .matches(/^[a-zA-Z]+$/, "El nombre debe tener solo letras"),
  lastname: yup
    .string()
    .required("El apellido es requerido")
    .matches(/^[a-zA-Z]+$/, "El apellido debe tener solo letras"),
  email: yup
    .string()
    .required("El email es requerido")
    .email("Formato de mail invalido"),
  password: yup
    .string()
    .required("La contrasena es requerida")
    .min(8, "La contrasena debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ])*$/,
      "La contraseña debe contener al menos una letra minúscula,una mayuscula y un número"
    ),
});

const FormUser = ({ entity }) => {
    let navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    if (entity === "admin") {
      try {
        await createAdmin(data.email, data.firstName, data.lastname, data.password);
        navigate('/admin', { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <section className="register-section">
      <h2>CREA TU CUENTA</h2>
      <Form className="register-form-group" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Control
            className="input-register"
            onFocus={() => clearErrors("firstName")}
            {...register("firstName")}
            type="name"
            placeholder="Nombre"
          />
          {errors.firstName && (
            <span className="alert" role="alert">
              {errors.firstName.message}
            </span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupLastName">
          <Form.Control
            className="input-register"
            onFocus={() => clearErrors("lastname")}
            {...register("lastname")}
            type="lastname"
            placeholder="Apellido"
          />
          {errors.lastname && (
            <span className="alert" role="alert">
              {errors.lastname.message}
            </span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            className="input-register"
            onFocus={() => clearErrors("email")}
            {...register("email")}
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <span className="alert" role="alert">
              {errors.email.message}
            </span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Control
            className="input-register"
            type="password"
            onFocus={() => clearErrors("password")}
            {...register("password")}
            placeholder="Contraseña"
          />
          {errors.password && (
            <span className="alert" role="alert">
              {errors.password.message}
            </span>
          )}
        </Form.Group>
        <Button variant="light" className="button-register" type="submit">
          Registrarse
        </Button>
      </Form>
      <div className="have-account">
        Ya tenes cuenta? <a href="">Inicia sesion</a>
      </div>
    </section>
  );
};

export default FormUser;
