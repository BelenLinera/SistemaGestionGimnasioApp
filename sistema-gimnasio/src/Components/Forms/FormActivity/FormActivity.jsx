import React from "react";
import { useNavigate } from "react-router-dom";
import {
  createActivity,
  updateActivity,
} from "../../Activity/ActivityServices";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import "./FormActivity.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";

const createActivitySchema = yup.object({
  activityName: yup
    .string()
    .required("El nombre de la actividad es requerido")
    .matches(
      /^[a-zA-Z0-9 ]+$/,
      "El nombre no debe tener simbolos ni caracteres especiales"
    ),
  activityDescription: yup
    .string()
    .required("La descripcion de la actividad es requerida")
    .matches(
      /^[a-zA-Z0-9 ]+$/,
      "La descripcion no debe contener simbolos ni caracteres especiales"
    ),
});

const editActivitySchema = yup.object({
  activityName: yup
    .string()
    .required("El nombre de la actividad es requerido")
    .matches(/^[a-zA-Z0-9 ]+$/, "El nombre debe tener solo letras"),
  activityDescription: yup
    .string()
    .required("La descripcion de la actividad es requerida")
    .matches(
      /^[a-zA-Z0-9 ]+$/,
      "La descripcion no debe contener simbolos ni caracteres especiales"
    ),
});

const FormActivity = ({ entity, editFormAct }) => {
  let navigate = useNavigate();
  let { activityName } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(
      editFormAct ? editActivitySchema : createActivitySchema
    ),
  });

  const onSubmit = async (data) => {
    if (editFormAct) {
      if (entity === "activity") {
        try {
          await updateActivity(
            activityName,
            data.activityName,
            data.activityDescription
          );
          return navigate("/activity", { replace: true });
        } catch (error) {
          return console.log(error);
        }
      }
    }
    if (entity === "activity") {
      try {
        await createActivity(data.activityName, data.activityDescription);
        navigate("/activity", { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
    //}
  };
  return (
    <section className="form-section">
      <h2>{editFormAct ? "EDITAR ACTIVIDAD" : "CREA LA ACTIVIDAD"} </h2>
      <Form className="form-group" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Control
            className="input-form"
            onFocus={() => clearErrors("activityName")}
            {...register("activityName")}
            type="activityName"
            placeholder="Nombre"
          />
          {errors.activityName && (
            <span className="alert" role="alert">
              {errors.activityName.message}
            </span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupDescription">
          <Form.Control
            className="input-form"
            onFocus={() => clearErrors("activityDescription")}
            {...register("activityDescription")}
            type="activityDescription"
            placeholder="Descripcion"
          />
          {errors.activityDescription && (
            <span className="alert" role="alert">
              {errors.activityDescription.message}
            </span>
          )}
        </Form.Group>
        {editFormAct}
        <Button variant="light" className="button-form" type="submit">
          {editFormAct ? "Editar" : "Registrar"}
        </Button>
      </Form>
      {editFormAct}
    </section>
  );
};

export default FormActivity;
