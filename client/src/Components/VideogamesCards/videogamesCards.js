import VideogameCard from "../VideogameCard/videogameCard"


export const VideogamesCards = ({allVideogames}) => {
    return (
        allVideogames?.map(g => {
            return (
                    <VideogameCard
                            key={g.id}
                            id={g.id}
                            name={g.name}
                            img={g.img}
                            genres={g.genres}
                            rating={g.rating}
                            />
            )
        })
    )
}