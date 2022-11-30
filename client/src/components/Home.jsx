import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import * as actions from '../store/actions'
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import './Home.css'

export default function Home() {
    const allDogs = useSelector((state) => state.dogs);

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const dogPerPage = 8;
    const indexOfLastDog = currentPage * dogPerPage //8
    const indexOfFirstDog = indexOfLastDog - dogPerPage // 0
    const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const [orden, setOrden] = useState("");

    const handleOrderByName = (e) => {
        e.preventDefault();
        dispatch(actions.orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    const handleOrderByWeight = (e) => {
        e.preventDefault();
        dispatch(actions.orderByWeight(e.target.value));
        setOrden(`Ordenado ${e.target.value}`);
    };

    useEffect(() => {
        dispatch(actions.getDog())
        dispatch(actions.getTemperament());
    }, [dispatch])

    console.log(currentDog)

    return (
        <div id='home' name='home' className="home">

            <div className="home_top">

                <select className='order_select' onChange={handleOrderByName}>
                    <option disabled selected defaultValue> Alphabetical order </option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>

                <select className='order_select' onChange={handleOrderByWeight}>
                    <option disabled selected defaultValue> Filter by weight </option>
                    <option value="max">Max</option>
                    <option value="min">Min</option>
                </select>

            </div>


            <div className="contenido_home">
                {currentDog && Array.isArray(currentDog) && currentDog.length !== 0 ? currentDog.map(el => {
                    return (
                        <div className="cards">
                            <Link to={'/home/' + el.id}>
                                <Card name={el.name} weight={el.weight} temperament={el.temperament} image={el.image} />
                            </Link>
                        </div>
                    )
                })
                : null
            }
            </div>

            {typeof allDogs === 'string' ? <h3>{allDogs}</h3> : null}

            <div>
                <Paginado dogPerPage={dogPerPage}
                    allDogs={allDogs.length}
                    paginado={paginado} />
            </div>

            
        </div>
    )

}