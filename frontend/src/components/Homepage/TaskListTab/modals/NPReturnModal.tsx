import React, { ChangeEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NPReturnModalData, NPReturnModalError, TaskData } from "../types";

interface ModalProps {
  selectedTask: TaskData;
  onNPReturnModalOK: (data: NPReturnModalData) => void;
  onNPReturnModalCancel: () => void;
}

const NPReturnModal: React.FC<ModalProps> = ({
  selectedTask,
  onNPReturnModalOK,
  onNPReturnModalCancel,
}) => {
  const [formData, setFormData] = useState<NPReturnModalData>({
    telephoneNumber: selectedTask.telephoneNumber ?? "",
    originatingOrderNumber: selectedTask.originatingOrderNumber ?? "",
    seriesCount: 0,
    series: [],
    comments: [],
  });

  const [errors, setErrors] = useState<NPReturnModalError>({
    telephoneNumber: "",
    originatingOrderNumber: "",
    seriesCount: "",
    series: "",
    comments: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      telephoneNumber: selectedTask.telephoneNumber ?? "",
      originatingOrderNumber: selectedTask.originatingOrderNumber ?? "",
    }));
  }, [selectedTask.telephoneNumber, selectedTask.originatingOrderNumber]);

  const validate = (): boolean => {
    const newErrors: NPReturnModalError = {
      telephoneNumber: "",
      originatingOrderNumber: "",
      seriesCount: "",
      series: "",
      comments: "",
    };
    let isValid = true;
    if (!formData.telephoneNumber?.trim()) {
      newErrors.telephoneNumber = "This field is required";
      isValid = false;
    }
    if (!formData.originatingOrderNumber?.trim()) {
      newErrors.originatingOrderNumber = "This field is required";
      isValid = false;
    }
    if (formData.seriesCount < 0) {
      newErrors.seriesCount = "SeriesCount must be 0 or greater";
      isValid = false;
    }
    if (formData.series.length > 0 && formData.seriesCount !== formData.series.length) {
      newErrors.seriesCount = "SeriesCount must match the number of Series entries";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const onConfirm = () => {
    if (!validate()) return;
    const seriesCount =
      formData.series.length > 0 ? formData.series.length : formData.seriesCount;
    onNPReturnModalOK({
      ...formData,
      seriesCount,
    });
  };

  const handleSeriesCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value === "" ? 0 : Math.max(0, parseInt(e.target.value, 10) || 0);
    setFormData((prev) => ({ ...prev, seriesCount: v }));
  };

  const addSeries = () => {
    setFormData((prev) => ({
      ...prev,
      series: [...prev.series, { start: "", end: "" }],
    }));
  };

  const updateSeries = (index: number, field: "start" | "end", value: string) => {
    setFormData((prev) => ({
      ...prev,
      series: prev.series.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      ),
    }));
  };

  const removeSeries = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      series: prev.series.filter((_, i) => i !== index),
    }));
  };

  const addComment = () => {
    setFormData((prev) => ({
      ...prev,
      comments: [...prev.comments, ""],
    }));
  };

  const updateComment = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      comments: prev.comments.map((c, i) => (i === index ? value : c)),
    }));
  };

  const removeComment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      comments: prev.comments.filter((_, i) => i !== index),
    }));
  };

  const modal = (
    <div
      className="modal-overlay"
      style={{ zIndex: 1300 }}
      onClick={onNPReturnModalCancel}
      role="presentation"
    >
      <div
        className="modal-content p-8 w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-slate-800">
          NP Return (TransactionType 012)
        </h2>
        <Box
          sx={{
            "& .MuiInputBase-root": { minHeight: 56 },
            "& .MuiOutlinedInput-root": { minHeight: 56 },
          }}
        >
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                id="return-telephoneNumber"
                label="* Telephone Number"
                variant="outlined"
                value={formData.telephoneNumber}
                disabled
                slotProps={{ input: { sx: { minHeight: 56 } } }}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id="return-originatingOrderNumber"
                label="* Originating Order Number"
                variant="outlined"
                value={formData.originatingOrderNumber}
                disabled
                slotProps={{ input: { sx: { minHeight: 56 } } }}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                type="number"
                id="return-seriesCount"
                label="* Series Count (Not relevant for SOAP)"
                variant="outlined"
                value={formData.seriesCount}
                onChange={handleSeriesCountChange}
                inputProps={{ min: 0 }}
                error={Boolean(errors.seriesCount)}
                helperText={errors.seriesCount}
                slotProps={{ input: { sx: { minHeight: 56 } } }}
              />
            </Grid>

            <Grid size={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <span className="text-sm font-medium text-slate-700">
                  Series (Optional, 1–n times)
                </span>
                <IconButton size="small" color="primary" onClick={addSeries} aria-label="Add series">
                  <AddIcon />
                </IconButton>
              </Box>
              {formData.series.map((s, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <TextField
                    size="small"
                    label="Start"
                    value={s.start}
                    onChange={(e) => updateSeries(index, "start", e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    size="small"
                    label="End"
                    value={s.end}
                    onChange={(e) => updateSeries(index, "end", e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => removeSeries(index)}
                    aria-label="Remove series"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              ))}
            </Grid>

            <Grid size={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <span className="text-sm font-medium text-slate-700">
                  Comment (Optional, 1–n times)
                </span>
                <IconButton size="small" color="primary" onClick={addComment} aria-label="Add comment">
                  <AddIcon />
                </IconButton>
              </Box>
              {formData.comments.map((c, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <TextField
                    size="small"
                    fullWidth
                    label={`Comment ${index + 1}`}
                    value={c}
                    onChange={(e) => updateComment(index, e.target.value)}
                  />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => removeComment(index)}
                    aria-label="Remove comment"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Box>

        <p className="text-red-600 text-base mt-6 mb-4">
          After you've returned the phone number, please remove the phone number data from the Tasklist tab using trash button.
        </p>

        <div className="flex justify-end gap-3 mt-7">
          <button
            type="button"
            onClick={onNPReturnModalCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
  return createPortal(modal, document.body);
};

export default NPReturnModal;
