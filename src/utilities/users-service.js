//* Service modules export business/app logic
// such as managing tokens, etc
// They often depend on API modules, for making AJAX requests to the server

// import { exists } from "../../models/user";
import * as usersAPI from "./users-api";


//* service checks and prepares the data
export async function signUp(userData) {
  //* data check / cleanup
  // const userData = { ...formData };
  // delete userData.error;
  // delete userData.confirm;

  //* validation
  // if (userData.password.trim().length < 3) {
  //   return { error: "password too short" };
  // }

  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // 1. Baby step by returning whatever is sent back by the server
  // return token;
  //? 2. now, this is first instance when token is created. you can store it in the browser!
  localStorage.setItem('token', token);
  //? with getToken done, you dont return the token in the browser console
  // return token;
  return getUser();
}

//* when a user Signups, SSOes, or logs in, he gets a token (options 2 and 3)
export function getToken() {
  //? getItem returns null if there's no string
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  //? if have token, obtain the payload of the token
  const payload = JSON.parse(atob(token.split(".")[1]));
  // const payload = token.split('.')[1];
  // const decodedPayload = atob(payload);
  // const payloadObject = JSON.parse(decodedPayload);
  
  //? A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    // Token has expired - remove it from localStorage
    localStorage.removeItem("token");
    return null;
  }
  return token;
}


export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}


export function logOut() {
  localStorage.removeItem('token');
}


export async function logIn(credentials) {
  // goes to a GET request for 1 ID
  // so that is in the users-api 
  const token = await usersAPI.logIn(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function checkToken() {
  // baby steps
  // alert('clicked');

// Just so that you don't forget how to use .then
  return (
  // checkToken returns a string, but let's
  // make it a Date object for more flexibility
  usersAPI.checkToken().then((dateStr) => new Date(dateStr))
  );
}



//* logic
// How do we need to update User state according these scenarios:
// 1. No token exists
//         -> set User state to null
// 2. Valid tokens exists
//         -> get the user from the token(recall array[1], the payload of the decoded jwt)
//         -> set User state to the user object
// 3. Token exists, but it has expired
//         -> set User state to null
//         -> Remove token 
