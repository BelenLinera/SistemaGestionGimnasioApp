import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserContext from "../Context/UserContext";
import api from "../../api";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from '../Context/ThemeContext';

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
  const {theme} = useContext(ThemeContext)
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
      toast.success("Inicio de sesión exitoso");
      setTimeout(() => {
        return navigate("/", { replace: true });
      }, 3000);
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <section className={theme === "dark" ? 'login-section-dark' : 'login-section-light'}>
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
          No tenes cuenta? <Link to="/register">Registrate</Link>
        </div>
        <div className="forget-password">
          Olvidaste tu contraseña? <Link to="/forget-password">Recuperar</Link>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default Login;
