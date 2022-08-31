const express = require('express');

const router = express.Router();

const { getAllSectors,
    getSector,
    createSector,
    updateSector,
    deleteSector } = require('../controllers/sectors');


 router.route('/').post(createSector).get(getAllSectors)
 router.route('/:id').get(getSector).delete(deleteSector).patch(updateSector)


module.exports = router;