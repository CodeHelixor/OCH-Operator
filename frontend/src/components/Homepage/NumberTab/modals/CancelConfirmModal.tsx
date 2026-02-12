import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { NumberData } from "../types";

interface CancelConfirmModalProps {
  open: boolean;
  onClose: () => void;
  row: NumberData | null;
  onApply: () => void;
  isSubmitting?: boolean;
}

const CancelConfirmModal: React.FC<CancelConfirmModalProps> = ({
  open,
  onClose,
  row,
  onApply,
  isSubmitting = false,
}) => {
  if (!row) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="cancel-dialog-title"
      aria-describedby="cancel-dialog-description"
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle id="cancel-dialog-title" sx={{ pb: 0 }}>
        Cancel (Send to OCH)
      </DialogTitle>
      <DialogContent>
        <p className="text-sm text-slate-600 mb-4">
          Send a cancel request to OCH for this number. Telephone number:{" "}
          <strong>{row.telephoneNumber}</strong>. Do you want to apply?
        </p>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          onClick={onApply}
          color="primary"
          variant="contained"
          aria-label="Apply cancel"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending…" : "Apply"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelConfirmModal;
