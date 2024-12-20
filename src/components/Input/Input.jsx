import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar el hook de navegación
import styles from './Input.module.css';
import { Link } from 'react-router-dom';

function Input({ busqueda, setBusqueda }) {
  const [reserch, setReserch] = useState("");
  const navigate = useNavigate(); // Inicializar el hook de navegación

  function handleSubmit(e) {
    e.preventDefault();
    setBusqueda(reserch); // Actualiza `busqueda` en `App`
    
    if (reserch.trim() !== "") {
      // Navegar a la URL de detalles del Pokémon
      navigate(`/pokedex/${reserch.toLowerCase()}`);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Pokedex">Pokedex</label>
        <input
          type="text"
          value={reserch}
          placeholder="Ingresa nombre o número del Pokémon"
          onChange={(e) => setReserch(e.target.value)}
        />
        <button type="submit">
          {/* SVG del botón */}
          <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.193 31.5569L25.9564 24.3217C28.0538 21.8036 29.0998 18.5737 28.8765 15.304C28.6533 12.0344 27.1781 8.97662 24.7578 6.76691C22.3376 4.55719 19.1585 3.36563 15.8821 3.44009C12.6057 3.51455 9.48408 4.84931 7.16669 7.16669C4.84931 9.48408 3.51455 12.6057 3.44009 15.8821C3.36563 19.1585 4.55719 22.3376 6.76691 24.7578C8.97662 27.1781 12.0344 28.6533 15.304 28.8765C18.5737 29.0998 21.8036 28.0538 24.3217 25.9564L31.5569 33.193C31.6644 33.3005 31.7919 33.3857 31.9323 33.4438C32.0726 33.502 32.2231 33.5319 32.375 33.5319C32.5269 33.5319 32.6774 33.502 32.8177 33.4438C32.9581 33.3857 33.0856 33.3005 33.193 33.193C33.3005 33.0856 33.3857 32.9581 33.4438 32.8177C33.502 32.6774 33.5319 32.5269 33.5319 32.375C33.5319 32.2231 33.502 32.0726 33.4438 31.9323C33.3857 31.7919 33.3005 31.6644 33.193 31.5569ZM5.78124 16.1875C5.78124 14.1293 6.39156 12.1174 7.53501 10.4061C8.67847 8.69479 10.3037 7.361 12.2052 6.57337C14.1067 5.78575 16.199 5.57967 18.2177 5.9812C20.2363 6.38272 22.0905 7.37382 23.5458 8.82916C25.0012 10.2845 25.9923 12.1387 26.3938 14.1573C26.7953 16.176 26.5892 18.2683 25.8016 20.1698C25.014 22.0713 23.6802 23.6965 21.9689 24.84C20.2576 25.9834 18.2457 26.5937 16.1875 26.5937C13.4285 26.5907 10.7834 25.4933 8.83254 23.5424C6.88166 21.5916 5.7843 18.9465 5.78124 16.1875Z" fill="black"/>
          </svg>
        </button>
        
        <Link to="/" className="pokeball-link" id='home'>
          <button htmlFor="Pokedex" className="pokeball-label " id='home'>Home</button>
        </Link>
        
      </form>
    </div>
  );
}

export default Input;
