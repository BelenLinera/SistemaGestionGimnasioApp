import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createActivity,
  updateActivity,
  getActivityByName
} from "../../Activity/ActivityServices";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import "./FormActivity.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const createActivitySchema = yup.object({
  activityName: yup
    .string()
    .required("El nombre de la actividad es requerido")
    .matches(
      /^[a-zA-Z0-9 áéíóúÁÉÍÓÚüÜñÑ]+$/,
      "El nombre no debe tener símbolos ni caracteres especiales"
    ),
  activityDescription: yup
    .string()
    .required("La descripción de la actividad es requerida")
    .min(5, "La descripción debe tener al menos 5 caracteres")
    .max(120, "La descripción debe tener como máximo 120 caracteres"),
});

const editActivitySchema = yup.object({
  activityName: yup
    .string()
    .required("El nombre de la actividad es requerido")
    .matches(
      /^[a-zA-Z0-9 áéíóúÁÉÍÓÚüÜñÑ]+$/,
      "El nombre no debe tener símbolos ni caracteres especiales"
    ),
  activityDescription: yup
    .string()
    .required("La descripción de la actividad es requerida")
    .min(5, "La descripción debe tener al menos 5 caracteres")
    .max(120, "La descripción debe tener como máximo 120 caracteres"),
});



const FormActivity = ({ entity, editFormAct }) => {
  let navigate = useNavigate();
  let { activityName } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(
      editFormAct ? editActivitySchema : createActivitySchema
    ),
  });

  useEffect(() => {
    if (activityName){
      const fetchActivities = async () => {
        try {
          const dataActivity = await getActivityByName(activityName);
          setValue("activityName", dataActivity.data.activityName);
          setValue("activityDescription", dataActivity.data.activityDescription);
        }
        catch (error) {
          toast.error("Error al traer los datos de la actividad")
        }
      };
      fetchActivities();
    }
  },[]);
  const onSubmit = async (data) => {
    if (editFormAct) {
      if (entity === "activity") {
        try {
           await updateActivity(
            activityName,
            data.activityName,
            data.activityDescription
          );
          toast.success("Actividad actualizada con exito")
          setTimeout(() => {
            return navigate("/activity", { replace: true });
          }, 3000);
        } catch (error) {
          toast.error(error.response.data);
        }
      }
    }
    if (entity === "activity" && !editFormAct ) {
      try {
        await createActivity(data.activityName, data.activityDescription);
        toast.success("Actividad creada con exito")
        setTimeout(() => {
          return navigate("/activity", { replace: true });
        }, 3000);  
      } catch (error) {
        toast.error(error.response.data);
        
      }
    }
   
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
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default FormActivity;
