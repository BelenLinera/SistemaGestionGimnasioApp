import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../../api";
import { useNavigate } from "react-router-dom";

const email = yup.object({
  email: yup
    .string()
    .required("El email es requerido")
    .email("Formato de mail invalido"),
});

const RecoverPassword = () => {
  let navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(email)
  });
  const onSubmit = async (data) =>
  {
    try {
      const response = await api.post(`api/User?email=${data.email}`);

      if (response.status= 200) {
        return navigate("/forget-password/validate-token", { replace: true });
      }
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <>
      <Form className="form-group" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            className="input-form"
            onFocus={() => clearErrors("email")}
            {...register("email")}
            type="email"
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <span className="alert" role="alert">
              {errors.email.message}
            </span>
          )}
        </Form.Group>
        <Button variant="light" className="button-login" type="submit">
          Enviar
        </Button>
      </Form>
    </>
  );
};

export default RecoverPassword;
