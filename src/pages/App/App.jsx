import debug from "debug";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import "./App.css";
// import './index.css';
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";

const log = debug("mern:pages:App");
localStorage.debug = "mern:*";

function App() {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState(getUser());
  log("user %o", user);

  //* a diff way to do: ternary expression, for simple screens
  // return <main className="App">{user ? <NewOrderPage /> : <AuthPage />}</main>;

  if (user === null) {      //? this needs to be substituted next time ?, when user!=null is thru the input
    return (
      <>

        <h1> CodePlatz </h1>
        <p ><i> Find your software development partners and services, and more </i></p>
        <br />

        <AuthPage setUser={setUser} />
        {/* <AuthPage /> */}
        
      </>
    );
  }
  
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
       <Route path='/orders/new' element={<NewOrderPage />}  />
       <Route path='/orders' element={<OrderHistoryPage />}  />
      </Routes>
    </>
  );
}

export default App;
