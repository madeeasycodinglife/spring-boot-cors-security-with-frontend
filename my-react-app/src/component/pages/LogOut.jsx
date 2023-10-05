import React, { useContext } from "react";
import AuthContext from "../hook/CreateContext";
const LogOut = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      <button onClick={auth.logout}>LogOut</button>
    </>
  );
};

export default LogOut;
