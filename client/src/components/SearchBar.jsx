import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDog } from "../store/actions";
import './SearchBar.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInput = (e) => {
        e.preventDefault();
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchDog(name))
    }

    return (
        <div className='search_top'>
            <h3> Search by breed </h3>
            <div className='search'>
            <input className="input_search" type='text' placeholder="Search..." onChange={handleInput} />
            <button className="button_search" type="submit" onClick={handleSubmit}> Buscar </button>
            </div>
        </div>
    )

}