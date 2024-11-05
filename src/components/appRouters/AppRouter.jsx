import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../../App2';
import PokemonDetailsPage from '../pages/PokemonDetailsPage';

function AppRouter() {
  console.log("Test appRouter")
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pokedex/:id" element={<PokemonDetailsPage />} />
    </Routes>
  );
}

export default AppRouter;
