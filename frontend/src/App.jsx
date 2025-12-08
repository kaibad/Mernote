import { Route, Routes } from "react-router";
import Login from "#pages/Login";
import Register from "#pages/Register";
import Notes from "#pages/Notes";
import Home from "#pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </>
  );
};

export default App;
