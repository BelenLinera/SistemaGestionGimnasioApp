import React, { useEffect, useState} from "react";
import { addDays, setHours, setMinutes, format } from "date-fns";
import CardGymClass from "../Shared/CardGymClass/GymClassCard";
import { getAllGymClasses } from "../GymClass/GymClassServices";
import { getAllReserves } from "../Reserve/ReserveService";
import "./Reserve.css";

const Reserve = () => {
  const [gymClasses, setGymClasses] = useState([]);
  const [changes, setChanges] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchGymClassesAndReserves = async () => {
    try {
      const [gymClassesResponse, reservesResponse] = await Promise.all([
        getAllGymClasses(),
        getAllReserves(),
      ]);
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
        console.log(gymclass);
        const isCancelled = gymclass.cancelledDates.some(
          (cancelledDate) =>
            format(new Date(cancelledDate.cancelledDate), "dd/MM/yyyy") === formattedDate
        );
  
        if (isCancelled) {
          return null;
        }
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
      })
      .filter(
        (gymclass) =>
          gymclass &&
          gymclass.datetime >= today &&
          gymclass.datetime <= sevenDaysLater
      );

      setGymClasses(processedClasses.filter(Boolean));
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
      <div className="reserve-container-card"> 
      {gymClasses.length > 0 ? (
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
      </div> 
    </section>
  );
};

export default Reserve;
