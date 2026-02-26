import React from "react";
import { createPortal } from "react-dom";
import { TaskData } from "../types";

interface DeleteTaskConfirmModalProps {
  selectedTask: TaskData | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteTaskConfirmModal: React.FC<DeleteTaskConfirmModalProps> = ({
  selectedTask,
  onConfirm,
  onCancel,
}) => {
  if (selectedTask == null) return null;

  const phone = selectedTask.telephoneNumber ?? "—";
  const modal = (
    <div
      className="modal-overlay"
      style={{ zIndex: 1300 }}
      onClick={onCancel}
      role="presentation"
    >
      <div
        className="modal-content p-6 w-[400px] max-w-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-slate-800">
          Remove transaction?
        </h2>
        <p className="text-slate-600 mb-6">
          This will remove the transaction for phone number <strong>{phone}</strong> from the list. This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3 mt-7">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn-danger"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
  return createPortal(modal, document.body);
};

export default DeleteTaskConfirmModal;
