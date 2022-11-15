import React from "react";
import './Card.css'

// Ruta de detalle de raza de perro: debe contener

// [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// [ ] Altura
// [ ] Peso
// [ ] Años de vida

export default function Card ({name, temperament, image}){
    return (
        <div className="card">
           <h3> {name} </h3>
           <h3> {temperament} </h3>
           <img src={image} alt='img not found' width="160"></img>
        </div>
    )
}

