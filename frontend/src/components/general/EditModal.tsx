// EditModal.tsx
import React from "react";

type EditModalProps = {
  show: boolean;
  onClose: () => void;
  onOk: () => void;
  portationDate: string;
  registrationDate: string;
  portationStatus: string;
  setPortationDate: (val: string) => void;
  setRegistrationDate: (val: string) => void;
  setPortationStatus: (val: string) => void;
};

const EditModal: React.FC<EditModalProps> = ({
  show,
  onClose,
  onOk,
  portationDate,
  registrationDate,
  portationStatus,
  setPortationDate,
  setRegistrationDate,
  setPortationStatus,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-fadeIn">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Portation Details
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-left">
            Portation Date
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            value={portationDate}
            onChange={(e) => setPortationDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-left">
            Registration Date
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            value={registrationDate}
            onChange={(e) => setRegistrationDate(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-left">
            Portation Status
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            value={portationStatus}
            onChange={(e) => setPortationStatus(e.target.value)}
          >
            <option value="1">Registered</option>
            <option value="2">Ported In</option>
            <option value="3">Ported Out</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onOk}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
