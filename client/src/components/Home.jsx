import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import * as actions from '../store/actions'
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import './Home.css'

// [ ] Input de búsqueda para encontrar razas de perros por: nombre
// [ ] Botones/Opciones para ordenar las razas de perro por: Peso

export default function Home() {
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);

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

    const handleFilterTemperament = (e) => {
        e.preventDefault();
        dispatch(actions.filterDogs(e.target.value));
    };

    const handleOrderByName = (e) => {
        e.preventDefault();
        dispatch(actions.orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    // const handleOrderByWeight = (e) => {
    //     e.preventDefault();
    //     dispatch(actions.orderByWeight(e.target.value))
    // }

    useEffect(() => {
        dispatch(actions.getDog())
        dispatch(actions.getTemperament());
    }, [dispatch])

    return (
        <div id='home' name='home' className="home">
            <Link to='/create'> Crear perrito </Link>
            <h1> Perritos </h1>

            <select onChange={(e) => handleFilterTemperament(e)}>
                <option disabled selected defaultValue>Seleccionar temperamento</option>
                <option value="All">All</option>
                {
                    allTemperaments?.map(temp => (
                        <option value={temp.name} key={temp.id} >{temp.name}</option>
                    ))
                }
            </select>

            <select onChange={handleOrderByName}>
                <option disabled selected defaultValue> Alphabetical order </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
            {/* 
              <select onChange={handleOrderByWeight}>
                <option disabled selected defaultValue>
                  Filter by weight
                </option>
                <option value="max">Max</option>
                <option value="min">Min</option>
              </select> */}

            <div>
                <Paginado dogPerPage={dogPerPage}
                    allDogs={allDogs.length}
                    paginado={paginado} />
            </div>

            <div className="contenido_home">
                {currentDog?.map(el => {
                    return (
                        <div className="cards">
                            <Link to={'/home/' + el.id}>
                                <Card name={el.name} temperament={el.temperament} image={el.image} />
                            </Link>
                        </div>
                    )

                })
                }
            </div>

        </div>
    )

}