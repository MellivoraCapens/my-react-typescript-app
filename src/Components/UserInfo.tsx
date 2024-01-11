import React from "react";

interface UserProps {
  user: Array<string>;
}

const UserInfo: React.FC<UserProps> = ({ user }) => {
  return (
    <div>
      <p>Name: {user && user[0]}</p>
      <p>Surname: {user && user[1]}</p>
    </div>
  );
};

export default UserInfo;
