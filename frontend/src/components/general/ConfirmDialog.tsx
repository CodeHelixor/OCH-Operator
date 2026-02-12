import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface Data {
  id: number;
  msisdn: string;
  actions?: React.ReactNode;
  regdate: string;
  moddate: string;
  status: string;
}

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = "Confirm Action",
  description,
  onClose,
  onConfirm,
  confirmLabel = "Apply",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Typography id="confirm-dialog-description">{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
