import React from "react";
import { Link } from "react-router-dom";
import './Landing.css'

// [ ] Alguna imagen de fondo representativa al proyecto
// [ ] Botón para ingresar al home (Ruta principal)

export default function Landing() {
    return (
        <>
            <div className='style_landing'>
                <h1 className='titulo_landing'>  Dogs Web  </h1>
                <h3 className="descrip_landing">Aplication about man's best friend</h3>
                <Link to='/home'>
                    <button className="button_home"> Ingresar </button>
                </Link>
                <div className='parrafo_landing'>
                    <p>Here you can get information about multiple dog breed, names and details such as their size, life expectancy and temperament, and you can also add new ones!</p>
                </div>
            </div>
        </>
    )
}