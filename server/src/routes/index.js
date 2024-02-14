const { Router } = require("express");
const { getCountries, getCountriesByName, getCountriesById } = require("../Controllers/getCountries");
const { postActivities, getActivities } = require("../Controllers/handleActivities");
const router = Router();

router.get('/countries', getCountries)
router.get('/countries/id/:idPais',getCountriesById)
router.get('/countries/name/:name', getCountriesByName)
router.post('/activities', postActivities)
router.get('/activities',getActivities)

module.exports = router;
