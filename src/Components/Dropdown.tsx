import "../dropdown.css";
import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";

const Dropdown: React.FC = () => {
  const initialUser = [""];

  const [open, setOpen] = useState(false);
  const [userArray, setUserArray] = useState();
  const [user, setUser] = useState(initialUser);

  const handleOpen = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUserArray(data))
      .catch((error) => console.error(error));
    setOpen(!open);
  };

  const userNameCheck = (name: Array<string>): Array<string> => {
    if (name.length > 2) {
      const firstName = name.slice(0, -1).join(" ");
      const surName = name.slice(-1)[0];
      const validName = [firstName, surName];
      return validName;
    }
    return name;
  };

  return (
    <div className="flex-container">
      <div className="item2">
        <UserInfo user={userNameCheck(user)} />
      </div>
      <div className="dropdown item1">
        <button className="dropdown-btn" onClick={handleOpen}>
          <span>Dropdown</span>
          <span className="arrow"></span>
        </button>
        <ul className="dropdown-content">
          {open && Array.isArray(userArray)
            ? (userArray as string[]).map((user: any) => (
                <li
                  onClick={() => {
                    setUser(user.name.split(" "));
                    setOpen(false);
                  }}
                >
                  <a href="#">{user.name}</a>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
