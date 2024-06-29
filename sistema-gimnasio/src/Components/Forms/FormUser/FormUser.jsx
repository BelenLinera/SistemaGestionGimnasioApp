import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createAdmin,
  getAdminByEmail,
  updateAdmin,
} from "../../Admin/AdminServices";
import {
  createClient,
  getClientByEmail,
  updateClient,
} from "../../Client/ClientServices";
import {
  createTrainer,
  getTrainerByEmail,
  updateByEmail,
} from "../../Trainer/TrainerServices";
import "./FormUser.css";
import { getAllActivities } from "../../Activity/ActivityServices";
import { UseAxiosLoader } from "../../../Hooks/UseAxiosLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ])*$/,
      "La contraseña debe contener al menos una letra minúscula, una mayúscula y un número"
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

const ENTITY_URL_MAP = {
  admin: "/admin",
  client: "/client",
  trainer: "/trainer",
};

const FormUser = ({ entity, editForm }) => {
  const navigate = useNavigate();
  const [optionsActivities, setOptionsActivities] = useState([]);
  const { sendRequest } = UseAxiosLoader();
  const { userEmail } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    control,
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(editForm ? editUserSchema : createUserSchema),
  });

  useEffect(() => {
    if (entity === "trainer") {
      const fetchActivities = async () => {
        try {
          const response = await getAllActivities(sendRequest);
          const mappedActivities = response.data.map((activity) => ({
            value: activity.idActivity,
            label: activity.activityName,
          }));
          setOptionsActivities(mappedActivities);
        } catch (error) {
          toast.error("Error tayendo las clases");
        }
      };
      fetchActivities();
    }
    if (userEmail) {
      const fetchDataUser = async () => {
        const dataEditUser = await getDataUser(userEmail);
        const user = dataEditUser.data;
        setValue("firstName", user.name);
        setValue("lastname", user.lastName);
        entity === "trainer" &&
          setValue(
            "activities",
            user.trainerActivities.map((activity) => activity.idActivity)
          );
      };
      fetchDataUser();
    }
  }, []);

  const handleFormSubmit = async (data) => {
    try {
      if (editForm) {
        await handleEdit(data);
      } else {
        await handleCreate(data);
      }
      setTimeout(() => {
        entity
          ? navigate(ENTITY_URL_MAP[entity], { replace: true })
          : navigate("/login", { replace: true });
      }, 3000);
    } catch (error) {
      toast.error("Error trayendo las actividades");
    }
  };
  const getDataUser = async (email) => {
    switch (entity) {
      case "admin":
        return await getAdminByEmail(email);
      case "client":
        return await getClientByEmail(email);
      case "trainer":
        return await getTrainerByEmail(email);
      default:
        break;
    }
  };
  const handleEdit = async (data) => {
    switch (entity) {
      case "admin":
        await updateAdmin(userEmail, data.firstName, data.lastname);
        toast.success("Administrador actualizado con exito");
        break;
      case "client":
        await updateClient(userEmail, data.firstName, data.lastname);
        toast.success("Cliente actualizado con exito");
        break;
      case "trainer":
        await updateByEmail(
          userEmail,
          data.firstName,
          data.lastname,
          data.activities
        );
        toast.success("Entrenador actualizado con exito");
        break;
      default:
        throw new Error("Unknown entity type");
    }
  };

  const handleCreate = async (data) => {
    switch (entity) {
      case "admin":
        await createAdmin(
          data.email,
          data.firstName,
          data.lastname,
          data.password
        );
        toast.success("Administrador creado con exito");
        break;
      case "client":
        await createClient(
          data.email,
          data.firstName,
          data.lastname,
          data.password
        );
        toast.success("Cliente creado con exito");
        break;
      case "trainer":
        await createTrainer(
          data.email,
          data.firstName,
          data.lastname,
          data.password,
          data.activities
        );
        toast.success("Entrenador creado con exito");
        break;
      default:
        await createClient(
          data.email,
          data.firstName,
          data.lastname,
          data.password
        );
    }
  };
  return (
    <section className="form-section">
      <h2>
        {editForm
          ? "EDITAR CUENTA"
          : entity
          ? "CREAR " +
            (entity === "admin"
              ? "ADMIN"
              : entity === "client"
              ? "CLIENTE"
              : entity === "trainer" && "ENTRENADOR")
          : "CREAR CUENTA"}
      </h2>

      <Form className="form-group" onSubmit={handleSubmit(handleFormSubmit)}>
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
        {entity === "trainer" && (
          <Form.Group className="mb-3" controlId="formGroupActivities">
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
                    field.onChange(
                      selectedOptions.map((option) => option.value)
                    );
                  }}
                />
              )}
            />
          </Form.Group>
        )}
        {!editForm && (
          <>
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
          </>
        )}
        <Button variant="light" className="button-form" type="submit">
          {editForm ? "Editar" : !entity ? "Registrarse" : "Crear cuenta"}
        </Button>
      </Form>
      {!entity && (
        <div className="have-account">¿Ya tienes cuenta? Inicia sesión</div>
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default FormUser;
