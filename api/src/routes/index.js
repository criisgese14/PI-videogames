const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogame = require('./videogame.js');
const videogames = require('./videogames.js');
const genres = require('./genres.js');
const { default: axios } = require('axios');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogames);
router.use('/videogame', videogame);
router.use('/genres', genres);

// router.get('/temperament', async (req, res) => {
//     let perros = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=5626fb4d-c612-4fc5-8440-ea4b88e6c712`)
//     let temperamentos = perros.data?.map(t => {
//         console.log(t.temperament.split(', ')) 
//         return t.temperament.split(', ')
//     })
    // let result = temperamentos.filter((item,index)=>{
    //     return temperamentos.indexOf(item) === index;
    //   })

    // for (i = 0; i < result.length; i++) {
    //     console.log(result[i].split(', '))
    //     var cortados= result[i].split(', ');
    // }

//     res.send(temperamentos)
// })

module.exports = router;
