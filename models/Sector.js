const mongoose = require('mongoose');


const SectorSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name e.g Google inc.'],
        maxLength: 50
    },
    industry: {
        type: String,
        required: [true, 'Please provide industry category e.g I.T & software'],
        maxLength: 50
    },
    status: {
        type: String,
        enum: ['Healthcare', 'Technology', 'Construction', 'Retail', 'Non-durable Manufacturing', 'Agriculture', 'Entertainment', 'others'],
        default: 'others'
    },
    'Healthcare': { //A property of status
        type: String,
        enum: ['Health information manager', 'Doctor', 'Nurse', 'Medical laboratory scientist', 'Medical physicist', 'Nuclear medicine technologist', 'others'],
    },
    'Technology': {
        type: String,
        enum: ['Software engineer', 'Web Analytics Developer', 'SEO Consultant', 'Content Manager', 'Digital marketing manager', 'Information Architect', 'Data Scientist', 'others']
    },
    'Construction': {
        type: String,
        enum: ['Building services engineers', 'Building surveyors', 'Civil and geotechnical engineers', 'Site managers', 'Landscape architects ', 'Architects and architectural technologists', 'others'],
       
    },
    'Agriculture': {
        type: String,
        enum: ['Agricultural Economist', 'Vet. Doctor', 'Animal Scientist', 'Plant Scientist', 'Precision Agriculture Specialist', 'Bioprocessing Engineer', 'others'],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,                             //linking the user to the sector 
        ref: 'User',
        required: [true, 'Please provide user']
    }
},
    { timestamps: true })

module.exports = mongoose.model('Sector', SectorSchema)