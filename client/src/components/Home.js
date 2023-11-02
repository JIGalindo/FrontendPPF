import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="d-flex justify-content-center align-items-center">
        Registro de Vehiculos
      </h1>
      <div className="d-flex justify-content-center align-items-center">
        <div class="row row-cols-auto">
          <Link to={"/api/car/getall"}>
            <button type="button" class="btn btn-primary">
              Lista de Vehiculos
            </button>
          </Link>
          <Link to={"/api/car/"}>
            <button type="button" class="btn btn-primary">
              Nuevo Vehiculo
            </button>
          </Link>
          <Link to={"/api/recordSearch/"}>
            <button type="button" class="btn btn-success">
              Nueva Entrada/Salida
            </button>
          </Link>
          <Link to={"/api/record/getall"}>
            <button type="button" class="btn btn-success">
              Lista de Entrada/Salida
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
