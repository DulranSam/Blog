import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import HomePage from "./Components/HomePage";
import AddPost from "./Components/AddPost";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import ViewPost from "./Components/ViewPost";

function App() {
  const [loading, setLoading] = useState(false);
  const PostContext = createContext();
  return (
    <>
      <PostContext.Provider value={(loading, setLoading)}>
        {" "}
        {/**Learning how to properly use Context Hook */}
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/addpost" element={<AddPost></AddPost>}></Route>
            <Route path="/:id" element={<ViewPost></ViewPost>}></Route>
          </Routes>
        </BrowserRouter>
      </PostContext.Provider>
    </>
  );
}

export default App;
