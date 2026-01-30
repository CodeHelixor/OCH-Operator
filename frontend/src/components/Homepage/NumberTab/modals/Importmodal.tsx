import React, { ChangeEvent, useState } from "react";
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

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      style={{ zIndex: 3 }}
    >
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl mb-4">Import Number</h2>
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

        <div className="flex justify-end gap-3">
          <button
            onClick={onImportModalCancel}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => onImport()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default Importmodal;
