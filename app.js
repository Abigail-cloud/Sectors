require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//Db
const connectDB = require('./db/connect');

//auth middleware
const authenticateUser= require('./middleware/authentication')

//Routes
const authRoute = require('./routes/auth');
const sectorRoute = require('./routes/sectors')


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes middleware
app.use('/v1/auth', authRoute);
app.use('/v1/sectors', authenticateUser, sectorRoute);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
