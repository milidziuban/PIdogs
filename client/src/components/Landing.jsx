import React from "react";
import { Link } from "react-router-dom";
import './Landing.css'


export default function Landing() {
    return (
        <>
            <div className='style_landing'>
                <h1 className='titulo_landing'>  Dogs Web  </h1>
                <h3 className="descrip_landing">Aplication about man's best friend</h3>
                <Link to='/home'>
                    <button className="button_home"> Get into </button>
                </Link>
                <div className='parrafo_landing'>
                    <p>You can get information about multiple dog breed, names and details such as their size, life span and temperament, and you can also add new ones!</p>
                </div>
            </div>
        </>
    )
}