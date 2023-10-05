import { Route, Routes } from "react-router-dom";
import Props from "./component/Props";
import UserList from "./component/UserList";
import Home from "./component/pages/Home";
import About from "./component/pages/About";

const App = () => {
  return (
    <>
      {/* use navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" Component={() => <h1>Not found</h1>} />
      </Routes>
      {/* <UserList /> */}
    </>
  );
};

export default App;
