import { getToken } from "./users-service";

export default async function sendRequest(url, method = 'GET', payload = null) {
// Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }

  //* if no token, add a token along with the HTTP request
  const token = getToken();
  if (token) {
    // Need to add an Authorization header (see above 'options.headers'...)
    // Notes is trying - Use the Logical OR Assignment operator
    // if falsey, make an object. if truthy, use the available header called 'Authorization'
    options.headers ||= {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error("Bad Request");
}