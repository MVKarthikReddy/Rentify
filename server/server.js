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

const corsOptions = {
  origin: 'https://rentify-gules.vercel.app/',
  credentials: true, // Enable credentials (cookies)
};

app.use(cookieParser());
app.use(cors());
        
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
    res.sendFile(path.join(__dirname,'client', 'dist','index.html'));//__dirname + '/views/index.html
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

