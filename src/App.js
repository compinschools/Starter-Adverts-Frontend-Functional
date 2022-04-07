import React from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { ApiClient } from "./apiClient";
import { useState} from 'react';
function App() {
  const [token,changeToken] = useState(window.localStorage.getItem("token"))
  
  const login = (newToken) => {
    window.localStorage.setItem("token",newToken)
    changeToken(newToken);
  }
  const logout = () => {
    window.localStorage.setItem("token","")
    changeToken("");
  }

  const client = new ApiClient(
    token,
    logout
  );

  return (
    <>
    {token ? (
      <Dashboard client={client} />
    ) : (
      <Login loggedIn={login} client={client} />
    )}
      
    </>
  );
}

export default App;
