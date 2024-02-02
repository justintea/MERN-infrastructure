const User = require("../../models/user");
const debug = require("debug")("mern:controllers:usersController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//* Create user function 
async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  }
  catch (err) {
    res.status(400).json(err);
  }
}
//? beginner code for Create
// function create(req, res) { 
//   res.json({
//     user: {
//       name: req.body.name,
//       email: req.body.email,
//     },
//   });
// }


//*-- Helper Functions --*//

function createJWT(user) {
    return jwt.sign(
      // data payload
      { user },
      process.env.SECRET,
      { expiresIn: "24h" }
    );
  }

//* Login user function
async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json(createJWT(user));
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

//* Checktoken
function checkToken(req, res) {
  console.log('req.user', req.user);
  // that Date object we created for fun
  res.json(req.exp); 
}

//? your GetAll function, commented out first
// async function showAll(req, res) {
//     const data = await User.find({});
//     res.json(data);
// }


//   const data = req.body;
//   debug("data: %o", data);
//     //? YOUR CODE PREVIOUSLY
//     // const user = await User.create(data);
//     // res.json({ user, msg: "create" });
//     // // res.json({  msg: "create" });

//     //? NEW CODE
//     if (data.password.trim().length < 3) {
//         res.status(400).json({ msg: "password too short" });
//         return;
//       }



// const login = async (req, res) => {
//     //? check if data in database -> CRUD??
//     //? Outcomes -> YES / NO
//     //? YES -> exist in database
  
//     const { email, password } = req.body;
//     try {
//       const somebody = await User.findOne({ email });
  
//       if (somebody === null) {
//         res.status(401).json({ msg: "user not found" });
//         return;
//       }
  
//       // if (somebody.password !== password) {
//       const check = await bcrypt.compare(password, somebody.password);
//       if (!check) {
//         res.status(401).json({ msg: "wrong password" });
//         return;
//       }
  
//       const token = createJWT(somebody);
//       res.json({ token });
//     } catch (error) {
//       res.status(500).json({ error });
//     }
//   };


//? should write the below, in case request goes to database n database fails 
// try {
//     const user = await User.create(data);
//     res.status(201).json({ user });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };
  
//     //? check if data in database
//   //? check if data in database -> CRUD??
//   //? Outcomes -> YES / NO
//   //? YES -> exist in database

//   const somebody = await User.find({ email: data.email });
//   //* array of User objects

//   res.json({ data, somebody });
//   };


//* export the controller method ie. controller action

module.exports = {
    // showAll,
    create,
    login,
    checkToken,
};
