const express = require('express');
const authRoute = require('./0auth.route');
const userRoute = require('./user.route');
const firebaseRoute = require('./firebase.route');
const docsRoute = require('./docs.route');


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/firebase',
    route: firebaseRoute,
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/ istanbul ignore next /

devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router