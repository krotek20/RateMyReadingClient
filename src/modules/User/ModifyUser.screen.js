import { Typography } from "@mui/material";
import React from "react";
import VerticalTabs from "../../core/Tabs/VerticalTabs.component";
import { resetPassword } from "../Login/Login.api";

export default function ModifyUser() {
  const formInactivate = () => <Typography>Inactive</Typography>;
  const formResetPassword = () => <Typography>Reset</Typography>;

  return (
    <VerticalTabs
      tabs={[
        { children: formInactivate(), label: "Inactivează user" },
        { children: formResetPassword(), label: "Resetează-ți parola" },
      ]}
    />
  );
}
