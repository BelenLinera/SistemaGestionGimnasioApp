import React, {useEffect, useState } from "react";
import { getMyReserves } from "./ReserveService";
import {
  format,
  isAfter,
  parseISO,
} from "date-fns";
import CardGymClass from "../Shared/CardGymClass/GymClassCard";
import { ToastContainer, toast } from "react-toastify";

const MyReserves = () => {
  const [gymClasses, setGymClasses] = useState([]);
  const [changes, setChanges] = useState([]);
  const fetchGymClassesAndReserves = async () => {
    try {
      const reservesResponse = await getMyReserves();
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
      toast.error("Error trayendo las reservas")
    }
  };
  useEffect(() => {
    fetchGymClassesAndReserves();
  }, [changes]);

  return (
    <section className="reserve-section">
      <h2>MIS RESERVAS</h2>
      {gymClasses.map((gymclass) => (
        <CardGymClass
          key={gymclass.idReserve}
          entity={gymclass}
          showDay={true}
          setChanges={setChanges}
          changes={changes}
        />
      ))}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default MyReserves;
