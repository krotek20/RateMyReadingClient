import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "./Legend.css";

export default function Legend() {
  return (
    <div className="Container">
      <div className="Container">
        <CircleIcon sx={{ color: "#f4a261", fontSize: "15px" }}></CircleIcon>
        <p className="Text">Începtător</p>
      </div>
      <div className="Container">
        <CircleIcon sx={{ color: "#ffd166", fontSize: "15px" }}></CircleIcon>
        <p className="Text">Intermediar</p>
      </div>
      <div className="Container">
        <CircleIcon sx={{ color: "#bfd200", fontSize: "15px" }}></CircleIcon>
        <p className="Text">Avansat</p>
      </div>
      <div className="Container">
        <CircleIcon sx={{ color: "#55a630", fontSize: "15px" }}></CircleIcon>
        <p className="Text">Expert</p>
      </div>
    </div>
  );
}
