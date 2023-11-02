import React, { useState, useEffect } from 'react';

function EntryExitList() {
  const [entriesExits, setEntriesExits] = useState([]);
  const [filteredEntriesExits, setFilteredEntriesExits] = useState([...entriesExits]);
  const [filterCriteria, setFilterCriteria] = useState(''); // Criterio de filtro
  const [filterValue, setFilterValue] = useState(''); // Valor de filtro

  useEffect(() => {
     fetch('http://localhost:5000/api/record/getall')
       .then((response) => response.json())
      .then((data) => {
        setEntriesExits(data);
        setFilteredEntriesExits(data);
       });
  }, []);

  useEffect(() => {
    // Aplica el filtro cuando cambia el criterio de filtro o el valor de filtro
    filterEntriesExits();
  }, [filterCriteria, filterValue, entriesExits]);

  const filterEntriesExits = () => {
    let filteredData = [...entriesExits];

    if (filterCriteria === 'date') {
      // Filtrar por fecha
      filteredData = entriesExits.filter((entryExit) =>
        entryExit.date.includes(filterValue)
      );
    } else if (filterCriteria === 'car') {
      // Filtrar por vehículo
      filteredData = entriesExits.filter((entryExit) =>
        entryExit.car.plate.includes(filterValue)
      );
    } else if (filterCriteria === 'driver') {
      // Filtrar por motorista
      filteredData = entriesExits.filter((entryExit) =>
        entryExit.driver.includes(filterValue)
      );
    }

    setFilteredEntriesExits(filteredData);
  };
  console.log(entriesExits)

  return (
    <div>
      <h2 className="d-flex justify-content-center align-items-center">Lista de Entradas y Salidas</h2>
      <div className="d-grid align-items-center">
        <select
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
        >
          <option value="">Sin filtro</option>
          <option value="date">Fecha</option>
          <option value="car">Vehículo</option>
          <option value="driver">Motorista</option>
        </select>
        <input
          type="text"
          placeholder="Valor de filtro"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>
      <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Vehiculo/Placa</th>
              <th scope="col">Motorista</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntriesExits.map((entryExit) => (
              <tr key={entryExit.id}>
                <td>{entryExit.date}</td>
                <td>{entryExit.car.plate}</td>
                <td>{entryExit.driver}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}

export default EntryExitList;
