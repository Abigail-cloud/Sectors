const Sector = require('../models/Sector');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError,
    BadRequestError, } = require('../errors');


const getAllSectors = async(req, res)=>{
    res.send('get all sectors')
}


const getSector = async(req, res)=>{
    res.send('get a single sector')
}

//
const createSector= async(req, res)=>{
req.body.createdBy= req.user.userId
    const sector = await Sector.create(req.body)
    res.status(StatusCodes.CREATED).json(sector)
}


const updateSector = async(req, res)=>{
    res.send('update a sector')
}


const deleteSector= async(req, res)=>{
    res.send('delete a sector')
}


module.exports= {
    getAllSectors,
    getSector,
    createSector, 
    updateSector,
    deleteSector
}

