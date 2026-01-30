import React, { ChangeEvent, useEffect, useState } from "react";
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
import {
  NPConfirmationModalData,
  NPConfirmationModalError,
  TaskData,
} from "../types";

interface ModalProps {
  selectedTask: TaskData;
  onNPConfirmModalOK: (data: NPConfirmationModalData) => void;
  onNPConfirmModalCancel: () => void;
}

const NPConfirmModal: React.FC<ModalProps> = ({
  selectedTask,
  onNPConfirmModalOK,
  onNPConfirmModalCancel,
}) => {
  const [formData, setFormData] = useState<NPConfirmationModalData>({
    confirmedExecutionDate: "",
    confirmationStatus: "",
  });

  const [errors, setErrors] = useState<NPConfirmationModalError>({
    confirmedExecutionDate: "",
    confirmationStatus: "",
  });
  const [confirmStatusDisabled, setConfirmStatusDisabled] = useState(true);

  useEffect(() => {
    const confirmedDate = dayjs(formData.confirmedExecutionDate, "YYYYMMDD");
    const requestedDate = dayjs(
      selectedTask.requestedExecutionDate,
      "YYYYMMDD"
    );

    // Disable Confirmation Status if both dates are equal (same day)
    if (confirmedDate.isValid() && confirmedDate.isSame(requestedDate, "day")) {
      setConfirmStatusDisabled(true);
      // setFormData((prev) => ({ ...prev, confirmationStatus: "" })); // clear previous value
    } else {
      setConfirmStatusDisabled(false);
    }
  }, [formData.confirmedExecutionDate]);

  const validate = (): boolean => {
    const newErrors: NPConfirmationModalError = {
      confirmedExecutionDate: "",
      confirmationStatus: "",
    };

    let isValid = true;
    const today = dayjs();
    const confirmedDate = dayjs(formData.confirmedExecutionDate, "YYYYMMDD");
    const requestedDate = dayjs(
      selectedTask.requestedExecutionDate,
      "YYYYMMDD"
    );

    //confirmedExecutionDate >= today
    if (!confirmedDate.isValid()) {
      newErrors.confirmedExecutionDate = "Please select a valid date";
      isValid = false;
    } else if (confirmedDate.isBefore(today, "day")) {
      newErrors.confirmedExecutionDate =
        "The ConfirmedExecutionDate shall be greater than or equal to Today";
      isValid = false;
    }

    //Must be ?=RequestedExecutionDate
    else if (confirmedDate.isBefore(requestedDate, "day")) {
      newErrors.confirmedExecutionDate =
        "The ConfirmedExecutionDate shall be greater than or equal to RequestedExecutionDate ";
      isValid = false;
    }

    //Muset be < any previous confirmedExecutionDate
    if (
      selectedTask.confirmedExecutionDate &&
      confirmedDate.isAfter(
        dayjs(selectedTask.confirmedExecutionDate, "YYYYMMDD"),
        "day"
      )
    ) {
      newErrors.confirmedExecutionDate =
        "The ConfirmedExecutionDate shall be less than any previous ConfirmedExecutionDate";
      isValid = false;
    }

    // 4️⃣ If ConfirmedExecutionDate ≠ RequestedExecutionDate → ConfirmationStatus required
    if (
      confirmedDate.isValid() &&
      requestedDate.isValid() &&
      !confirmedDate.isSame(requestedDate, "day") &&
      !formData.confirmationStatus
    ) {
      newErrors.confirmationStatus =
        "If the ConfirmedExecutionDate is different from the RequestedExecutionDate, then ConfirmationStatus shall be present";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onConfirm = () => {
    if (!validate()) return;
    onNPConfirmModalOK(formData);
  };

  const handleSelectChange =
    (field: keyof NPConfirmationModalData) => (event: SelectChangeEvent) => {
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
      <div className="bg-white p-6 rounded-lg w-[400px] max-w-[90%]">
        <h2 className="text-xl mb-4">Confirm this request?</h2>
        <Grid container spacing={2}>
          <Grid size={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {selectedTask.requestedExecutionDate != null ? (
                <DatePicker
                  label="Requested Execution Date"
                  value={dayjs(selectedTask.requestedExecutionDate)}
                  disabled
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              ) : (
                <TextField
                  fullWidth
                  id="telephoneNumber"
                  label="Requested Execution Date"
                  variant="outlined"
                  value="No requested date"
                  disabled
                />
              )}
            </LocalizationProvider>
          </Grid>

          <Grid size={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Confirmed Execution Date"
                value={
                  formData.confirmedExecutionDate
                    ? dayjs(formData.confirmedExecutionDate)
                    : null
                }
                onChange={(newValue: Dayjs | null) => {
                  setFormData((prev) => ({
                    ...prev,
                    confirmedExecutionDate: newValue
                      ? newValue.format("YYYYMMDD")
                      : "",
                  }));
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: Boolean(errors.confirmedExecutionDate),
                    helperText: errors.confirmedExecutionDate,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={12}>
            <Box sx={{ minWidth: 120, textAlign: "left" }}>
              <FormControl
                fullWidth
                error={Boolean(errors.confirmationStatus)}
                disabled={confirmStatusDisabled}
              >
                <InputLabel id="demo-simple-select-label">
                  Confirmation Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.confirmationStatus}
                  sx={{ textAlign: "left" }}
                  label="Confirmation Status"
                  onChange={handleSelectChange("confirmationStatus")}
                >
                  <MenuItem value="1">
                    Too early according to Rules & Procedures
                  </MenuItem>
                  <MenuItem value={"2"}>
                    Termination period is violated
                  </MenuItem>
                  <MenuItem value={"3"}>Contract period is violated</MenuItem>
                  <MenuItem value={"4"}>
                    Date moved due to excessive load
                  </MenuItem>
                </Select>
                {errors.confirmationStatus && (
                  <p
                    style={{
                      color: "#d32f2f",
                      fontSize: "0.75rem",
                      marginTop: "4px",
                    }}
                  >
                    {errors.confirmationStatus}
                  </p>
                )}
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <div className="flex justify-end gap-3 mt-7">
          <button
            onClick={onNPConfirmModalCancel}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default NPConfirmModal;
