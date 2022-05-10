import React, { useState } from "react";

import "./Join.css";

// ein join-page erstellen damit andere users in der meeting teil nehmen können ohne anzumelden .
// input element für username und button für join meeting

export const Join = () => {
  const [userName, setUserName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  const handleClick = (e) => {
    localStorage.setItem(userName, userName);
    setUserName("");
  };

  return (
    <div>
      <input type="text" placeholder="username" onChange={handleChange} />
      <button onClick={handleClick}>+ Join</button>
    </div>
  );
};
