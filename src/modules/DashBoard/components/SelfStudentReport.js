import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSelfStudentReport } from "../Metrics.api";

export default function SelfStudentReport({ period }) {
  const navigate = useNavigate();

  useEffect(() => {
    const [start, end] = [...period];
    const endFinalDay = new Date(end);
    endFinalDay.setDate(endFinalDay.getDate() + 1);
    getSelfStudentReport(
      start ? start.toISOString() : new Date().toISOString(),
      end ? endFinalDay.toISOString() : new Date().toISOString()
    )
      .payload.then((response) => {
        if (response.status === 200) {
          console.log(response.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login", { replace: true });
        }
      });
  }, [navigate, period]);

  return <div>SelfStudentReport</div>;
}
