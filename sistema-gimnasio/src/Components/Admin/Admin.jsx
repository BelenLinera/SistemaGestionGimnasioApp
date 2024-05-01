import React from 'react'
import { Button } from 'react-bootstrap'
import "./Admin.css"

const Admin = () => {
  return (
    <section className='admin-section'>
        <h2>ADMINISTRADORES</h2>
        <Button variant="light" className='button-admin'>Nuevo adminsitrador</Button>
        <div className="card-admin">
            <div className="card-admin-body">
            <h5 className='card-admin-logo'>Logo</h5>
            <h5 className="card-admin-name">Juan perez</h5>
            <h6 className="card-admin-email mb-2 text-body-secondary">juanperez@gmail.com</h6>
            <h6 className="buttons">
            <Button variant="light" className='button-update-admin'>Editar</Button>
            <Button variant="light" className='button-delete-admin'>Borrar</Button>
            </h6>
            </div>
        </div>
        
    </section>
  )
}

export default Admin


