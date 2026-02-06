import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { NumberData } from "../types";

export interface NpRejectFormData {
  telephoneNumber: string;
  ochOrderNumber: string;
  uniqueId: string;
  originatingOrderNumber: string;
  /** otherOperator for OCH (from DB recipient_service_operator). */
  otherOperator: string;
  rejectCode: number;
  rejectText: string;
}

export interface RejectModalErrors {
  rejectCode: string;
  rejectText: string;
}

interface RejectModalProps {
  open: boolean;
  onClose: () => void;
  row: NumberData | null;
  onReject: (data: NpRejectFormData) => void;
  isSubmitting?: boolean;
}

const RejectModal: React.FC<RejectModalProps> = ({
  open,
  onClose,
  row,
  onReject,
  isSubmitting = false,
}) => {
  const [rejectCode, setRejectCode] = useState<number>(382);
  const [rejectText, setRejectText] = useState("");
  const [errors, setErrors] = useState<RejectModalErrors>({
    rejectCode: "",
    rejectText: "",
  });

  useEffect(() => {
    if (open) {
      setRejectCode(382);
      setRejectText("");
      setErrors({ rejectCode: "", rejectText: "" });
    }
  }, [open]);

  const validate = (): boolean => {
    const newErrors: RejectModalErrors = { rejectCode: "", rejectText: "" };
    let isValid = true;

    if (rejectCode === undefined || rejectCode === null || Number.isNaN(rejectCode)) {
      newErrors.rejectCode = "Reject code is required";
      isValid = false;
    }

    if (!rejectText || !rejectText.trim()) {
      newErrors.rejectText = "Reject text is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRejectCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    const num = v === "" ? NaN : parseInt(v, 10);
    setRejectCode(num);
    if (errors.rejectCode) setErrors((prev) => ({ ...prev, rejectCode: "" }));
  };

  const handleRejectTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRejectText(e.target.value);
    if (errors.rejectText) setErrors((prev) => ({ ...prev, rejectText: "" }));
  };

  const handleSubmit = () => {
    if (!row || !validate()) return;
    onReject({
      telephoneNumber: row.telephoneNumber,
      ochOrderNumber: row.ochOrderNumber ?? "",
      uniqueId: row.uniqueId ?? "",
      originatingOrderNumber: row.originatingOrderNumber ?? "",
      otherOperator: row.recipientServiceOperator ?? "",
      rejectCode,
      rejectText: rejectText.trim(),
    });
    // Parent closes modal on success
  };

  if (!row) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="reject-dialog-title"
      aria-describedby="reject-dialog-description"
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle id="reject-dialog-title" sx={{ pb: 0 }}>
        NP Reject (TransactionType 006)
      </DialogTitle>
      <DialogContent>
        <p className="text-sm text-gray-600 mb-4">
          Send an NP Reject transaction to OCH for this NP Create request. Fill in the reject code and reason.
        </p>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Telephone Number"
              value={row.telephoneNumber}
              disabled
              variant="outlined"
              size="small"
              helperText="Number being rejected (read-only)"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Reject Code"
              type="number"
              value={Number.isNaN(rejectCode) ? "" : rejectCode}
              onChange={handleRejectCodeChange}
              variant="outlined"
              size="small"
              error={Boolean(errors.rejectCode)}
              helperText={errors.rejectCode || "e.g. 382"}
              inputProps={{ min: 0, max: 999, step: 1 }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Reject Text"
              value={rejectText}
              onChange={handleRejectTextChange}
              variant="outlined"
              size="small"
              multiline
              rows={3}
              placeholder="Reason for rejection"
              error={Boolean(errors.rejectText)}
              helperText={errors.rejectText}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
        <Button onClick={onClose} color="inherit" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="error"
          variant="contained"
          aria-label="Reject flow"
        >
          {isSubmitting ? "Sending…" : "Reject"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RejectModal;
