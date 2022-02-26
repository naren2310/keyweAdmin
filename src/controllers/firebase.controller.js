const admin =  require('firebase-admin');
const serviceAccount = require( '../../keywe-9f261-firebase-adminsdk-w65lo-52c0e953e4.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

// Admin getUser 
const getUserData = async (req, res) => {
  admin.auth().getUser(req.params.uid)
    .then((userRecord) => {
      res.status(200).send(userRecord);
    }).catch((error) => {
      res.status(400).send(error);
    })
}

// Admin create user 
const createUserData = async (req, res) => {
  admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    displayName: req.body.displayName,
    photoUrl: req.body.photoUrl,
    disabled: req.body.disabled,
  }).then((userRecord) => {
    res.status(200).send(userRecord)
  }).catch((error) => {
    res.status(400).send(error);
  })
}

// Admin update user 
const updateUserData = async (req, res) => {
  const uid = req.params.uid;
  const payload = req.body;
  admin.auth().updateUser(uid, payload)
    .then(() => {
      res.status(200).send('updated successfully');
    }).catch((error) => {
      res.status(400).send(error);
    })
}

// delete user 
const deleteUserData = async (req, res) => {
  const uid = req.params.uid;
  admin.auth().deleteUser(uid)
    .then(() => {
      res.status(200).send('deleted successfully')
    }).catch((error) => {
      res.status(400).send(error);
    })
}


// getAllUsers
const getAllUserData = async (req, res) => {
  const limit = req.body.limit;
  admin.auth().listUsers(limit)
    .then((userRecord) => {
      res.status(200).send(userRecord);
    }).catch((error) => {
      res.status(400).send(error);
    })
}

// set role claim
const customClaim = async (req, res) => {
  const uid = req.params.uid;
  admin.auth().setCustomUserClaims(uid, { admin: true })
    .then((userRecord) => {
      res.status(200).send(userRecord)
    }).catch((error) => {
      res.status(400).send(error);
    })
}




// Current User Login 


const  { auth } = require('../config/firebase.config')
const {
  // GoogleAuthProvider,
  // FacebookAuthProvider,
  // GithubAuthProvider,
  // TwitterAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
  updateProfile,
  updateEmail,
} = require("firebase/auth");


const register = async (req, res) => {
  
  try {
    const user = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);
    
    res.status(200).send(user)
    
  } catch (error) { res.status(400).send(error) }
};


const login = async (req, res) => {
  
  try {
    
    const user = await signInWithEmailAndPassword(auth, req.body.email, req.body.password); 
    
    res.status(200).send(user)
    
  } catch (error) { res.status(400).send(error) }
};


const logout = async (req, res) => { 
  
  await signOut(auth);
  
  res.status(200).send("logout successfully"); 
}

const resetPassword = async (req, res) => {
  
  try {
    const result = await sendPasswordResetEmail(auth, req.body.email);
    
    if (result) { 
      res.status(200).send(result) 
    }
    
  } catch (error){ res.status(400).send("Email can not be empty") }
}


const getUser = (req, res) => { onAuthStateChanged(auth, (user) => user ? res.status(200).send(user.reloadUserInfo) : res.status(400).send("User is SignOut")); }


const userDelete = async(req, res) => 
{ 
  await deleteUser(auth.currentUser)
  
  .then(() => res.status(200).send("users deleted"))
  
  .catch(() => res.status(200).send("didn't find a user "));
}


const updateUserProfile = async (req, res) => {
  
  updateProfile(auth.currentUser, { displayName: req.body.displayName, photoURL: req.body.photoURL || "https://example.com/jane-q-user/profile.jpg" })
  
  .then(() => res.status(200).send("user updated")).catch(() => res.status(400).send("didn't find a user, Please login"));
}


const updateUserEmail = async(req, res) =>
{
  await updateEmail(auth.currentUser, req.body.email)
  
  .then(() => res.status(200).send("email updated"))
  
  .catch(() => res.status(400).send("didn't find a user, Please login"));
} 

module.exports = {
  getUserData,
  createUserData,
  updateUserData,
  deleteUserData,
  getAllUserData,
  customClaim,
  register,
  login,
  logout,
  resetPassword,
  getUser,
  userDelete,
  updateUserProfile,
  updateUserEmail
}



// const loginWithGoogle = () => {
  
  //   const provider = new GoogleAuthProvider();
  
  //   signInWithPopup(auth, provider).then((result) => { console.log(result) }).catch((err) => { console.log(err); })
  // }
  
  // const loginGithub = (req, res) => {
    
    //   const provider = new GithubAuthProvider();

//   signInWithPopup(auth, provider)

//     .then((result) => { const credential = GithubAuthProvider.credentialFromResult(result) })

//     .catch((error) => { const credential = GithubAuthProvider.credentialFromError(error) });
// }
