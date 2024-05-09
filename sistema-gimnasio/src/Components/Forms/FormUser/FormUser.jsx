import React from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./FormUser.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createAdmin, updateAdmin } from "../../Admin/AdminServices";
import { useNavigate, useParams } from "react-router-dom";
import { createClient, updateClient, updateClientActiveState } from "../../Client/ClientServices";

const createUserSchema = yup.object({
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

const editUserSchema = yup.object({
  firstName: yup
    .string()
    .required("El nombre es requerido")
    .matches(/^[a-zA-Z]+$/, "El nombre debe tener solo letras"),
  lastname: yup
    .string()
    .required("El apellido es requerido")
    .matches(/^[a-zA-Z]+$/, "El apellido debe tener solo letras"),
});
const FormUser = ({ entity, editForm }) => {
  let navigate = useNavigate();
  let { userEmail } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(editForm ? editUserSchema : createUserSchema),
  });

  const onSubmit = async (data) => {
    if (editForm) {
      if (entity === "admin") {
        try {
          await updateAdmin(userEmail, data.firstName, data.lastname);
          return navigate("/admin", { replace: true });
        } catch (error) {
          return console.log(error);
        }
      } else if (entity === "client") {
        try {
          await updateClient(userEmail, data.firstName, data.lastname);
          await updateClientActiveState(userEmail, data.autorizationToReserve);
          return navigate("/client", { replace: true });
        } catch (error) {
          return console.log(error);
        }
      }
    }

    if (entity === "admin") {
      try {
        await createAdmin(data.email, data.firstName, data.lastname, data.password);
        navigate("/admin", { replace: true });
      } catch (error) {
        console.log(error);
      }
    } else if (entity === "client") {
      try {
        await createClient(data.email, data.firstName, data.lastname, data.password);
        navigate("/client", { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <section className="form-section">
      <h2>{editForm ? "EDITAR CUENTA" : "CREA TU CUENTA"}</h2>
      <Form className="form-group" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Control
            className="input-form"
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
            className="input-form"
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
        {editForm ? (
          <> </>
        ) : (
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control
              className="input-form"
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
        )}
        {editForm ? (
          <> </>
        ) : (
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              className="input-form"
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
        )}
        <Button variant="light" className="button-form" type="submit">
          {editForm ? "Editar" : "Registrarse"}
        </Button>
      </Form>
      {editForm ? (
        <></>
      ) : (
        <div className="have-account">
          Ya tenes cuenta? <a href="">Inicia sesion</a>
        </div>
      )}
    </section>
  );
};

export default FormUser;
