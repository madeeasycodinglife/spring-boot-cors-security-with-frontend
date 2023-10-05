import React, { useEffect, useState } from "react";
import AuthContext from "../hook/CreateContext";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
const Home = () => {
  const [auth, setAuth] = useState(false);

  const login = () => {
    console.log(auth,"in login function")
    setAuth(true);
    console.log(auth,"in login function")
  };

  const logout = () => {
    console.log(auth ,"in logout function");
    setAuth(false);
    console.log(auth ,"in logout function");
  };
  return (
    <>
      <h1>Home Page</h1>
      <AuthContext.Provider
        value={{ auth: auth, login: login, logout: logout, app: "pabitra" }}
      >
        <p>{auth ? "Hi! you are logged in" : "Oops! kindly logged in"}</p>
        <LogIn />
        <LogOut />
      </AuthContext.Provider>
    </>
  );
};

export default Home;
