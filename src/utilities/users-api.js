// This is the base path of the Express route we'll define
const BASE_URL = "/api/users";
import sendRequest from "./send-request";

//* signup function
//? II. levelup implementation - reusable code from utility/send-request.js
export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

//? I. initial implementation
// export async function signUp(userData) {
//   // Fetch uses an options object as a second arg to make requests
//   // other than basic GET requests, include data, headers, etc.
  
//   //? 1. do the HTTP request
//   const res = await fetch(BASE_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     // Fetch requires data payloads to be stringified
//     // and assigned to a body property on the options object
//     body: JSON.stringify(userData),
//   });
//   //? 2. Check if request was successful
//   if (res.ok) {
//     // res.json() will resolve to the JWT
//     return res.json();
//   }
  
//   else {
//   //? 3. error message
//     throw new Error("Invalid Sign Up");
//   }
// }


//* login function
//? II. levelup implementation - reusable code from utility/send-request.js
export async function logIn(credentials) {
  return sendRequest(BASE_URL + '/login', 'POST', credentials);
}

//? I. initial implementation
// export async function logIn(credentials) {
  
//   const res = await fetch(BASE_URL + "/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     // Fetch requires data payloads to be stringified
//     // and assigned to a body property on the options object
//     body: JSON.stringify(credentials),
//   });
//   if (res.ok) {
//     return res.json();
//  
//   else {
//   //? 3. error message
//     throw new Error("Invalid Login");
//   }
// }


export async function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);

}