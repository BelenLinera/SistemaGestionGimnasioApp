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
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  const fetchGymClassesAndReserves = async () => {
    try {
      const [gymClassesResponse, reservesResponse] = await Promise.all([
        getAllGymClasses(),
        getAllReserves(),
      ]);
      processGymClasses(gymClassesResponse.data, reservesResponse.data);
    } catch (error) {
      console.log("Error trayendo las clases", error);
    } finally {
      setLoading(false);
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

        if (user.role === 'Client') {
          return processClientRole(gymclass, reservesForClass, classDateTime, formattedDate);
        } else if (user.role === 'Trainer') {
          return processTrainerRole(gymclass, reservesForClass, classDateTime, formattedDate);
        }

        return null;
      })
      .filter((gymclass) => gymclass && gymclass.datetime >= today && gymclass.datetime <= sevenDaysLater);

    setGymClasses(processedClasses);
  };

  const processClientRole = (gymclass, reservesForClass, classDateTime, formattedDate) => {
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
  };

  const processTrainerRole = (gymclass, reservesForClass, classDateTime, formattedDate) => {
    if (gymclass.trainerActivity.trainer.email === user.email) {
      return {
        ...gymclass,
        datetime: classDateTime,
        datetimeString: formattedDate,
        reservesForClass: reservesForClass,
        reserveCount: reservesForClass.length
      };
    }
    return null;
  };

  useEffect(() => {
    fetchGymClassesAndReserves();
  }, [changes]);

  if (loading) {
    return <div>Cargando...</div>;
  }


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
