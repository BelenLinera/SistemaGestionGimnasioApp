import React, { useEffect, useState, useContext } from "react";
import { addDays, setHours, setMinutes, format } from "date-fns";
import "./Reserve.css";
import CardGymClass from "../Shared/CardGymClass/GymClassCard";
import { getAllGymClasses } from "../GymClass/GymClassServices";
import { getAllReserves } from "../Reserve/ReserveService";
import UserContext from "../Context/UserContext";

const Reserve = () => {
  const [gymClasses, setGymClasses] = useState([]);
  const [changes, setChanges] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchGymClassesAndReserves = async () => {
      try {
        const [gymClassesResponse, reservesResponse] = await Promise.all([
          getAllGymClasses(),
          getAllReserves(),
        ]);

        const today = new Date();
        const sevenDaysLater = addDays(today, 7);

        const classesWithDateTime = gymClassesResponse.data
          .map((gymclass) => {
            const daysOffset = (gymclass.days - today.getDay() + 7) % 7;
            const classDate = addDays(today, daysOffset);
            const [hours, minutes] = gymclass.timeClass.split(":").map(Number);
            const classDateTime = setHours(
              setMinutes(classDate, minutes),
              hours
            );

            // Formatear la fecha para mostrar
            const formattedDate = format(classDate, "dd/MM/yyyy");

            // Contar las reservas para esta clase
            const reservesForClass = reservesResponse.data.filter(
              (reserve) => reserve.idGymClass === gymclass.idGymClass
            );
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
            };
          })
          .filter((gymclass) => {
            return (
              gymclass.datetime >= today && gymclass.datetime <= sevenDaysLater
            );
          });

        setGymClasses(classesWithDateTime);
      } catch (error) {
        console.log("Error trayendo las clases", error);
      }
    };

    fetchGymClassesAndReserves();
  }, [changes, user.email]);

  return (
    <section className="reserve-section">
      <h2>RESERVAS SEMANALES</h2>
      {gymClasses.map((gymclass) => (
        <CardGymClass
          key={gymclass.idGymClass}
          entity={gymclass}
          showDay={true}
          setChanges={setChanges}
          changes={changes}
        />
      ))}
    </section>
  );
};

export default Reserve;
