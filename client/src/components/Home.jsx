import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import * as actions from '../store/actions'
import { Link } from "react-router-dom";
import Card from "./Card";

// Buscar perros
// Filtrarlos / Ordenarlos
// Agregar nuevos perros

// [ ] Input de búsqueda para encontrar razas de perros por nombre
// [ ] Área donde se verá el listado de razas de perros. Deberá mostrar su:
// Imagen
// Nombre
// Temperamento
// Peso
// [ ] Botones/Opciones para filtrar por:
// Temperamento
// Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
// [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
// Orden alfabético
// Peso
// [ ] Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas por página.

export default function Home() {
    const selector = useSelector((state) => state.dogs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getDog())
    }, [])

    return (
        <div>
            <Link to='/create'> Crear perrito </Link>
            <h1> Perritos </h1>
            <div>
                <select>
                    <option value='asc'>  Asc </option>
                    <option value='desc'>  Desc </option>
                </select>
                {selector?.map(el => {
                    return (
                        <fragment>
                            <Link to={'/home/' + el.id}>
                                <Card name={el.name} temperament={el.temperament} image={el.image} />
                            </Link>
                        </fragment>
                    )

                })
                }
            </div>
        </div>
    )

}