import React, { useState } from "react";
import { useParams } from "react-router-dom";

function EntryExit({ props }) {
  const { id } = useParams();
  const [data, setData] = useState({
    driver: "",
    mileage: 0,
    description: "Entrada",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/recordcreate/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 201) {
        // La solicitud fue exitosa (código de respuesta 201)
        console.log("Registro exitoso");
        console.log(id);
      } else {
        // La solicitud no fue exitosa
        console.error("Error en la solicitud");
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
    }
  };

  return (
    <div>
      <h2 className="d-flex justify-content-center align-items-center">
        Registro de Entradas y Salidas
      </h2>
      <form  onSubmit={handleSubmit}>
        <div class="mb-3">
          <label class="form-label">Motorista:</label>
          <input
            type="text"
            name="driver"
            value={data.driver}
            onChange={handleInputChange}
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Kilometraje:</label>
          <input
            type="number"
            name="mileage"
            value={data.mileage}
            onChange={handleInputChange}
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <select
            name="description"
            value={data.description}
            onChange={handleInputChange}
          >
            <option value="Entrada">Entrada</option>
            <option value="Salida">Salida</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default EntryExit;
