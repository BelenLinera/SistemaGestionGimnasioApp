import React, { useState, useEffect, useContext } from 'react';
import { getAllGymClasses } from './GymClassServices';  
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./GymClass.css";  
import CardGymClass from '../Shared/CardGymClass/GymClassCard';  
import { ThemeContext } from '../Context/ThemeContext';

const GymClass = () => {
    const [gymClasses, setGymClasses] = useState([]);
    const {theme} = useContext(ThemeContext)
    
    const [changes, setChanges] = useState([]);
    
    useEffect(() => {
        getAllGymClasses().then((response) => {
            setGymClasses(response.data);
        });
    }, [changes]);

    return (
        <section className="gymclass-section">
            <h2>CLASES DEL GIMNASIO</h2>
            <Link to="/gym-class/create-gym-class">
                <Button variant="light" className={theme === "dark" ? 'button-gymclass-dark' : 'button-gymclass-light'}>
                    + Nueva clase
                </Button>
            </Link>
            {gymClasses.map((gymClass) => (
                <CardGymClass
                    entity={gymClass}
                    type={"gymclass"}
                    key={gymClass.idGymClass}
                    setChanges={setChanges}
                    changes={changes}
                />
            ))}
        </section>
    );
};

export default GymClass;
