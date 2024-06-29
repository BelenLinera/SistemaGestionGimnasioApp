import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ThemeButton.css";

const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="themeButton-container">
      <button
        onClick={toggleTheme}
        className={theme === "light" ? "dark" : "light"}
      >
        {theme === "light" ? (
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon icon={faSun} />
        )}
      </button>
    </div>
  );
};

export default ThemeButton;