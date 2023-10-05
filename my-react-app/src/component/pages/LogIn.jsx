import React, { useContext } from "react";
import AuthContext from "../hook/CreateContext";
const LogIn = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      {/* <h1>{auth.login}</h1>
      <h1>{ auth.app}</h1> */}
      <button onClick={auth.login}>LogIn</button>
      {console.log(auth.app)}
    </>
  );
};

export default LogIn;
