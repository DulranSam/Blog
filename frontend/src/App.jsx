import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import AddPost from "./Components/AddPost";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/addpost" element={<AddPost></AddPost>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
