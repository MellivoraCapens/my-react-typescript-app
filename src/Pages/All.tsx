import "../App.css";
import React from "react";
import WelcomePage from "../Components/WelcomePage";
import UserForm from "../Components/UserForm";
import Dropdown from "../Components/Dropdown";
import WeatherApp from "../Components/WeatherApp";
import TodoList from "../Components/TodoList";
import GaleryMain from "../Components/GaleryMain";

const All: React.FC = () => {
  return (
    <div>
      <div className="container">
        <div className="item1">
          <WelcomePage />
          <UserForm />
        </div>
        <div className="item2">
          <Dropdown />
        </div>
        <div className="item3">
          <WeatherApp />
        </div>
      </div>
      <TodoList />
      <div className="galery">
        <GaleryMain />
      </div>
    </div>
  );
};

export default All;
