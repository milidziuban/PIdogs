import React from "react";
import { Link } from "react-router-dom";
import './Landing.css'


export default function Landing() {
    return (
        <>
            <div className='style_landing'>
                <div className="texto_landing">
                <Link to='/home'>
                    <button className="button_home"> Know More </button>
                </Link>
                <h3 className="descrip_landing">APLICATION ABOUT MAN'S BEST FRIENDS</h3>
                <div className='parrafo_landing'>
                    <p>You can get information about multiple dog breed, names and details such as their size, life span and temperament, and you can also add new ones!</p>
                </div>
                </div>
                <img className="imagen" alt="image not found" src="https://www.pngplay.com/wp-content/uploads/12/Dog-PNG-HD-Free-File-Download.png"></img>
            </div>
        </>
    )
}