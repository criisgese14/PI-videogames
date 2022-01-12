import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { getVideogamesByName } from '../../Redux/Actions';

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
        <form onSubmit={ e => {handleSubmit(e)}}>
            <input 
                placeholder="Buscar mas juegos..."
                type='text' 
                value={name} 
                onChange={e => handleInputChange(e)}>
            </input>
            <button>Search</button>
        </form>
    )
}