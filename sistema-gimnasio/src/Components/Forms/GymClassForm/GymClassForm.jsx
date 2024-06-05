import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createGymClass, updateGymClass } from "../../GymClass/GymClassServices";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import "./GymClassForm.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const createGymClassSchema = yup.object({
  IdTrainerActivity: yup.number().required("El ID de la actividad del entrenador es requerido"),
  TimeClass: yup.string().required("El horario de la clase es requerido"),
  Days: yup.string().required("Los días de la clase son requeridos"),
  Capacity: yup.number().required("La capacidad de la clase es requerida").positive().integer(),
});

const editGymClassSchema = yup.object({
  IdTrainerActivity: yup.number().required("El ID de la actividad del entrenador es requerido"),
  TimeClass: yup.string().required("El horario de la clase es requerido"),
  Days: yup.string().required("Los días de la clase son requeridos"),
  Capacity: yup.number().required("La capacidad de la clase es requerida").positive().integer(),
});

const GymClassForm = ({ editFormGym }) => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(editFormGym ? editGymClassSchema : createGymClassSchema),
  });

   useEffect(() => {
     if (editFormGym && id) {
       // eslint-disable-next-line no-undef
       getGymClassById(id).then((response) => {
         setInitialData(response.data);
         reset(response.data);
       }).catch((error) => {
         console.error('Failed to fetch gym class', error);
       });
     }
   }, [id, editFormGym, reset]);

  const onSubmit = async (data) => {
    try {
      if (editFormGym) {
        await updateGymClass(id, data);
      } else {
        await createGymClass(data);
      }
      navigate("/gymclass", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="form-section">
      <h2>{editFormGym ? "EDITAR CLASE DE GIMNASIO" : "CREAR CLASE DE GIMNASIO"}</h2>
      <Form className="form-group" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formGroupIdTrainerActivity">
          <Form.Control
            className="input-form"
            onFocus={() => clearErrors("IdTrainerActivity")}
            {...register("IdTrainerActivity")}
            type="number"
            placeholder="ID de la Actividad del Entrenador"
          />
          {errors.IdTrainerActivity && (
            <span className="alert" role="alert">
              {errors.IdTrainerActivity.message}
            </span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupTimeClass">
          <Form.Control
            className="input-form"
            onFocus={() => clearErrors("TimeClass")}
            {...register("TimeClass")}
            type="text"
            placeholder="Horario"
          />
          {errors.TimeClass && (
            <span className="alert" role="alert">
              {errors.TimeClass.message}
            </span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupDays">
          <Form.Control
            className="input-form"
            onFocus={() => clearErrors("Days")}
            {...register("Days")}
            type="text"
            placeholder="Días"
          />
          {errors.Days && (
            <span className="alert" role="alert">
              {errors.Days.message}
            </span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupCapacity">
          <Form.Control
            className="input-form"
            onFocus={() => clearErrors("Capacity")}
            {...register("Capacity")}
            type="number"
            placeholder="Capacidad"
          />
          {errors.Capacity && (
            <span className="alert" role="alert">
              {errors.Capacity.message}
            </span>
          )}
        </Form.Group>
        <Button variant="light" className="button-form" type="submit">
          {editFormGym ? "Editar" : "Registrar"}
        </Button>
      </Form>
    </section>
  );
};

export default GymClassForm;
