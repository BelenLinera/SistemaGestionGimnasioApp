import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  createGymClass,
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
import "./GymClassForm.css";

const createGymClassSchema = yup.object({
  IdActivity: yup.object().required("La actividad del entrenador es requerida"),
  IdTrainerActivity: yup
    .number()
    .required("El entrenador es requerido"),
  Days: yup.number().required("Los días de la clase son requeridos"),
  TimeClass: yup.string().required("Los días de la clase son requeridos"),
  Capacity: yup
    .number("La capacidad debe ser un numero")
    .required("La capacidad de la clase es requerida")
    .positive("La capacidad no pude ser negativa")
    .integer("La capacidad debe ser un numero entero"),
});

const editGymClassSchema = yup.object({
  IdTrainerActivity: yup
    .number()
    .required("El ID de la actividad del entrenador es requerido"),
  TimeClass: yup.string().required("El horario de la clase es requerido"),
  Days: yup.number().required(),
  Capacity: yup
    .number()
    .required("La capacidad de la clase es requerida")
    .positive()
    .integer(),
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
  const [optionsTrainers, setOptionsTrainers] = useState([]);
  const [activitySelected, setActivitySelected] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
    control,
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(
      editFormGym ? editGymClassSchema : createGymClassSchema
    ),
  });

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getAllActivities();
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

    // if (editFormGym && id) {
    //   getGymClassById(id)
    //     .then((response) => {
    //       setInitialData(response.data);
    //       reset(response.data);
    //     })
    //     .catch((error) => {
    //       console.error('Error trayendo la clase del gimnasio', error);
    //     });
    // }
  }, []);

  useEffect(() => {
    console.log("usseEfect trainers")
    const fetchTrainers = async () => {
      try {
        const response = await getAllTrainers();
        const trainersOfActivitySelected = response.data.filter((trainer) =>
          trainer.trainerActivities.some(
            (activities) => activities.activity.idActivity === activitySelected
          )
        );
        const mappedTrainers = trainersOfActivitySelected.flatMap((trainer) =>
          trainer.trainerActivities
            .filter(
              (activities) => activities.activity.idActivity === activitySelected
            )
            .map((activity) => ({
              value: activity.idTrainerActivity,
              label: `${trainer.name} ${trainer.lastName}`,
            }))
        );
        setOptionsTrainers(mappedTrainers);
      } catch (error) {
        console.error("Error trayendo los entrenadores", error);
      }
    };

    if (activitySelected) {
      fetchTrainers(); 

      console.log("llamado a la api")
    }
  }, [activitySelected,setValue]);

  const onSubmit = async (data) => {
    try {
      if (editFormGym) {
        await updateGymClass(id, data);
      } else {
        console.log(data.IdTrainerActivity)
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
                  setActivitySelected(selectedOption.value);
                  field.onChange(selectedOption);
                }}
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
                value={optionsTrainers.find(
                  (option) => option.value === field.value
                )}
                onChange={(selectedOption) => {
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
