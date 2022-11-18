import React from "react";
import './Paginado.css'
// [ ] Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas por página.

export default function Paginado({ dogPerPage, allDogs, paginado }) {
  const pageNumber = [];

  for (let i = 0; i <= Math.ceil(allDogs / dogPerPage) - 1; i++) {
    pageNumber.push(i + 1)
  } //numero redondo de dividir mis personajes con 8

  return (
    <nav>
      <ul className="paginado">
        {pageNumber && pageNumber.map(number => (
          <a className='lista' onClick={() => paginado(number)} key={number}>
            <button className="botonpaginado">{number}</button>
          </a>
        ))}
      </ul>
    </nav>
  )
}