import React, { useEffect, useState, useContext } from "react";
import { addDays, setHours, setMinutes, format } from "date-fns";
import CardGymClass from "../Shared/CardGymClass/GymClassCard";
import { getAllGymClasses } from "../GymClass/GymClassServices";
import { getAllReserves } from "../Reserve/ReserveService";
import UserContext from "../Context/UserContext";
import { UseAxiosLoader } from "../../Hooks/UseAxiosLoader";
import "./Reserve.css";
import Spinner from "react-bootstrap/Spinner";

const Reserve = () => {
  const [gymClasses, setGymClasses] = useState([]);
  const [changes, setChanges] = useState([]);
  const { loading, sendRequest } = UseAxiosLoader();
  const { user } = useContext(UserContext);

  const fetchGymClassesAndReserves = async () => {
    try {
      // const [gymClassesResponse, reservesResponse] = await Promise.all([
      //   getAllReserves(),
      //   getAllGymClasses(sendRequest),
      // ]);
      const reservesResponse = await getAllReserves();
      const gymClassesResponse = await getAllGymClasses(sendRequest);
      processGymClasses(gymClassesResponse.data, reservesResponse.data);
    } catch (error) {
      console.log("Error trayendo las clases", error);
    }
  };

  const processGymClasses = (gymClassesData, reservesData) => {
    const today = new Date();
    const sevenDaysLater = addDays(today, 7);

    const processedClasses = gymClassesData
      .map((gymclass) => {
        const daysOffset = (gymclass.days - today.getDay() + 7) % 7;
        const classDate = addDays(today, daysOffset);
        const [hours, minutes] = gymclass.timeClass.split(":").map(Number);
        const classDateTime = setHours(setMinutes(classDate, minutes), hours);
        const formattedDate = format(classDate, "dd/MM/yyyy");

        const reservesForClass = reservesData.filter(
          (reserve) => reserve.idGymClass === gymclass.idGymClass
        );

        if (user.role === "Client") {
          return processClientRole(
            gymclass,
            reservesForClass,
            classDateTime,
            formattedDate
          );
        } else if (user.role === "Trainer") {
          return processTrainerRole(
            gymclass,
            reservesForClass,
            classDateTime,
            formattedDate
          );
        } else if (user.role === "Admin") {
          return {
            ...gymclass,
            datetime: classDateTime,
            datetimeString: formattedDate,
            reservesForClass: reservesForClass,
            reserveCount: reservesForClass.length,
          };
        }
        return null;
      })
      .filter(
        (gymclass) =>
          gymclass &&
          gymclass.datetime >= today &&
          gymclass.datetime <= sevenDaysLater
      );

    setGymClasses(processedClasses);
  };

  const processClientRole = (
    gymclass,
    reservesForClass,
    classDateTime,
    formattedDate
  ) => {
    const isReserved = reservesForClass.some(
      (reserve) => reserve.clientEmail === user.email
    );

    const userReserve = reservesForClass.find(
      (reserve) => reserve.clientEmail === user.email
    );

    return {
      ...gymclass,
      datetime: classDateTime,
      datetimeString: formattedDate,
      idReserve: userReserve ? userReserve.id : null,
      reserved: isReserved,
      reserveCount: reservesForClass.length,
      canBeCancelled: true,
    };
  };

  const processTrainerRole = (
    gymclass,
    reservesForClass,
    classDateTime,
    formattedDate
  ) => {
    if (gymclass.trainerActivity.trainer.email === user.email) {
      return {
        ...gymclass,
        datetime: classDateTime,
        datetimeString: formattedDate,
        reservesForClass: reservesForClass,
        reserveCount: reservesForClass.length,
      };
    }
    return null;
  };

  useEffect(() => {
    fetchGymClassesAndReserves();
  }, [changes]);

  return (
    <section className="reserve-section">
      <h2>RESERVAS SEMANALES</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : gymClasses.length > 0 ? (
        gymClasses.map((gymclass) => (
          <CardGymClass
            key={gymclass.idGymClass}
            entity={gymclass}
            showDay={true}
            setChanges={setChanges}
            changes={changes}
          />
        ))
      ) : (
        <p>
          {user?.role === "Trainer"
            ? "No tienes clases asignadas."
            : "No hay clases disponibles."}
        </p>
      )}
    </section>
  );
};

export default Reserve;
