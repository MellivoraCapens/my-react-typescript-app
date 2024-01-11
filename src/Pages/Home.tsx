import "../App.css";
import React from "react";
import WelcomePage from "../Components/WelcomePage";
import UserForm from "../Components/UserForm";
import Dropdown from "../Components/Dropdown";
import WeatherApp from "../Components/WeatherApp";

const Home: React.FC = () => {
  return (
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
  );
};

export default Home;
