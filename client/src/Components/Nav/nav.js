import { useSelector} from 'react-redux';
import { SearchBar } from '../SearchBar/searchBar';
import { Link } from 'react-router-dom';
import "./nav.css"
export const Nav = ({sort, filterGenres, filterCreated, setCurrentPage, refresh}) => {
    const genres = useSelector(state => state.genres)
    return (
        <div>
            <button onClick={refresh}>Refresh</button>
            <SearchBar setCurrentPage={setCurrentPage}></SearchBar>
            <Link to='/create'><button>Crear videojuego</button></Link>
            <div className='filtros'>
            <h4>Filtrar por generos:</h4>
            <select onChange={e => filterGenres(e)}>
            <option value="Todos">Por defecto</option>
                {genres?.map(g => {
                    return (
                        <option key= {g.name} value={g.name}>{g.name}</option>
                    )
                })}
            </select>
            <h4>Filtrar juegos: </h4>
            <select onChange={e => filterCreated(e)}>
                <option value='Todos'>Todos</option>
                <option value='number'>Existentes</option>
                <option value='string'>Creados</option>
            </select>
            <h4>Ordenar por nombre:</h4>
            <select onChange={e => sort(e)}>
                <option value='Default'>Por defecto</option>
                <option value='Ascendente'>Ascendente</option>
                <option value='Descendente'>Descendente</option>
            </select>
            <h4>Ordenar por rating:</h4>
            <select onChange={e => sort(e)}>
                <option value='Default'>Por defecto</option>
                <option value='Rating +'>Rating +</option>
                <option value='Rating -'>Rating -</option>
            </select>
            </div>
        </div>
    )
}

