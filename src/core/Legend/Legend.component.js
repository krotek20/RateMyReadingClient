import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "./Legend.css";

export default function Legend() {
  return (
    <div className="Container">
      <div className="Container">
        <CircleIcon sx={{ color: "#40916c", fontSize: "15px" }}></CircleIcon>
        <p className="Text">Ușor</p>
      </div>
      <div className="Container">
        <CircleIcon sx={{ color: "#fcbf49", fontSize: "15px" }}></CircleIcon>
        <p className="Text">Mediu</p>
      </div>
      <div className="Container">
        <CircleIcon sx={{ color: "#ae2012", fontSize: "15px" }}></CircleIcon>
        <p className="Text">Greu</p>
      </div>
    </div>
  );
}
