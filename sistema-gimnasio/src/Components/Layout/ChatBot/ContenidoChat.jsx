import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";



class ContenidoChat extends Component {
  render() {
    return (
      <ChatBot
        steps={[
          {
            id: "1",
            message: "Hola. Me gustaria ayudarte. Como te llamas?",
            trigger: "2",
          },
          {
            id: "2",
            user: true,
            validator: (value) => {
              if (/^[a-zA-Z]{1,15}$/.test(value)) {
                return true;
              } else {
                return "Por favor, ingresa un nombre correcto.";
              }
            },
            trigger: "3",
          },
          {
            id: "3",
            message: "Hola {previousValue}, un placer conocerte!",
            trigger: "4",
          },
          {
            id: "4",
            message:
              "Estoy aqui para resolver tus dudas, en que puedo ayudarte?",
            trigger: "5",
          },
          {
            id: "5",
            options: [
              { value: "clase", label: "Clases", trigger: "5A" },
              { value: "reserva", label: "Reservas", trigger: "5B" },
              { value: "actividad", label: "Actividades", trigger: "5C" },
            ],
          },
          {
            id: "5A",
            message:
              "Veo que necesitas ayuda con las clases. Que necesitas saber?",
            trigger: "seleccionClases",
          },
          {
            id: "5B",
            message:
              "Veo que necesitas ayuda con las reservas. Que necesitas saber?",
            trigger: "seleccionReservas",
          },
          {
            id: "5C",
            message:
              "Veo que necesitas ayuda con las actividades. Que necesitas saber?",
            trigger: "seleccionActividades",
          },
          {
            id: "seleccionClases",
            options: [
              { value: "preg-clase1", label: "Que clases estan disponibles?", trigger: "6A" },
              { value: "preg-clase2", label: "Los sabados hay clases disponible?", trigger: "6AA" },
            ],
          },
          {
            id: "seleccionReservas",
            options: [
              { value: "preg-reserva1", label: "Como hago para realizar una reserva?", trigger: "6B" },
              { value: "preg-reserva2", label: "Donde visualizo mis reservas?", trigger: "6BB" },
            ],
          },
          {
            id: "seleccionActividades",
            options: [
              { value: "preg-act1", label: "Donde visualizo las actividades disponibles?", trigger: "6C" },
              { value: "preg-act2", label: "Hay actividades especiales para niños?", trigger: "6CC" },
            ],
          },
          {
            id: "6A",
            message: "Las clases disponibles las podes visualizar en la seccion clases, que se encuentra en el menu principal. Te puedo ayudar con algo más?",
            trigger: "7",
          },
          {
            id: "6AA",
            message: "No, solo los dias lunes, martes, miercoles, jueves y viernes. Te puedo ayudar con algo más?",
            trigger: "7",
          },
          {
            id: "6B",
            message: "Para reservar una clase tenes que ir a la seccion de clases y hacer click sobre el boton reservar. Te puedo ayudar con algo más?",
            trigger: "7",
          },
          {
            id: "6BB",
            message: "Para visualizar tus reservas tenes que ir a la seccion de reservas que se encuentra en el menu principal. Te puedo ayudar con algo más?",
            trigger: "7",
          },
          {
            id: "6C",
            message: "Para visualizar las actividades disponibles tenes que ir a la seccion de actividades que se encuentra en el menu principal. Te puedo ayudar con algo más?",
            trigger: "7",
          },
          {
            id: "6CC",
            message: "No, por el momento no tenemos actividades especiales para niños. Te puedo ayudar con algo más?",
            trigger: "7",
          },
          {
            id: "7",
            options: [
              { value: "si", label: "Sí", trigger: "5" },
              { value: "no", label: "No", trigger: "final" },
            ],
          },
          {
            id: "final",
            message: "Gracias por usar el servicio de chat. Si tenes otra duda comunicate con el administrador belen.linera@gmail.com ¡Hasta luego!",
            end: true,
          },
        ]}
      />
    );
  }
} export default ContenidoChat;
