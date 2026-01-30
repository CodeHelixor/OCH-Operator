import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
type RadioGroupProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Radiogroup({ value, onChange }: RadioGroupProps) {
  return (
    <div className="py-6 text-left">
      <p className="items-start font-semibold text-xl mb-3">Filter MSISDN</p>
      <FormControl className="flex">
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={onChange}
          value={value}
        >
          <FormControlLabel value="0" control={<Radio />} label="All" />

          <FormControlLabel
            value="Registered"
            control={<Radio />}
            label="Registered"
          />
          <FormControlLabel
            value="Ported In"
            control={<Radio />}
            label="Ported In"
          />
          <FormControlLabel
            value="Ported Out"
            control={<Radio />}
            label="Ported Out"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
