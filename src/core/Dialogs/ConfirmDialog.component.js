import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Close from "@mui/icons-material/Close";
import create from "zustand";

const useConfirmDialogStore = create((set) => ({
  message: "",
  onSubmit: undefined,
  close: () => set({ onSubmit: undefined }),
}));

export const confirmDialog = (message, onSubmit) => {
  useConfirmDialogStore.setState({
    message,
    onSubmit,
  });
};

const useStyles = makeStyles((theme) => {
  return {
    actions: {
      padding: theme.spacing(2),
    },
  };
});

const ConfirmDialog = () => {
  const c = useStyles();
  const { message, onSubmit, close } = useConfirmDialogStore();
  return (
    <Dialog open={!!onSubmit} onClose={close} maxWidth="sm" fullWidth>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle>Confirmați acțiunea</DialogTitle>
        <IconButton onClick={close}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions className={c.actions}>
        <Button color="primary" variant="outlined" onClick={close}>
          Anulează
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            if (onSubmit) {
              onSubmit();
            }
            close();
          }}
        >
          Confirmă
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
