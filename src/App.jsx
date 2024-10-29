import React, { useState } from 'react'
import Input from './components/Input/Input.jsx';
import './styles.css';
function App() {
  const [busqueda, setBusqueda] = useState('');   

  return (
    <div>

        <Input busqueda = {busqueda} setBusqueda = {setBusqueda} />
        <p>Búsqueda: {busqueda}</p> {/* Muestra el valor de `busqueda` quitar mas adelante*/}
    </div>
  )
  
}

export default App
