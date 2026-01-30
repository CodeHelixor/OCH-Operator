import React from "react";
type ButtonComponentProps = {
  label: String;
  onClick?: () => void;
};
const ButtonComponent = ({ label, onClick }: ButtonComponentProps) => {
  return (
    <div>
      <button
        className="bg-buttonColor text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-blue-400 transition my-3 w-full text-lg"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default ButtonComponent;
