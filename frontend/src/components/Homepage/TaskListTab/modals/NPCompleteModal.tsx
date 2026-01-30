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
  NPCompleteModalData,
  NPCompleteModalError,
  NPConfirmationModalData,
  NPConfirmationModalError,
  TaskData,
} from "../types";

interface ModalProps {
  selectedTask: TaskData;
  onNPCompleteModalOK: (data: NPCompleteModalData) => void;
  onNPCompleteModalCancel: () => void;
}

const NPCompleteModal: React.FC<ModalProps> = ({
  selectedTask,
  onNPCompleteModalOK,
  onNPCompleteModalCancel,
}) => {
  const [formData, setFormData] = useState<NPCompleteModalData>({
    recipientServiceOperator: "",
    recipientNetworkOperator: "",
    portingCase: "",
    spc: "",
    municipality: "",
    chargingInfo: "",
    routingInfo: "",
    newNumberType: "",
    numberPorted: "",
  });

  const [errors, setErrors] = useState<NPCompleteModalError>({
    recipientServiceOperator: "",
    recipientNetworkOperator: "",
    portingCase: "",
    spc: "",
    municipality: "",
    chargingInfo: "",
    routingInfo: "",
    newNumberType: "",
    numberPorted: "",
  });
  const [confirmStatusDisabled, setConfirmStatusDisabled] = useState(true);

  const validate = (): boolean => {
    const newErrors: NPCompleteModalError = {
      recipientServiceOperator: "",
      recipientNetworkOperator: "",
      portingCase: "",
      spc: "",
      municipality: "",
      chargingInfo: "",
      routingInfo: "",
      newNumberType: "",
      numberPorted: "",
    };

    let isValid = true;

    if (formData.portingCase === "PortedWithGeo") {
      if (formData.municipality === "000") {
        newErrors.municipality =
          "If PortingCase is PortedWithGeo, municipality shall be different from '000'";
        isValid = false;
      }
      if (formData.spc === "00") {
        newErrors.spc =
          "If PortingCase is PortedWithGeo, SPC shall be different from '00'";
        isValid = false;
      }
    }

    if (formData.portingCase === "PortedNonGeo") {
      if (formData.routingInfo.split("").every((ch) => ch === "0")) {
        newErrors.routingInfo =
          "If PortingCase is PortedNonGeo, RoutingInfo shall be different from the default values";
        isValid = false;
      }
      if (formData.chargingInfo.split("").every((ch) => ch === "0")) {
        newErrors.chargingInfo =
          "If PortingCase is PortedNonGeo, ChargingInfo shall be different from the default values";
        isValid = false;
      }
    }

    //ChargingInfo and RoutingInfo must either both have default-value or both differ from default-value.
    if (
      (!formData.chargingInfo.split("").every((ch) => ch === "0") &&
        formData.routingInfo.split("").every((ch) => ch === "0")) ||
      (formData.chargingInfo.split("").every((ch) => ch === "0") &&
        !formData.routingInfo.split("").every((ch) => ch === "0"))
    ) {
      newErrors.chargingInfo =
        "ChargingInfo and RoutingInfo must either both have default-value or both differ from default-value";
      newErrors.routingInfo =
        "ChargingInfo and RoutingInfo must either both have default-value or both differ from default-value";
      isValid = false;
    }

    //Either ChargingInfo or SPC must be default-value. Only one of the fields must be default-value.
    if (
      (formData.chargingInfo.split("").every((ch) => ch === "0") &&
        formData.spc == "00") ||
      (!formData.chargingInfo.split("").every((ch) => ch === "0") &&
        formData.spc !== "00")
    ) {
      newErrors.chargingInfo =
        "Either ChargingInfo or SPC must be default-value. Only one of the fields must be default-value";
      newErrors.spc =
        "Either ChargingInfo or SPC must be default-value. Only one of the fields must be default-value";
      isValid = false;
    }

    //SPC and Municipality must either both have default-value or both differ from default value.
    if (
      (formData.spc === "00" && formData.municipality !== "000") ||
      (formData.spc !== "00" && formData.municipality == "000")
    ) {
      newErrors.spc =
        "SPC and Municipality must either both have default-value or both differ from default value";
      newErrors.municipality =
        "SPC and Municipality must either both have default-value or both differ from default value";
      isValid = false;
    }

    //NewNumberTyp=GSM => CI!=default value
    if (formData.newNumberType === "GSM") {
      if (formData.chargingInfo.split("").every((ch) => ch === "0")) {
        newErrors.chargingInfo =
          "If NewNumberType is GSM, then ChargingInfo must not be default-value";
        isValid = false;
      }
    }

    if (!formData.recipientServiceOperator) {
      newErrors.recipientServiceOperator = "This field is required";
      isValid = false;
    }
    if (!formData.recipientNetworkOperator) {
      newErrors.recipientNetworkOperator = "This field is required";
      isValid = false;
    }
    if (!formData.portingCase) {
      newErrors.portingCase = "This field is required";
      isValid = false;
    }
    if (!formData.spc) {
      newErrors.spc = "This field is required";
      isValid = false;
    }
    if (!formData.municipality) {
      newErrors.municipality = "This field is required";
      isValid = false;
    }
    if (!formData.routingInfo) {
      newErrors.routingInfo = "This field is required";
      isValid = false;
    }
    if (!formData.chargingInfo) {
      newErrors.chargingInfo = "This field is required";
      isValid = false;
    }
    if (!formData.newNumberType) {
      newErrors.newNumberType = "This field is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onConfirm = () => {
    if (!validate()) return;
    onNPCompleteModalOK(formData);
  };

  const handleTextFieldChange =
    (field: keyof NPCompleteModalData) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };
  const handleSelectChange =
    (field: keyof NPCompleteModalData) => (event: SelectChangeEvent) => {
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
      <div className="bg-white p-6 rounded-lg w-[500px] max-w-[90%]">
        <h2 className="text-xl mb-4">Complete this flow?</h2>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              id="telephoneNumber"
              label="* Telephone Number"
              variant="outlined"
              value={selectedTask.telephoneNumber}
              disabled
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              id="recipientServiceOperator"
              label="Recipient Service Operator"
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
              label="Recipient Network Operator"
              variant="outlined"
              value={formData.recipientNetworkOperator}
              onChange={handleTextFieldChange("recipientNetworkOperator")}
              error={Boolean(errors.recipientNetworkOperator)}
              helperText={errors.recipientNetworkOperator}
            />
          </Grid>

          <Grid size={6}>
            <Box sx={{ minWidth: 120, textAlign: "left" }}>
              <FormControl fullWidth error={Boolean(errors.portingCase)}>
                <InputLabel id="demo-simple-select-label">
                  Porting Case
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{ textAlign: "left" }}
                  value={formData.portingCase}
                  label="Porting Case"
                  onChange={handleSelectChange("portingCase")}
                >
                  <MenuItem value={"NonPorted"}>NonPorted</MenuItem>
                  <MenuItem value={"PortedWithGeo"}>PortedWithGeo</MenuItem>
                  <MenuItem value={"PortedNonGeo"}>PortedNonGeo</MenuItem>
                </Select>
                {errors.portingCase && (
                  <p
                    style={{
                      color: "#d32f2f",
                      fontSize: "0.75rem",
                      marginTop: "4px",
                    }}
                  >
                    {errors.portingCase}
                  </p>
                )}
              </FormControl>
            </Box>
          </Grid>
          <Grid size={6}>
            <Box sx={{ minWidth: 40, textAlign: "left" }}>
              <FormControl fullWidth error={Boolean(errors.newNumberType)}>
                <InputLabel id="demo-simple-select-label">
                  New Number Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{ textAlign: "left" }}
                  value={formData.newNumberType}
                  label="New Number Type"
                  onChange={handleSelectChange("newNumberType")}
                >
                  <MenuItem value={"GSM"}>GSM</MenuItem>
                  <MenuItem value={"FIXED"}>FIXED</MenuItem>
                </Select>
                {errors.newNumberType && (
                  <p
                    style={{
                      color: "#d32f2f",
                      fontSize: "0.75rem",
                      marginTop: "4px",
                    }}
                  >
                    {errors.newNumberType}
                  </p>
                )}
              </FormControl>
            </Box>
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              id="spc"
              label="SPC"
              variant="outlined"
              value={formData.spc}
              onChange={handleTextFieldChange("spc")}
              error={Boolean(errors.spc)}
              helperText={errors.spc}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              id="municipality"
              label="Municipality"
              variant="outlined"
              value={formData.municipality}
              onChange={handleTextFieldChange("municipality")}
              error={Boolean(errors.municipality)}
              helperText={errors.municipality}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              id="routingInfo"
              label="RoutingInfo"
              variant="outlined"
              value={formData.routingInfo}
              onChange={handleTextFieldChange("routingInfo")}
              error={Boolean(errors.routingInfo)}
              helperText={errors.routingInfo}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              id="chargingInfo"
              label="ChargingInfo"
              variant="outlined"
              value={formData.chargingInfo}
              onChange={handleTextFieldChange("chargingInfo")}
              error={Boolean(errors.chargingInfo)}
              helperText={errors.chargingInfo}
            />
          </Grid>
          <Grid size={6}>
            <Box sx={{ minWidth: 40, textAlign: "left" }}>
              <FormControl fullWidth error={Boolean(errors.numberPorted)}>
                <InputLabel id="demo-simple-select-label">
                  NumberPorted
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{ textAlign: "left" }}
                  value={formData.numberPorted}
                  label="Number Ported"
                  onChange={handleSelectChange("numberPorted")}
                >
                  <MenuItem value={"Y"}>Yes</MenuItem>
                  <MenuItem value={"N"}>No</MenuItem>
                </Select>
                {errors.numberPorted && (
                  <p
                    style={{
                      color: "#d32f2f",
                      fontSize: "0.75rem",
                      marginTop: "4px",
                    }}
                  >
                    {errors.numberPorted}
                  </p>
                )}
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <div className="flex justify-end gap-3 mt-7">
          <button
            onClick={onNPCompleteModalCancel}
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

export default NPCompleteModal;
