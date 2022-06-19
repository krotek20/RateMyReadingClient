import React from "react";
import { useLocation } from "react-router-dom";

export default function UserDetails() {
  const { state } = useLocation();
  const { username } = state;
  return <div>{username}</div>;
}
