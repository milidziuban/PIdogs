import React from "react";
import './Card.css'

// [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// [ ] Altura
// [ ] Peso
// [ ] Años de vida

export default function Card ({name, weight, temperament, image}){
    const imagedefault = 'https://i.pinimg.com/originals/27/d6/33/27d6332add97c24febd69753b55b7f10.png'
    return (
        <div className="card">
           <h2 className="nombres"> {name} </h2>
           <h3 className="temperamentos"> Weight: {weight}kg </h3>
           <h3 className="temperamentostitulo"> Temperaments: </h3>
           <h3 className="temperamentos"> {temperament} </h3>
           <img className="cardimagen" src={image? image : imagedefault } alt='img not found' width="175"></img>
        </div>
    )
}

//si no existe poner otra img

