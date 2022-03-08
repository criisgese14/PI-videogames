import { useSelector} from 'react-redux';
import { SearchBar } from '../SearchBar/searchBar';
import { Link } from 'react-router-dom';
import "./nav.css"
export const Nav = ({sort, filterGenres, filterCreated, setCurrentPage, refresh}) => {
    const genres = useSelector(state => state.genres)
    return (
        <div className='nav'>
            <div className='header'>
            <Link to='/'><button className='boton-nav'>Back</button></Link>
                <SearchBar setCurrentPage={setCurrentPage}></SearchBar>
                <div>
                <button onClick={refresh} className='boton-nav'>Refresh</button>
                <Link to='/create'><button className='boton-nav'>Create videogame</button></Link>
                </div>
            </div>
            <div className='filters-nav'>
            <div className='filter-nav'>
            <h2 className='title-nav'>Order by:</h2>
            <select onChange={e => sort(e)} className='select'>
                <option value='Default'>Default</option>
                <option value='Ascendente'>A - Z</option>
                <option value='Descendente'>Z - A</option>
                <option value='Rating +'>Rating +</option>
                <option value='Rating -'>Rating -</option>
            </select>
            </div>
            <div className='filter-nav'>
            <h2 className='title-nav'>Filer by genres:</h2>
            <select onChange={e => filterGenres(e)} className='select'>
            <option value="Todos">Default</option>
                {genres?.map(g => {
                    return (
                        <option key= {g.name} value={g.name}>{g.name}</option>
                    )
                })}
            </select>
            </div>
            <div className='filter-nav'>
            <h2 className='title-nav'>Filter games: </h2>
            <select onChange={e => filterCreated(e)} className='select'>
                <option value='Todos'>All</option>
                <option value='number'>Existent</option>
                <option value='string'>Created</option>
            </select>
            </div>
           
            </div>
        </div>
    )
}

