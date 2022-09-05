const Sector = require('../models/Sector');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError,
    BadRequestError, } = require('../errors');


const getAllSectors = async(req, res)=>{
    const sectors = await Sector.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({sectors, count:sectors.length})
}


const getSector = async(req, res)=>{
    const {user:{userId}, params:{id:sectorId}}= req

    const sector = await Sector.findOne({ _id: sectorId, createdBy: userId })
    
    if (!sector) {
        throw new NotFoundError(`There is no sector with id  ${sectorId}`)
    }

    res.status(StatusCodes.OK).json({sector})
}
//
const createSector= async(req, res)=>{
    req.body.createdBy = req.user.userId
    const sector = await Sector.create(req.body)
    res.status(StatusCodes.CREATED).json(sector)
}


const updateSector = async(req, res)=>{
    const {body:{company, industry},
        user: { userId },
        params: { id: sectorId } } = req
        if (company === '' || industry=== '') {
            throw new BadRequestError('Company or Industry fields cannot be empty')
        }
    
    const sector = await Sector.findByIdAndUpdate({ _id: sectorId, createdBy: userId }, req.body, {new:true, runValidators:true})
    
    if (!sector) {
        throw new NotFoundError(`There is no sector with id  ${sectorId}`)
    }

    res.status(StatusCodes.OK).json({sector})
}


const deleteSector= async(req, res)=>{
    const {user:{userId}, params:{id:sectorId}}= req

    const sector= await Sector.findByIdAndRemove({_id:sectorId, createdBy:userId})

    if (!sector) {
        throw new NotFoundError(`There is no sector with id  ${sectorId}`)
    }

    res.status(StatusCodes.OK).send()
}


module.exports= {
    getAllSectors,
    getSector,
    createSector, 
    updateSector,
    deleteSector
}

