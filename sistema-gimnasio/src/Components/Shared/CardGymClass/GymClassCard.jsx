import React from 'react';
import { Button } from 'react-bootstrap';
import { deleteGymClass } from '../../GymClass/GymClassServices';
import './GymClassCard.css';  

const CardGymClass = ({ entity, setChanges, changes }) => {
    const { IdGymClass, TrainerActivity, TimeClass, Days, Capacity } = entity;
    const trainerName = TrainerActivity?.Trainer?.Name || 'Unknown Trainer';
    const activityName = TrainerActivity?.ActivityName || 'Unknown Activity';

    const handleDelete = async () => {
        try {
            await deleteGymClass(IdGymClass);
            setChanges(!changes);
        } catch (error) {
            console.error('Failed to delete gym class', error);
        }
    };

    return (
        <div className="card-gymclass">
            <h5 className="card-title">{activityName}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{trainerName}</h6>
            <p className="card-text">
                <strong>Día:</strong> {Days} <br />
                <strong>Horario:</strong> {TimeClass} <br />
                <strong>Cupo:</strong> {Capacity}
            </p>
            <Button variant="danger" onClick={handleDelete}>
                Eliminar
            </Button>
        </div>
    );
};

export default CardGymClass;
