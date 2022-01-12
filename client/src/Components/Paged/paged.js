import React from "react";
import './paged.css'

export default function Paginado ({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = []

    for( let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
                { pageNumbers?.map(n => {
                    return(
                    <li key={n} className="paginas">
                    <ul onClick={() => paginado(n)}>{n}</ul>
                    </li>
                    )
                }) }
        </nav>
    )
}