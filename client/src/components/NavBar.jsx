import React from "react";
import SearchBar from "./SearchBar";
import * as actions from '../store/actions'
import './NavBar.css'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import './NavBar.css'


export default function NavBar() {
    const allTemperaments = useSelector((state) => state.temperaments);
    const dispatch = useDispatch();

    const handleFilterTemperament = (e) => {
        e.preventDefault();
        dispatch(actions.filterDogs(e.target.value));
    };

    useEffect(() => {
        dispatch(actions.getTemperament());
    }, [dispatch])

    return (
        <div className="navBar">

            <a href='javascript:location.reload()' className="titulo_nav"> DOGS WEB </a>

            <SearchBar />

            <div className='temperament'>

                <h3>Filter by temperament</h3>

                <select className='temperament_select' onChange={(e) => handleFilterTemperament(e)}>
                    <option disabled selected defaultValue>Select temperament</option>
                    <option value="All">All</option>
                    {
                        allTemperaments?.map(temp => (
                            <option value={temp.name} key={temp.id} >{temp.name}</option>
                        ))
                    }
                </select>

            </div>

            <Link to='/create'>
                <h2 className="create_link">
                    New Dog
                </h2> </Link>

        </div>
    )
}