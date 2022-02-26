const router = require('express').Router()
const {
    getUserData,
    createUserData,
    getAllUserData,
    updateUserData,
    deleteUserData,
    customClaim,
    register,
    login,
    resetPassword
} = require('../../controllers/firebase.controller');

router.get('/firebase/:uid', getUserData);// get user
router.get('/firebase/getUsers', getAllUserData); // get all user 
router.post('/firebase', createUserData); // create user
router.put('/firebase/:uid', updateUserData); //update user 
router.delete('/firebase/:uid', deleteUserData); // delete user
router.put('/firebase/customClaim/:uid', customClaim); // set role claim
router.post('/firebase/register', register); //register user 
router.post('/firebase/login', login); // login current user
router.post('/firebase/resetPassword', resetPassword) // change user password


module.exports = router
