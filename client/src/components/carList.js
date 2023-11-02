import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { DataTable } from 'primereact/datatable';
//import { Column } from 'primereact/column';

const CarList = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/car/getall")
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
      })
      .catch((error) => {
        console.log("error al obtener lista de carros", error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este vehículo?")) {
      // Realiza una solicitud DELETE a la API para eliminar el vehículo con el ID proporcionado
      fetch(`http://localhost:5000/api/car/delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 204) {
            console.log("Carro eliminado con éxito");
            // Actualiza la lista de vehículos
            setCars(cars.filter((car) => car.id !== id));
          } else {
            console.error("Error en la eliminación del Carro");
          }
        })
        .catch((error) => {
          console.error("Error en la eliminación del Carro", error);
        });
    }
  };

  const navigate = useNavigate(); // Obtén el objeto history para navegación

  const handleUpdate = (id) => {
    navigate(`/api/car/update/${id}`);
  };

  return (
      <div >
        <h2 className="d-flex justify-content-center align-items-center">Listado de Vehiculos</h2>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Placa</th>
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col"></th>
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
                    class="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(car._id)}
                  >
                    Eliminar
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-outline-info btn-sm"
                    onClick={() => handleUpdate(car._id)}
                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default CarList;
