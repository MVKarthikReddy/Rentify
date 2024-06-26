const express = require('express')
const connectDb = require('./config/dbConnect')
const userRouter = require('./routes/user.route.js');
const authRouter = require('./routes/auth.route.js');
const listingRouter = require('./routes/listing.route.js');
const cookieParser =  require('cookie-parser');
const path = require('path');
const cors = require('cors')

require('dotenv').config();

const app = express();

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${process.env.FRONTEND_URL}`); // Allow specific origin
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Handle preflight requests
  }
  
  next();
});
// app.use(cookieParser());
// app.use(cors());
        
// app.use(cors())
app.use(express.json()); //it  allows to parse JSON objects in the request body

// const __dirname =path.resolve();

connectDb()

app.listen(5000,() => {
    console.log(`server is running on ${5000}`)
})



  app.use('/api/user', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/listing', listingRouter);

  // Serve static files if we are in production
  app.use(express.static(path.join(__dirname,'/client/dist')));
  // Handling any routes that don't match the ones above (Should be at the end)
  app.get('*', (req, res) =>{
    res.json({
      message : "Backend is working fine"
    })
  })
      
  //we create a middleware to handles error  if they are not caught by other middlewares or handlers
  app.use((err,req,res,next)=> {
    const statusCode =err.statusCode || 500;
    const message = err.message||'Internal server Error';
    return res.status(statusCode).json({
        success :false,
        statusCode,
        message,
    });
  });

