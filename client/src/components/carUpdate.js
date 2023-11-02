import React, { useState, useEffect } from 'react';
import { useParams,useNavigate} from 'react-router-dom';

function CarUpdate({ props }) {

  const {id}=useParams();
  const [car, setCar] = useState({});
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    plate: '',
  });

  useEffect(() => {
    // Realiza una solicitud GET a la API para obtener los detalles del vehículo con el ID proporcionado en la URL
    fetch(`http://localhost:5000/api/car/getone/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCar(data);
        setFormData(data); // Rellena el formulario con los datos del vehículo
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del vehículo', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Realiza una solicitud PUT a la API para actualizar los datos del vehículo
    fetch(`http://localhost:5000/api/car/update/${id}`, {
      method: 'PUT', // O 'PATCH' si prefieres
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Edición exitosa', data);
        navigate(`/api/car/getall`);
        // Redirige al usuario a la página de listado de vehículos u otra página
      })
      .catch((error) => {
        console.error('Error en la edición del vehículo', error);
      });
  };

  return (
    <div>
      <h2 className="d-flex justify-content-center align-items-center">
        Actualizar Vehiculo
      </h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Marca
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Modelo
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Placa
          </label>
          <input
            type="text"
            name="plate"
            value={formData.plate}
            onChange={handleInputChange}
            class="form-control"
          />
        </div>
        <button type="submit" class="btn btn-primary">
        Guardar Cambio
        </button>
      </form>
    </div>
  );
}

export default CarUpdate ;

