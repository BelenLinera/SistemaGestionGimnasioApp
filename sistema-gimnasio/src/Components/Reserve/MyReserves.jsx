import React, { useEffect, useState } from "react";
import { getMyReserves } from "./ReserveService";
import { format, isAfter, parseISO } from "date-fns";
import CardGymClass from "../Shared/CardGymClass/GymClassCard";
import { UseAxiosLoader } from "../../Hooks/UseAxiosLoader";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "./Reserve.css";

const MyReserves = () => {
  const [gymClasses, setGymClasses] = useState([]);
  const [changes, setChanges] = useState([]);
  const { loading, sendRequest } = UseAxiosLoader();

  const fetchGymClassesAndReserves = async () => {
    try {
      const reservesResponse = await getMyReserves(sendRequest);
      const gymClasses = reservesResponse.data.map((reserve) => {
        const classDate = parseISO(reserve.dateClass);
        const classTime = reserve.gymClass.timeClass.split(":").map(Number);
        const classDateTime = new Date(
          classDate.setHours(classTime[0], classTime[1])
        );
        const formattedDate = format(classDateTime, "dd/MM/yyyy");
        const canBeCancelled = isAfter(new Date(), classDateTime);
        return {
          ...reserve,
          datetime: reserve.gymClass.timeClass,
          datetimeString: formattedDate,
          idReserve: reserve.id,
          reserved: true,
          trainerActivity: reserve.gymClass.trainerActivity,
          dayName: reserve.gymClass.dayName,
          timeClass: reserve.gymClass.timeClass,
          canBeCancelled: !canBeCancelled,
        };
      });
      setGymClasses(gymClasses);
    } catch (error) {
      toast.error("Error trayendo las reservas");
    }
  };
  useEffect(() => {
    fetchGymClassesAndReserves();
  }, [changes]);

  return (
    <section className="reserve-section">
      <h2>MIS RESERVAS</h2>
      {loading && (
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      )}
      {gymClasses.length === 0 && !loading && (
        <p>No tienes reservas todavía</p>
      )}
      <div className="reserve-container-card">
        {gymClasses.map((gymclass) => (
          <CardGymClass
            key={gymclass.idReserve}
            entity={gymclass}
            showDay={true}
            setChanges={setChanges}
            changes={changes}
          />
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default MyReserves;
