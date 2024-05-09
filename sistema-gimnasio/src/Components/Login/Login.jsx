import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Login.css";
import api from "../../api";
import { useForm } from "react-hook-form";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
const loginSchema = yup.object({
  email: yup
    .string()
    .required("El email es requerido")
    .email("Formato de mail invalido"),
  password: yup.string().required("La contrasena es requerida"),
});
const Login = () => {
  let navigate = useNavigate();
  const { login } = useContext(UserContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });
  const LoginUser = async (data) => {
    const response = await api
      .post("/api/Autheticate", {
        Email: data.email,
        Password: data.password,
      })
      console.log(response.data)
        login(response.data)
        return navigate("/", { replace: true });
  };
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  return (
    <section className="login-section">
      <h2>BIENVENIDO/A</h2>
      <Form className="login-form-group" onSubmit={handleSubmit(LoginUser)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            className="input-login"
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
            className="input-login"
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
        <Button variant="light" className="button-login" type="submit">
          Iniciar sesión
        </Button>
      </Form>
      <div className="forget-password">
        No tenes cuenta? <a href="">Registrate</a>
      </div>
    </section>
  );
};

export default Login;
