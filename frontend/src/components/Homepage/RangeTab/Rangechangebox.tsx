import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  InputLabel,
  Link,
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

  const handleReset = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
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
    <div className="flex items-center justify-center mt-10">
      <div className="w-[90%] lg:w-[50%]">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid
              size={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Link href="#" underline="always" onClick={handleReset}>
                Reset
              </Link>
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                id="rangeStart"
                label="Range Start"
                variant="outlined"
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
                value={values.rangeEnd}
                onChange={handleTextFieldChange("rangeEnd")}
                error={Boolean(errors.rangeEnd)}
                helperText={errors.rangeEnd}
              />
            </Grid>
            <Grid size={6}>
              <Box sx={{ minWidth: 120, textAlign: "left" }}>
                <FormControl fullWidth error={Boolean(errors.rangeUpdateType)}>
                  <InputLabel id="demo-simple-select-label">
                    Range Update Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.rangeUpdateType}
                    sx={{ textAlign: "left" }}
                    label="Range Update Type"
                    onChange={handleSelectChange("rangeUpdateType")}
                  >
                    <MenuItem value={"I"}>Insert</MenuItem>
                    <MenuItem value={"U"}>Update</MenuItem>
                    <MenuItem value={"D"}>Delete</MenuItem>
                  </Select>
                  {errors.rangeUpdateType && (
                    <p
                      style={{
                        color: "#d32f2f",
                        fontSize: "0.75rem",
                        marginTop: "4px",
                      }}
                    >
                      {errors.rangeUpdateType}
                    </p>
                  )}
                </FormControl>
              </Box>
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
                    value={values.portingCase}
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
              <TextField
                fullWidth
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
                id="currentNetworkOperator"
                label="Current NetWork Operator"
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
                id="recipientServiceOperator"
                label="Recipient Service Operator"
                variant="outlined"
                value={values.recipientServiceOperator}
                onChange={handleTextFieldChange("recipientServiceOperator")}
                error={Boolean(errors.recipientServiceOperator)}
                helperText={errors.recipientServiceOperator}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
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
                id="routingInfo"
                label="RoutingInfo"
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
                id="chargingInfo"
                label="ChargingInfo"
                variant="outlined"
                value={values.chargingInfo}
                onChange={handleTextFieldChange("chargingInfo")}
                error={Boolean(errors.chargingInfo)}
                helperText={errors.chargingInfo}
              />
            </Grid>
            <Grid size={6}>
              <Box sx={{ minWidth: 120, textAlign: "left" }}>
                <FormControl fullWidth error={Boolean(errors.newNumberType)}>
                  <InputLabel id="demo-simple-select-label">
                    New Number Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{ textAlign: "left" }}
                    value={values.newNumberType}
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
            <Grid size={12}>
              <button
                type="button"
                className="btn-primary w-full h-14 text-base"
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
