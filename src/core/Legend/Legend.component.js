import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "./Legend.css";

export default function Legend() {
  return (
    <div className="Container">
      <div className="Container">
        <CircleIcon sx={{ color: "#40916c", fontSize: "15px" }}></CircleIcon>
        <p className="Text">Începtător</p>
      </div>
      <div className="Container">
        <CircleIcon sx={{ color: "#fcbf49", fontSize: "15px" }}></CircleIcon>
        <p className="Text">Intermediar</p>
      </div>
      <div className="Container">
        <CircleIcon sx={{ color: "#f3722c", fontSize: "15px" }}></CircleIcon>
        <p className="Text">Avansat</p>
      </div>
      <div className="Container">
        <CircleIcon sx={{ color: "#ae2012", fontSize: "15px" }}></CircleIcon>
        <p className="Text">Expert</p>
      </div>
    </div>
  );
}
