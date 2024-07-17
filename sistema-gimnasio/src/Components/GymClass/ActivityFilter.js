import React from "react";
import Select from "react-select";

const ActivityFilter = ({ activities, selectedActivity, onActivityChange }) => {
  const options = [
    { value: "", label: "Todas las Actividades" }, // Opción para mostrar todas las actividades
    ...activities,
  ];

  return (
    <div className="mb-3">
      <label className="form-label">Filtrar por Actividad</label>
      <Select
        options={options}
        value={options.find((activity) => activity.value === selectedActivity)}
        onChange={(selectedOption) => onActivityChange(selectedOption.value)}
        placeholder="Selecciona una actividad"
      />
    </div>
  );
};

export default ActivityFilter;
