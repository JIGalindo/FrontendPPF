import React, { useState } from "react";

const CarRegistration = () => {
  const [carData, setcarData] = useState({
    brand: "",
    model: "",
    plate: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setcarData({
      ...carData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });

      if (response.status === 201) {
        // La solicitud fue exitosa (código de respuesta 201)
        console.log("Registro exitoso");
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
        Registro de Vehículos
      </h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Marca
          </label>
          <input
            type="text"
            name="brand"
            value={carData.brand}
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
            value={carData.model}
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
            value={carData.plate}
            onChange={handleInputChange}
            class="form-control"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Registrar Vehiculo
        </button>
      </form>
    </div>
  );
};

export default CarRegistration;
