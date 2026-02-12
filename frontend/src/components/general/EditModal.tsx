// EditModal.tsx
import React from "react";
import { createPortal } from "react-dom";

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

  const modal = (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-slate-800">
          Portation Details
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-left text-slate-700">
            Portation Date
          </label>
          <input
            type="date"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
            value={portationDate}
            onChange={(e) => setPortationDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-left text-slate-700">
            Registration Date
          </label>
          <input
            type="date"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
            value={registrationDate}
            onChange={(e) => setRegistrationDate(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-left text-slate-700">
            Portation Status
          </label>
          <select
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
            value={portationStatus}
            onChange={(e) => setPortationStatus(e.target.value)}
          >
            <option value="1">Registered</option>
            <option value="2">Ported In</option>
            <option value="3">Ported Out</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="button" onClick={onOk} className="btn-primary">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
  return createPortal(modal, document.body);
};

export default EditModal;
