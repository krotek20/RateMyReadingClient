import React, { useState, useEffect } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { MobileDateRangePicker } from "@mui/x-date-pickers-pro/MobileDateRangePicker";
import { useDecode } from "../../hooks/useDecode";
import SuperAdminDashboard from "./screens/SuperAdminDashboard";
import LocalAdminDashboard from "./screens/LocalAdminDashboard";
import StudentDashboard from "./screens/StudentDashboard";
// import { ExportCSV } from "../../core/DownloadButton/ExportCSV.component";

export default function DashBoard() {
  const [currentRole, setCurrentRole] = useState(0);
  const [period, setPeriod] = useState([null, null]);
  const [collectedData, setCollectedData] = useState({});

  const decode = useDecode();

  useEffect(() => {
    const user = decode();
    if (user.roles.includes("ROLE_SUPERADMIN")) {
      setCurrentRole(1);
    }
    if (user.roles.includes("ROLE_LOCALADMIN")) {
      setCurrentRole(2);
    }
    if (user.roles.includes("ROLE_PROFESSOR")) {
      setCurrentRole(3);
    }
    if (user.roles.includes("ROLE_STUDENT")) {
      setCurrentRole(4);
    }
  }, [decode]);

  const handleCollectData = (key, data) => {
    setCollectedData({ ...collectedData, [`${key}`]: data });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      my={2}
      px={2}
    >
      <Typography variant="h5" color="secondary" mb={1}>
        Selectează perioada
      </Typography>
      <Stack spacing={3} mb={5}>
        <MobileDateRangePicker
          mask="__.__.____"
          startText="Din data de"
          endText="Până în data de"
          cancelText="Renunță"
          toolbarTitle="Alege perioada"
          todayText="Astăzi"
          clearText="Ștergeți"
          clearable
          value={period}
          onChange={(newValue) => {
            setPeriod(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2, fontSize: 32 }}> - </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </Stack>
      {/* <ExportCSV
        csvData={collectedData}
        fileName={`Caravana_Lecturii_${new Date().toLocaleDateString("ro-RO")}`}
      /> */}
      <Box flexGrow={1}>
        {currentRole === 1 && (
          <SuperAdminDashboard
            period={period}
            onCollectData={handleCollectData}
          />
        )}
        {(currentRole === 2 || currentRole === 3) && (
          <LocalAdminDashboard period={period} />
        )}
        {currentRole === 4 && <StudentDashboard period={period} />}
      </Box>
    </Box>
  );
}
