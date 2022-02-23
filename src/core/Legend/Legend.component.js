import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "./Legend.scss";

export default function Legend({ onClick, clickable }) {
  return (
    <div className="Container">
      <div
        className={`Container ${clickable ? "clickable" : ""}`}
        onClick={() => onClick("incepator")}
      >
        <CircleIcon sx={{ color: "#3FA796", fontSize: "15px" }}></CircleIcon>
        <p className="Text">Începtător</p>
      </div>
      <div
        className={`Container ${clickable ? "clickable" : ""}`}
        onClick={() => onClick("intermediar")}
      >
        <CircleIcon sx={{ color: "#502064", fontSize: "15px" }}></CircleIcon>
        <p className="Text">Intermediar</p>
      </div>
      <div
        className={`Container ${clickable ? "clickable" : ""}`}
        onClick={() => onClick("avansat")}
      >
        <CircleIcon sx={{ color: "#FFBD35", fontSize: "15px" }}></CircleIcon>
        <p className="Text">Avansat</p>
      </div>
      <div
        className={`Container ${clickable ? "clickable" : ""}`}
        onClick={() => onClick("expert")}
      >
        <CircleIcon sx={{ color: "#1572A1", fontSize: "15px" }}></CircleIcon>
        <p className="Text">Expert</p>
      </div>
    </div>
  );
}
