import "./App.css";
import TodoList from "./Components/TodoList";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Galery from "./Pages/Galery";
import All from "./Pages/All";
import NavBar from "./Components/NavBar";
import Movies from "./Pages/Movies";
import Calculator from "./Components/Calculator";

function App() {
  return (
    <div className="App-header">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo-list" element={<TodoList />} />
        <Route path="/galery" element={<Galery />} />
        <Route path="/all" element={<All />} />
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/calculator" element={<Calculator />}></Route>
      </Routes>
    </div>
  );
}

export default App;
