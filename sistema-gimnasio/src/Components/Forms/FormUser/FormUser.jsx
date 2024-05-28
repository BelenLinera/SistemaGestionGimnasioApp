import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAdmin, updateAdmin } from "../../Admin/AdminServices";
import {
  createClient,
  updateClient,
  updateClientActiveState,
} from "../../Client/ClientServices";
import { createTrainer, updateByEmail } from "../../Trainer/TrainerServices";
import "./FormUser.css";
import api from "../../../api";

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

const animatedComponents = makeAnimated();
const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#d9d9d9",
    width: 207,
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#d9d9d9",
  }),
};

const FormUser = ({ entity, editForm }) => {
  const navigate = useNavigate();
  const [optionsActivities, setOptionsActivities] = useState([]);
  const { userEmail } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    control,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(editForm ? editUserSchema : createUserSchema),
  });
  useEffect(() => {
    api.get("/api/Activity").then((response) => {
      const mappedActivities = response.data.map((activity) => ({
        value: activity.idActivity,
        label: activity.activityName,
      }));
      setOptionsActivities(mappedActivities);
    });
  }, []);
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
      } else if (entity === "trainer") {
        try {
          await updateByEmail(userEmail, data.firstName, data.lastname);
          return navigate("/trainer", { replace: true });
        } catch (error) {
          return console.log(error);
        }
      }
    }

    if (entity === "admin") {
      try {
        await createAdmin(
          data.email,
          data.firstName,
          data.lastname,
          data.password
        );
        navigate("/admin", { replace: true });
      } catch (error) {
        console.log(error);
      }
    } else if (entity === "client") {
      try {
        await createClient(
          data.email,
          data.firstName,
          data.lastname,
          data.password
        );
        navigate("/client", { replace: true });
      } catch (error) {
        console.log(error);
      }
    } else if (entity === "trainer") {
      try {
        await createTrainer(
          data.email,
          data.firstName,
          data.lastname,
          data.password,
          data.activities
        );
        navigate("/trainer", { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <section className="form-section">
      <h2>
        {editForm
          ? "EDITAR CUENTA"
          : entity === "client"
          ? "CREA TU CUENTA"
          : `CREAR ${entity}`}
      </h2>
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
        <Form.Group className="mb-3" controlId="formGroupLastName">
          <Controller
            name="activities"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className="input-form"
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={optionsActivities}
                styles={customStyles}
                value={optionsActivities.filter((option) =>
                  field.value?.includes(option.value)
                )}
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions.map((option) => option.value));
                }}
              />
            )}
          />
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
          {editForm
            ? "Editar"
            : entity === "client"
            ? "Registrarse"
            : "Crear cuenta"}
        </Button>
      </Form>
      {entity ? (
        <></>
      ) : (
        <div className="have-account">Ya tienes cuenta? Inicia sesion</div>
      )}
    </section>
  );
};

export default FormUser;
