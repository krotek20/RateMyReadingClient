import React, { useEffect } from "react";
import Loading from "../../core/Loading/Loading.screen";
import { confirmForgotPassword } from "./Login.api";
import { useNavigate } from "react-router-dom";

export default function ConfirmForgotPassword() {
  const navigate = useNavigate();

  useEffect(() => {
    const splittedLocation = window.location.href.split("/");
    const username = splittedLocation[splittedLocation.length - 2];
    const key = splittedLocation[splittedLocation.length - 1];
    confirmForgotPassword(username, key)
      .payload.then((res) => {
        if (res.status === 200) {
          navigate("/login", { state: true });
        }
      })
      .catch((error) => {
        navigate("/login", { state: false });
      });
  }, [navigate]);

  return <Loading />;
}
