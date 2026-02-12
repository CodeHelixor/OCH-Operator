import React from "react";

type Variant = "primary" | "secondary" | "danger";

interface AppButtonProps {
  label: string;
  variant?: Variant;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  danger: "btn-danger",
};

const AppButton: React.FC<AppButtonProps> = ({
  label,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  fullWidth = false,
  children,
}) => {
  const baseClass = variantClasses[variant];
  const widthClass = fullWidth ? "w-full" : "";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${widthClass} ${className}`.trim()}
    >
      {children ?? label}
    </button>
  );
};

export default AppButton;
