// Reserve.js
import React, { useEffect, useState } from "react";
import { addDays, setHours, setMinutes, format } from "date-fns";
import CardGymClass from "../Shared/CardGymClass/GymClassCard";
import { getAllGymClasses } from "../GymClass/GymClassServices";
import { getAllReserves } from "../Reserve/ReserveService";
import { UseAxiosLoader } from "../../Hooks/UseAxiosLoader";
import Spinner from "react-bootstrap/Spinner";
import "./Reserve.css";
import { ToastContainer, toast } from "react-toastify";
import ActivityFilter from "../GymClass/ActivityFilter";

const Reserve = () => {
  const [gymClasses, setGymClasses] = useState([]);
  const [changes, setChanges] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const { loading, sendRequest } = UseAxiosLoader();
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchGymClassesAndReserves = async () => {
    try {
      const reservesResponse = await getAllReserves();
      const gymClassesResponse = await getAllGymClasses(sendRequest);
      processGymClasses(gymClassesResponse.data, reservesResponse.data);
    } catch (error) {
      toast.error("Error trayendo las clases");
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

        const isCancelled = gymclass.cancelledDates.some(
          (cancelledDate) =>
            format(new Date(cancelledDate.cancelledDate), "dd/MM/yyyy") ===
            formattedDate
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

        return null;
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

  useEffect(() => {
    const uniqueActivities = getUniqueActivities(gymClasses);
    setActivities(uniqueActivities);
  }, [gymClasses]);

  const getUniqueActivities = (classes) => {
    const activitySet = new Set();
    classes.forEach((gymClass) => {
      activitySet.add(gymClass.trainerActivity.activity.activityName);
    });
    return Array.from(activitySet).map((activityName) => ({
      value: activityName,
      label: activityName,
    }));
  };

  const filterClassesByActivity = (activityName) => {
    setSelectedActivity(activityName);
  };

  const filteredClasses = selectedActivity
    ? gymClasses.filter(
        (gymClass) =>
          gymClass.trainerActivity.activity.activityName === selectedActivity
      )
    : gymClasses;

  return (
    <section className="reserve-section">
      <h2>RESERVAS SEMANALES</h2>
      <div className="reserve-activities-filter">
        <ActivityFilter
          activities={activities}
          selectedActivity={selectedActivity}
          onActivityChange={filterClassesByActivity}
        />
      </div>
      {gymClasses.length === 0 && !loading && (
        <p>
          {user?.role === "Trainer"
            ? "No tienes clases asignadas."
            : "No hay clases disponibles para reservas."}
        </p>
      )}
      <div className="reserve-container-card">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          filteredClasses.map((gymclass) => (
            <CardGymClass
              key={gymclass.idGymClass}
              entity={gymclass}
              showDay={true}
              setChanges={setChanges}
              changes={changes}
            />
          ))
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default Reserve;
