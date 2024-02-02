// const mongoose = require("mongoose");
// const Schema = mongoose.Schema; 
const { model, Schema } = require("mongoose");

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;

const userSchema = new Schema(
 //? CODE PREVIOUSLY
  // {
  //   name: { type: String, required: true },
  //   email: { type: String, required: true },
  //   password: { type: String, required: true },
  // },
  // {
  //   timestamps: true,
  // }
  //? NEW CODE 
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
  },
  {
    timestamps: true,
    //* Cybersec implementation: remove Password property before JSON serialisation
    //? passing this object around with the password doesnt seem right. so,
    //? lets write a func to automatically remove it, everytime it gets transformed to JSON as it gets passed around
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

//* Mongoose pre-save hook, Mongoose middleware
//? to hash user passwords, as they come in
// the 'pre' method, before the 'save' operation, need an await/async
// 'next' is the argument Mongoose provides to perform this
// cannot use arrow functions here
// 'this' is the user doc
// has this password been modified?
// not modified = returns False = please hash
// modified = returns True = please continue
// bcrypt is ubiquitious in dev world
// Salt_rounds = complexity of the salt. CPU-intensive, iterations, exponential computing resources. Recommended 6.
// add the bcrypt declaration at top of the code
userSchema.pre("save", async function (next) {
  
  if (!this.isModified("password")) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});



// module.exports = mongoose.model("User", userSchema);
module.exports = model("User", userSchema);
