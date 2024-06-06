import React, { useState, useEffect } from 'react';
import { getAllGymClasses } from './GymClassServices';  
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./GymClass.css";  
import CardGymClass from '../Shared/CardGymClass/GymClassCard';  

const GymClass = () => {
    const [gymClasses, setGymClasses] = useState([]);
    const [changes, setChanges] = useState([]);
    
    useEffect(() => {
        getAllGymClasses().then((response) => {
            setGymClasses(response.data);
        });
    }, [changes]);

    return (
        <section className="gymclass-section">
            <h2>CLASES DEL GIMNASIO</h2>
            <Link to="/gymclass/create-gymclass">
                <Button variant="light" className="button-gymclass">
                    + Nueva clase
                </Button>
            </Link>
            {gymClasses.map((gymClass) => (
                <CardGymClass
                    entity={gymClass}
                    type={"gymclass"}
                    key={gymClass.IdGymClass}
                    setChanges={setChanges}
                    changes={changes}
                />
            ))}
        </section>
    );
};

export default GymClass;