import React from "react";
import { Fab } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import html2canvas from "html2canvas";
import { Tooltip } from "@material-ui/core";

export default function DownloadFab({ divId, downloadName }) {
  return (
    <Tooltip arrow placement="top" title="Descarcă PNG">
      <Fab
        sx={{
          position: "absolute",
          right: 15,
          top: -25,
          borderRadius: 0,
        }}
        color="primary"
        onClick={() => {
          const div = document.getElementById(divId);
          html2canvas(div).then((canvas) => {
            const image = canvas.toDataURL();
            const aDownloadLink = document.createElement("a");
            aDownloadLink.download = downloadName;
            aDownloadLink.href = image;
            aDownloadLink.click();
          });
        }}
      >
        <DownloadIcon />
      </Fab>
    </Tooltip>
  );
}
