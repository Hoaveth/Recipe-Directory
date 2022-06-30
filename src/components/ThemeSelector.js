import React from "react";
import { useTheme } from "../hooks/useTheme";
import modeIcon from "../assets/mode.png";

import "./styles/ThemeSelector.css";

const themeColors = ["#F54E48", "#489CF5", "#B948D5"];

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();

  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          alt="mode icon"
          onClick={toggleMode}
          style={{ filter: mode === "dark" ? "invert(100%)" : "" }}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          ></div>
        ))}
      </div>
    </div>
  );
}
