require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// Extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit= require('express-rate-limit')

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
// extra packages security
app.set('trust proxy', 1)
app.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))

app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/', (req, res)=>{
  res.send('Sector api')
})

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
