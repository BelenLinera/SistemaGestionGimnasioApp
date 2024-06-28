import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./Components/Context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from './Components/Context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<ThemeProvider>
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
</ThemeProvider>
);
