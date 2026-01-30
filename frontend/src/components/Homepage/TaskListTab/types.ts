export interface TaskData {
  id: number;
  ochOrderNumber: string;
  confirmedExecutionDate: string;
  currentNetworkOperator: string;
  currentNumberType: string;
  currentServiceOperator: string;
  isCompleted: boolean;
  originatingOrderNumber: string;
  pointOfConnection: string;
  recipientNetworkOperator: string;
  recipientServiceOperator: string;
  requestedExecutionDate: string;
  telephoneNumber: string;
  transactionType: string;
  uniqueId: string;
  confirmationStatus: ConfirmationStatus;
}

export interface ConfirmationStatus {
  id: number;
  value: string;
}

export interface TaskTabProps {
  visible: string;
  tasks: TaskData[];
}

export interface TaskTableProps {
  tasks: TaskData[];
}

export interface NPConfirmationModalData {
  confirmedExecutionDate: string;
  confirmationStatus: string;
}
export type NPConfirmationModalError = {
  [k in keyof NPConfirmationModalData]: string;
};

export interface NPCompleteModalData {
  recipientServiceOperator: string;
  recipientNetworkOperator: string;
  portingCase: string;
  spc: string;
  municipality: string;
  chargingInfo: string;
  routingInfo: string;
  newNumberType: string;
  numberPorted: string;
}
export type NPCompleteModalError = {
  [k in keyof NPCompleteModalData]: string;
};
