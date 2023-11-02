import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const CarListSearch= () => {
    const [cars, setCars] =useState([]);
    useEffect(() => {
      fetch('http://localhost:5000/api/car/getall')
      .then((response)=>response.json())
      .then((data)=>{
        setCars(data);
      })
      .catch((error)=>{
        console.log('error al obtener lista de carros',error)
      })
    
    }, []);

    const navigate = useNavigate();// Obtén el objeto history para navegación

    const handleCreate= (id) => {
      navigate(`/api/recordcreate/${id}`);
    }
  
    return (
    <div>
        <h2 className="d-flex justify-content-center align-items-center">Listado de Vehiculos</h2>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Placa</th>
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>{car.plate}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>
                  <button
                    class="btn btn-outline-info btn-sm"
                    onClick={() => handleCreate(car._id)}
                  >
                    Crear entrada/Salida
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    );
};

export default CarListSearch;
