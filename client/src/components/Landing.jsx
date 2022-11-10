import React from "react";
import { Link } from "react-router-dom";
import './Landing.css'

// [ ] Alguna imagen de fondo representativa al proyecto
// [ ] Botón para ingresar al home (Ruta principal)

export default function Landing (){
    return (
        <div className='style_landing'>
            <h1> DOGS </h1>
            <Link to = '/home'>
            <button> Ingresar </button>
            </Link>
        </div>
    )
}