import React, { ChangeEvent, useState } from "react";
import { createPortal } from "react-dom";
import { ImportModalData, ImportModalErrors } from "../types";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface ModalProps {
  onImportModalOk: (data: ImportModalData) => void;
  onImportModalCancel: () => void;
}

const Importmodal: React.FC<ModalProps> = ({
  onImportModalOk,
  onImportModalCancel,
}) => {
  const [formData, setFormData] = useState<ImportModalData>({
    telephoneNumber: "",
    recipientServiceOperator: "",
    recipientNetworkOperator: "",
    requestedExecutionDate: "",
    pointOfConnection: "RECIPIENT",
  });

  const [errors, setErrors] = useState<ImportModalErrors>({
    telephoneNumber: "",
    recipientServiceOperator: "",
    recipientNetworkOperator: "",
    requestedExecutionDate: "",
    pointOfConnection: "",
  });

  const handleTextFieldChange =
    (field: keyof ImportModalData) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      if (field !== "requestedExecutionDate") {
        value = value.replace(/[^0-9]/g, "");
      }
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const validate = (): boolean => {
    const newErrors: ImportModalErrors = {
      telephoneNumber: "",
      recipientServiceOperator: "",
      recipientNetworkOperator: "",
      requestedExecutionDate: "",
      pointOfConnection: "",
    };

    let isValid = true;
    if (!formData.telephoneNumber) {
      newErrors.telephoneNumber = "This field is required";
      isValid = false;
    }

    if (!formData.recipientServiceOperator) {
      newErrors.recipientServiceOperator = "This field is required";
      isValid = false;
    }

    if (!formData.recipientNetworkOperator) {
      newErrors.recipientNetworkOperator = "This field is required";
      isValid = false;
    }

    if (!formData.pointOfConnection) {
      newErrors.pointOfConnection = "This field is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const onImport = () => {
    if (!validate()) return;
    onImportModalOk(formData);
  };
  const handleSelectChange =
    (field: keyof ImportModalData) => (event: SelectChangeEvent) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const modal = (
    <div className="modal-overlay" style={{ zIndex: 1300 }}>
      <div
        className="modal-content p-6 w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-slate-800">Import Number</h2>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              fullWidth
              id="telephoneNumber"
              label="* Telephone Number"
              variant="outlined"
              value={formData.telephoneNumber}
              onChange={handleTextFieldChange("telephoneNumber")}
              error={Boolean(errors.telephoneNumber)}
              helperText={errors.telephoneNumber}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              id="recipientServiceOperator"
              label="* Recipient Service Operator"
              variant="outlined"
              value={formData.recipientServiceOperator}
              onChange={handleTextFieldChange("recipientServiceOperator")}
              error={Boolean(errors.recipientServiceOperator)}
              helperText={errors.recipientServiceOperator}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              id="recipientNetworkOperator"
              label="* Recipient Network Operator"
              variant="outlined"
              value={formData.recipientNetworkOperator}
              onChange={handleTextFieldChange("recipientNetworkOperator")}
              error={Boolean(errors.recipientNetworkOperator)}
              helperText={errors.recipientNetworkOperator}
            />
          </Grid>

          <Grid size={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Requested Execution Date"
                value={
                  formData.requestedExecutionDate
                    ? dayjs(formData.requestedExecutionDate)
                    : null
                }
                onChange={(newValue: Dayjs | null) => {
                  setFormData((prev) => ({
                    ...prev,
                    requestedExecutionDate: newValue
                      ? newValue.format("YYYYMMDD")
                      : "",
                  }));
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: Boolean(errors.requestedExecutionDate),
                    helperText: errors.requestedExecutionDate,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={6}>
            <Box sx={{ minWidth: 120, textAlign: "left" }}>
              <FormControl fullWidth error={Boolean(errors.pointOfConnection)}>
                <InputLabel id="demo-simple-select-label">
                  * PointOfConnection
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{ textAlign: "left" }}
                  value={formData.pointOfConnection}
                  label="PointOfConnection"
                  onChange={handleSelectChange("pointOfConnection")}
                >
                  <MenuItem value={"RECIPIENT"}>Recipient</MenuItem>
                  <MenuItem value={"DONOR"}>Donor</MenuItem>
                </Select>
                {errors.pointOfConnection && (
                  <p
                    style={{
                      color: "#d32f2f",
                      fontSize: "0.75rem",
                      marginTop: "4px",
                    }}
                  >
                    {errors.pointOfConnection}
                  </p>
                )}
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onImportModalCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onImport()}
            className="btn-primary"
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
  return createPortal(modal, document.body);
};

export default Importmodal;
