import React from "react";
import AppButton from "../../../general/AppButton";

type ButtonComponentProps = {
  label: string;
  onClick?: () => void;
  fullWidth?: boolean;
};

const ButtonComponent = ({ label, onClick, fullWidth = true }: ButtonComponentProps) => {
  return (
    <div className="my-3">
      <AppButton label={label} onClick={onClick} fullWidth={fullWidth} />
    </div>
  );
};

export default ButtonComponent;
