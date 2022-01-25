import loading from './loading (2).gif'
import './loader.css'
export const Loader = () => {
    return (
        <div>
            <h1 className='titulocargando'>Loading...</h1>
            <img src={loading} alt='loader' className='img-loading'/>
            </div>
    )
}