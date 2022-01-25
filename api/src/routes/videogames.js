const { Router } = require('express');
const { getVideogames, getVideogamesByName } = require('../controllers');
const router = Router();

router.get('/', async function (req, res) {
    const {name} = req.query;
    try {
        if (!name) {
        const allGames = await getVideogames();
        res.send(allGames)
    } 
    
        if (name) {
            const quince = await getVideogamesByName(name);
            res.send(quince)
            }
    }
    catch (error) {
        console.log('fallo el llamado ' + error)
    }
})

module.exports = router