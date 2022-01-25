import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { getVideogamesByName } from '../../Redux/Actions';
import './searchBar.css'

export const SearchBar = ({setCurrentPage}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange (e) {
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault();
        dispatch(getVideogamesByName(name.trim()))
        setCurrentPage(1);
        setName('');
        e.target.reset();
    }

    return (
        <form onSubmit={ e => {handleSubmit(e)}} className='search-container'>
            <input 
                placeholder="Search more games..."
                type='text' 
                value={name} 
                onChange={e => handleInputChange(e)}
                className='search-input'>
            </input>
            <button className='search-boton'>Search</button>
        </form>
    )
}