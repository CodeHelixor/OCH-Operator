import React from "react";
import AppButton from "../../../general/AppButton";

type ButtonComponentProps = {
  label: string;
  onClick?: () => void;
};

const ButtonComponent = ({ label, onClick }: ButtonComponentProps) => {
  return (
    <div className="my-3">
      <AppButton label={label} onClick={onClick} fullWidth />
    </div>
  );
};

export default ButtonComponent;
