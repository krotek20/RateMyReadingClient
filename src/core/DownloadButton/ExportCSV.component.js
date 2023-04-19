import React from "react";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExportCSV = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportToCSV = (csvData, fileName) => {
    const wb = {
      Sheets: Object.keys(csvData).map((key) => {
        return XLSX.utils.json_to_sheet(csvData[key]);
      }),
      SheetNames: Object.keys(csvData),
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      sx={{ mb: 3 }}
      variant="contained"
      startIcon={<FileDownloadIcon />}
      onClick={() => exportToCSV(csvData, fileName)}
    >
      Export Excel
    </Button>
  );
};
