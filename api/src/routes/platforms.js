
const { Router } = require("express");
const { getPlatforms } = require("../controllers");
const router = Router()

router.get('/', async (req, res) => {
    try {
        const platforms = await getPlatforms()
        res.send(platforms)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router