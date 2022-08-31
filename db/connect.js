const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    // autoIndex: false,
    useUnifiedTopology:true,
  })
}

module.exports = connectDB
