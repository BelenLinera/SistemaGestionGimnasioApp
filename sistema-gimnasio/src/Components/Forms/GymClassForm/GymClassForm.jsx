import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  createGymClass,
  getGymClassById,
  updateGymClass,
} from "../../GymClass/GymClassServices";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllActivities } from "../../Activity/ActivityServices";
import { getAllTrainers } from "../../Trainer/TrainerServices";
import { UseAxiosLoader } from "../../../Hooks/UseAxiosLoader";
import "./GymClassForm.css";

const createGymClassSchema = yup.object({
  IdActivity: yup.object().required("La actividad del entrenador es requerida"),
  IdTrainerActivity: yup.number().required("El entrenador es requerido"),
  Days: yup.number().required("Los días de la clase son requeridos"),
  TimeClass: yup
    .string()
    .matches(
      /^([0-9]|[01]\d|2[0-3]):([00]\d)$/,
      "El horario debe estar en formato de hora (HH:mm)"
    )
    .required("El horario es requerido"),
  Capacity: yup
    .number("La capacidad debe ser un numero")
    .required("La capacidad de la clase es requerida")
    .positive("La capacidad debe ser mayor a 0")
    .integer("La capacidad debe ser un numero entero")
    .max(20, "La capacidad no puede ser mayor que 20"),
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

const GymClassForm = ({ editFormGym }) => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [optionsActivities, setOptionsActivities] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [activitySelected, setActivitySelected] = useState(null);
  const [trainerSelected, setTrainerSelected] = useState(null);
  const { sendRequest } = UseAxiosLoader();

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    control,
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(createGymClassSchema),
  });

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getAllActivities(sendRequest);
        const mappedActivities = response.data.map((activity) => ({
          value: activity.idActivity,
          label: activity.activityName,
        }));
        setOptionsActivities(mappedActivities);
      } catch (error) {
        console.error("Error trayendo las actividades", error);
      }
    };
    fetchActivities();
    console.log("Trae actividades");
  }, [sendRequest]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await getAllTrainers(sendRequest);
        setTrainers(response.data);
      } catch (error) {
        console.error("Error trayendo los entrenadores", error);
      }
    };
    fetchTrainers();
    console.log("trae trainers activities");
  }, [sendRequest]);

  const optionsTrainers = useMemo(() => {
    if (!activitySelected) return [];
    const trainersOfActivitySelected = trainers.filter((trainer) =>
      trainer.trainerActivities.some(
        (activities) =>
          activities.activity.idActivity === activitySelected.value
      )
    );
    return trainersOfActivitySelected.flatMap((trainer) =>
      trainer.trainerActivities
        .filter(
          (activities) =>
            activities.activity.idActivity === activitySelected.value
        )
        .map((activity) => ({
          value: activity.idTrainerActivity,
          label: `${trainer.name} ${trainer.lastName}`,
        }))
    );
  }, [trainers, activitySelected]);

  useEffect(() => {
    if (id) {
      const fetchDataUser = async () => {
        const dataGymClassDefault = await getGymClassById(id);
        const gymClassDefault = dataGymClassDefault.data;
        setActivitySelected({
          value: gymClassDefault.trainerActivity.idActivity,
          label: gymClassDefault.trainerActivity.activity.activityName,
        });
        setTrainerSelected({
          value: gymClassDefault.trainerActivity.idTrainerActivity,
          label: `${gymClassDefault.trainerActivity.trainer.name} ${gymClassDefault.trainerActivity.trainer.lastName}`,
        });
        setValue("IdActivity", {
          value: gymClassDefault.trainerActivity.idActivity,
          label: gymClassDefault.trainerActivity.activity.activityName,
        });
        setValue(
          "IdTrainerActivity",
          gymClassDefault.trainerActivity.idTrainerActivity
        );
        setValue("Days", gymClassDefault.days);
        setValue("TimeClass", gymClassDefault.timeClass);
        setValue("Capacity", gymClassDefault.capacity);
      };
      fetchDataUser();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (editFormGym) {
        await updateGymClass(id, data);
      } else {
        await createGymClass(data);
      }
      navigate("/gym-class", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const daysOptions = [
    { value: 1, label: "Lunes" },
    { value: 2, label: "Martes" },
    { value: 3, label: "Miércoles" },
    { value: 4, label: "Jueves" },
    { value: 5, label: "Viernes" },
  ];

  return (
    <section className="form-section">
      <h2>
        {editFormGym ? "EDITAR CLASE DE GIMNASIO" : "CREAR CLASE DE GIMNASIO"}
      </h2>
      <Form className="form-group" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formGroupActivity">
          <Controller
            name="IdActivity"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className="input-form"
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={optionsActivities}
                styles={customStyles}
                placeholder="Selecciona una actividad"
                onChange={(selectedOption) => {
                  setActivitySelected(selectedOption);
                  field.onChange(selectedOption);
                }}
                value={activitySelected}
              />
            )}
          />
          {errors.IdActivity && (
            <span className="alert" role="alert">
              {errors.IdActivity.message}
            </span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupTrainer">
          <Controller
            name="IdTrainerActivity"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={optionsTrainers}
                value={trainerSelected}
                onChange={(selectedOption) => {
                  setTrainerSelected(selectedOption);
                  field.onChange(selectedOption.value);
                }}
                styles={customStyles}
                components={animatedComponents}
                placeholder="Selecciona un entrenador"
              />
            )}
          />
          {errors.IdTrainerActivity && (
            <span className="alert" role="alert">
              {errors.IdTrainerActivity.message}
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
        <Form.Group className="mb-3" controlId="formGroupDays">
          <Controller
            name="Days"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={daysOptions}
                value={daysOptions.find(
                  (option) => option.value === field.value
                )}
                onChange={(selectedOption) => {
                  field.onChange(selectedOption.value);
                }}
                styles={customStyles}
                components={animatedComponents}
                placeholder="Selecciona un día"
              />
            )}
          />
          {errors.Days && (
            <span className="alert" role="alert">
              {errors.Days.message}
            </span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupTimeClass">
          <Form.Control
            className="input-form"
            onFocus={() => clearErrors("TimeClass")}
            {...register("TimeClass")}
            type="time"
            placeholder="Horario"
          />
          {errors.TimeClass && (
            <span className="alert" role="alert">
              {errors.TimeClass.message}
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
