


const getAllSectors = async(req, res)=>{
    res.send('get all sectors')
}


const getSector = async(req, res)=>{
    res.send('get a single sector')
}

//
const createSector= async(req, res)=>{
    res.json(req.user)
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

