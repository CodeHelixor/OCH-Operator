import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import AlertComponent from "../../general/AlertComponent";
import { useAuth } from "../../../context/AuthContext";

type InputFields = {
  rangeStart: string;
  rangeEnd: string;
  rangeUpdateType: string;
  portingCase: string;
  otherOperator: string;
  currentRangeHolder: string;
  currentNetworkOperator: string;
  recipientServiceOperator: string;
  spc: string;
  municipality: string;
  routingInfo: string;
  chargingInfo: string;
  newNumberType: string;
};

type InputErrors = {
  [k in keyof InputFields]: string;
};

const Rangechangebox = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState<
    "success" | "info" | "warning" | "error"
  >("success");

  const { userId } = useAuth();

  const API_BASE_URL =
    window._env_?.REACT_APP_API_BASE_URL || "http://localhost:8080";
  const [values, setValues] = useState<InputFields>({
    rangeStart: "",
    rangeEnd: "",
    rangeUpdateType: "",
    portingCase: "",
    otherOperator: "",
    currentRangeHolder: "",
    currentNetworkOperator: "",
    recipientServiceOperator: "",
    spc: "",
    municipality: "",
    routingInfo: "",
    chargingInfo: "",
    newNumberType: "",
  });
  const [errors, setErrors] = useState<InputErrors>({
    rangeStart: "",
    rangeEnd: "",
    rangeUpdateType: "",
    portingCase: "",
    otherOperator: "",
    currentRangeHolder: "",
    currentNetworkOperator: "",
    recipientServiceOperator: "",
    spc: "",
    municipality: "",
    routingInfo: "",
    chargingInfo: "",
    newNumberType: "",
  });

  const handleReset = () => {
    const emptyValues: InputFields = {
      rangeStart: "",
      rangeEnd: "",
      rangeUpdateType: "",
      portingCase: "",
      otherOperator: "",
      currentRangeHolder: "",
      currentNetworkOperator: "",
      recipientServiceOperator: "",
      spc: "",
      municipality: "",
      routingInfo: "",
      chargingInfo: "",
      newNumberType: "",
    };

    setValues(emptyValues);
    setErrors(emptyValues);
  };

  const validate = (): boolean => {
    const newErrors: InputErrors = {
      rangeStart: "",
      rangeEnd: "",
      rangeUpdateType: "",
      portingCase: "",
      otherOperator: "",
      currentRangeHolder: "",
      currentNetworkOperator: "",
      recipientServiceOperator: "",
      spc: "",
      municipality: "",
      routingInfo: "",
      chargingInfo: "",
      newNumberType: "",
    };

    // Set to false to disable all validation conditions below.
    const VALIDATIONS_ENABLED = true;
    if (!VALIDATIONS_ENABLED) {
      setErrors(newErrors);
      return true;
    }

    let isValid = true;

    //NewNumberTyp=GSM => CI!=default value
    if (values.newNumberType === "GSM") {
      if (values.chargingInfo.split("").every((ch) => ch === "0")) {
        newErrors.chargingInfo =
          "If NewNumberType is GSM, then ChargingInfo must not be default-value";
        isValid = false;
      }
    }

    //SPC and Municipality must either both have default-value or both differ from default value.
    if (
      (values.spc === "00" && values.municipality !== "000") ||
      (values.spc !== "00" && values.municipality == "000")
    ) {
      newErrors.spc =
        "SPC and Municipality must either both have default-value or both differ from default value";
      newErrors.municipality =
        "SPC and Municipality must either both have default-value or both differ from default value";
      isValid = false;
    }

    //Either ChargingInfo or SPC must be default-value. Only one of the fields must be default-value.
    if (
      (values.chargingInfo.split("").every((ch) => ch === "0") &&
        values.spc == "00") ||
      (!values.chargingInfo.split("").every((ch) => ch === "0") &&
        values.spc !== "00")
    ) {
      newErrors.chargingInfo =
        "Either ChargingInfo or SPC must be default-value. Only one of the fields must be default-value";
      newErrors.spc =
        "Either ChargingInfo or SPC must be default-value. Only one of the fields must be default-value";
      isValid = false;
    }

    //ChargingInfo and RoutingInfo must either both have default-value or both differ from default-value.
    if (
      (!values.chargingInfo.split("").every((ch) => ch === "0") &&
        values.routingInfo.split("").every((ch) => ch === "0")) ||
      (values.chargingInfo.split("").every((ch) => ch === "0") &&
        !values.routingInfo.split("").every((ch) => ch === "0"))
    ) {
      newErrors.chargingInfo =
        "ChargingInfo and RoutingInfo must either both have default-value or both differ from default-value";
      newErrors.routingInfo =
        "ChargingInfo and RoutingInfo must either both have default-value or both differ from default-value";
      isValid = false;
    }

    //The value of the field PortingCase shall always be ‘NonPorted’
    if (values.portingCase !== "NonPorted") {
      newErrors.portingCase = "This field shall always be NonPorted";
      isValid = false;
    }

    //The value of the first Telephone Number shall be less than or equal to the value of the second Telephone Number.
    if (+values.rangeStart > +values.rangeEnd) {
      newErrors.rangeStart =
        "The value of the first Telephone Number shall be less than or equal to the value of the second Telephone Number";
    }

    if (!values.rangeStart) {
      newErrors.rangeStart = "This field is required";
      isValid = false;
    }
    if (!values.rangeEnd) {
      newErrors.rangeEnd = "This field is required";
      isValid = false;
    }
    if (!values.rangeUpdateType) {
      newErrors.rangeUpdateType = "This field is required";
      isValid = false;
    }
    if (!values.portingCase) {
      newErrors.portingCase = "This field is required";
      isValid = false;
    }
    if (!values.otherOperator) {
      newErrors.otherOperator = "This field is required";
      isValid = false;
    }
    if (!values.currentRangeHolder) {
      newErrors.currentRangeHolder = "This field is required";
      isValid = false;
    }
    if (!values.currentNetworkOperator) {
      newErrors.currentNetworkOperator = "This field is required";
      isValid = false;
    }
    if (!values.recipientServiceOperator) {
      newErrors.recipientServiceOperator = "This field is required";
      isValid = false;
    }
    if (!values.spc) {
      newErrors.spc = "This field is required";
      isValid = false;
    }
    if (!values.municipality) {
      newErrors.municipality = "This field is required";
      isValid = false;
    }
    if (!values.routingInfo) {
      newErrors.routingInfo = "This field is required";
      isValid = false;
    }
    if (!values.chargingInfo) {
      newErrors.chargingInfo = "This field is required";
      isValid = false;
    }
    if (!values.newNumberType) {
      newErrors.newNumberType = "This field is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleTextFieldChange =
    (field: keyof InputFields) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };
  const handleSelectChange =
    (field: keyof InputFields) => (event: SelectChangeEvent) => {
      setValues((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const saveRangeInformation = async () => {
    if (!validate()) return;
    try {
      const res = await fetch(`${API_BASE_URL}/rangeChange`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rangeStart: values.rangeStart,
          rangeEnd: values.rangeEnd,
          rangeUpdateType: values.rangeUpdateType,
          portingCase: values.portingCase,
          otherOperator: values.otherOperator,
          currentRangeHolder: values.currentRangeHolder,
          currentNetworkOperator: values.currentNetworkOperator,
          recipientServiceOperator: values.recipientServiceOperator,
          spc: values.spc,
          municipality: values.municipality,
          routingInfo: values.routingInfo,
          chargingInfo: values.chargingInfo,
          newNumberType: values.newNumberType,
          userId,
        }),
      });
      const data = await res.json();
      console.log("====================here======================");
      console.log(data);
      if (data) {
        setShowAlert(true);
        setAlertMsg("Range Update request is sent to OCH");
        setAlertType("success");
        setTimeout(() => setShowAlert(false), 3000);
      } else {
        setShowAlert(true);
        setAlertMsg("Range Update request is not sent to OCH");
        setAlertType("error");
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (error) {}
  };

  return (
    <div className="mt-6 w-full">
      <div className="bg-surface-card rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="px-6 pt-6 pb-1 flex items-center justify-between border-b border-slate-200/60">
          <h3 className="text-lg font-semibold text-slate-800 tracking-tight">
            Range Information
          </h3>
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-medium text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded-lg px-2 py-1 transition-colors"
          >
            Reset
          </button>
        </div>
        <Box sx={{ flexGrow: 1 }} className="p-6">
          <Grid container spacing={3}>
            <Grid size={12}>
              <p className="text-sm text-slate-500 mb-1">Range bounds</p>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    id="rangeStart"
                    label="Range Start"
                    variant="outlined"
                    size="small"
                    value={values.rangeStart}
                    onChange={handleTextFieldChange("rangeStart")}
                    error={Boolean(errors.rangeStart)}
                    helperText={errors.rangeStart}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    id="rangeEnd"
                    label="Range End"
                    variant="outlined"
                    size="small"
                    value={values.rangeEnd}
                    onChange={handleTextFieldChange("rangeEnd")}
                    error={Boolean(errors.rangeEnd)}
                    helperText={errors.rangeEnd}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth size="small" error={Boolean(errors.rangeUpdateType)}>
                <InputLabel id="range-update-type-label">Range Update Type</InputLabel>
                <Select
                  labelId="range-update-type-label"
                  id="rangeUpdateType"
                  value={values.rangeUpdateType}
                  label="Range Update Type"
                  onChange={handleSelectChange("rangeUpdateType")}
                >
                  <MenuItem value={"I"}>Insert</MenuItem>
                  <MenuItem value={"U"}>Update</MenuItem>
                  <MenuItem value={"D"}>Delete</MenuItem>
                </Select>
                <FormHelperText>{errors.rangeUpdateType}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth size="small" error={Boolean(errors.portingCase)}>
                <InputLabel id="porting-case-label">Porting Case</InputLabel>
                <Select
                  labelId="porting-case-label"
                  id="portingCase"
                  value={values.portingCase}
                  label="Porting Case"
                  onChange={handleSelectChange("portingCase")}
                >
                  <MenuItem value={"NonPorted"}>NonPorted</MenuItem>
                  <MenuItem value={"PortedWithGeo"}>PortedWithGeo</MenuItem>
                  <MenuItem value={"PortedNonGeo"}>PortedNonGeo</MenuItem>
                </Select>
                <FormHelperText>{errors.portingCase}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <p className="text-sm text-slate-500 mb-1">Operators</p>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="otherOperator"
                    label="Other Operator"
                    variant="outlined"
                    value={values.otherOperator}
                    onChange={handleTextFieldChange("otherOperator")}
                    error={Boolean(errors.otherOperator)}
                    helperText={errors.otherOperator}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="currentRangeHolder"
                    label="Current Range Holder"
                    variant="outlined"
                    value={values.currentRangeHolder}
                    onChange={handleTextFieldChange("currentRangeHolder")}
                    error={Boolean(errors.currentRangeHolder)}
                    helperText={errors.currentRangeHolder}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="currentNetworkOperator"
                    label="Current Network Operator"
                    variant="outlined"
                    value={values.currentNetworkOperator}
                    onChange={handleTextFieldChange("currentNetworkOperator")}
                    error={Boolean(errors.currentNetworkOperator)}
                    helperText={errors.currentNetworkOperator}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="recipientServiceOperator"
                    label="Recipient Service Operator"
                    variant="outlined"
                    value={values.recipientServiceOperator}
                    onChange={handleTextFieldChange("recipientServiceOperator")}
                    error={Boolean(errors.recipientServiceOperator)}
                    helperText={errors.recipientServiceOperator}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={12}>
              <p className="text-sm text-slate-500 mb-1">Technical fields</p>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="spc"
                    label="SPC"
                    variant="outlined"
                    value={values.spc}
                    onChange={handleTextFieldChange("spc")}
                    error={Boolean(errors.spc)}
                    helperText={errors.spc}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="municipality"
                    label="Municipality"
                    variant="outlined"
                    value={values.municipality}
                    onChange={handleTextFieldChange("municipality")}
                    error={Boolean(errors.municipality)}
                    helperText={errors.municipality}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="routingInfo"
                    label="Routing Info"
                    variant="outlined"
                    value={values.routingInfo}
                    onChange={handleTextFieldChange("routingInfo")}
                    error={Boolean(errors.routingInfo)}
                    helperText={errors.routingInfo}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="chargingInfo"
                    label="Charging Info"
                    variant="outlined"
                    value={values.chargingInfo}
                    onChange={handleTextFieldChange("chargingInfo")}
                    error={Boolean(errors.chargingInfo)}
                    helperText={errors.chargingInfo}
                  />
                </Grid>
                <Grid size={6}>
                  <FormControl fullWidth size="small" error={Boolean(errors.newNumberType)}>
                    <InputLabel id="new-number-type-label">New Number Type</InputLabel>
                    <Select
                      labelId="new-number-type-label"
                      id="newNumberType"
                      value={values.newNumberType}
                      label="New Number Type"
                      onChange={handleSelectChange("newNumberType")}
                    >
                      <MenuItem value={"GSM"}>GSM</MenuItem>
                      <MenuItem value={"FIXED"}>FIXED</MenuItem>
                    </Select>
                    <FormHelperText>{errors.newNumberType}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid size={12} className="pt-2">
              <button
                type="button"
                className="btn-primary w-full h-12 rounded-xl text-base font-semibold"
                onClick={saveRangeInformation}
              >
                Save Range Information
              </button>
            </Grid>
          </Grid>
        </Box>
      </div>
      <AlertComponent
        show={showAlert}
        message={alertMsg}
        severity={alertType}
      />
    </div>
  );
};

export default Rangechangebox;
