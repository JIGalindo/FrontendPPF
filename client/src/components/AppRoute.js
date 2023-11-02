
import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

// Importa los componentes que deseas utilizar en tus rutas
import CarList from './carList';
import CarUpdate from './carUpdate';
import CarRegistration from './carRegistration'
import Home from './Home';
import EntryExit from './entryExitRegistration';
import CarListSearch from './carListSearch';
import EntryExitList from './entryExitList';
// AppRouter.js

function AppRouter() {
    return (
      <Router>
        <Routes>
        <Route path="/" exact element={<Home/>} />
          <Route path="/api/car/getall"  element={<CarList/>} />
          <Route path="/api/car/update/:id" element={<CarUpdate/>} />
          <Route path="/api/car" element={<CarRegistration/>} />
          <Route path="/api/recordSearch/" element={<CarListSearch/>} />
          <Route path="/api/recordcreate/:id" element={<EntryExit/>} />
          <Route path='/api/record/getall' element={<EntryExitList/>}/>
        </Routes>
      </Router>
    );
  }
  
  export default AppRouter;
  
