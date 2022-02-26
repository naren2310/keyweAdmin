const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const xss = require('xss-clean');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./src/routes/v1');
const compression = require('compression');
const helmet = require('helmet');
// import  authRoute from './src/routes/0auth.route';
const  userRoute = require('./src/routes/v1/user.route');
// import adminRoute from './src/routes/firebase.route'
const app = express(); 
dotenv.config();


// Mongodb connection 
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, { useUnifiedTopology: true })
const db = mongoose.connection
if(!db){
    console.log('db not connected');
}else {console.log('connected successs!..');}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//Parse requests of content-type - application/json
app.use(cors());

app.use((req, res, next) => {
    res.set(
      'Content-Security-Policy',
      "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
    );
    next();
  });

  // parse cookies
app.use(cookieParser());

app.use('/v1', routes);
app.use('/api', userRoute)

// Group by non authentication jobs 
// var apiRoutesNoAuth = express.Router();
// authRoute(apiRoutesNoAuth)
// userRoute(apiRoutesNoAuth)
// adminRoute(apiRoutesNoAuth)
// app.use('/api', apiRoutesNoAuth);

// port show console page 
app.listen(process.env.PORT, () => {
    console.log(`Swaggerdoc-Url : http://${process.env.IP}:${process.env.PORT}/`);
    // console.log(`server is running ${process.env.PORT}`);
})
