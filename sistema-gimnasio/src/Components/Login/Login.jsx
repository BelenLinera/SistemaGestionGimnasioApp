import React, { useContext } from "react";
import {Form, Button} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate,Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserContext from "../Context/UserContext";
import api from "../../api";
import "./Login.css";

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
    try {
      const response = await api.post("/api/Authenticate", {
        Email: data.email,
        Password: data.password,
      });
      login(response.data);
      return navigate("/", { replace: true });
    } catch (error) {
      console.log("Error:", error);
    }
  };
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
      <div>
        <div className="forget-password">
          No tenes cuenta? <Link  to="/login">Registrate</Link>
        </div>
        <div className="forget-password">
          Olvidaste tu contraseña? <Link to="/forget-password">Recuperar</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
