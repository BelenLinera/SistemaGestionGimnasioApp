import React, { useEffect, useState } from 'react';
import { addDays, setHours, setMinutes, format } from 'date-fns';
import "./Reserve.css";
import CardGymClass from '../Shared/CardGymClass/GymClassCard';
import { getAllGymClasses } from '../GymClass/GymClassServices';

const Reserve = () => {
  const [gymClasses, setGymClasses] = useState([]);

  useEffect(() => {
    const fetchGymClasses = async () => {
      try {
        const response = await getAllGymClasses();
        const today = new Date();
        const sevenDaysLater = addDays(today, 7);

        console.log("Datos recibidos:", response.data);

        const classesWithDateTime = response.data.map(gymclass => {
          const daysOffset = (gymclass.days - today.getDay() + 7) % 7;
          const classDate = addDays(today, daysOffset);
          const [hours, minutes] = gymclass.timeClass.split(':').map(Number);
          const classDateTime = setHours(setMinutes(classDate, minutes), hours);

          // Formatear la fecha para mostrar
          const formattedDate = format(classDate, 'dd/MM/yyyy');

          return { 
            ...gymclass, 
            datetime: classDateTime,
            datetimeString: formattedDate
          };
        }).filter(gymclass => {
          return gymclass.datetime >= today && gymclass.datetime <= sevenDaysLater;
        });

        console.log("Clases con datetime:", classesWithDateTime);

        setGymClasses(classesWithDateTime);
      } catch (error) {
        console.error("Error fetching gym classes", error);
      }
    };

    fetchGymClasses();
  }, []);

  return (
    <div>
      {gymClasses.map((gymclass) => (
        <CardGymClass 
          key={gymclass.idGymClass} 
          entity={gymclass} 
          showDay={true} 
        />
      ))}
    </div>
  );
};

export default Reserve;
