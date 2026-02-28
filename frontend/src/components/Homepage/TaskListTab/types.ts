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
  numbers?: TaskTableNumberRecord[];
  /** Called after a task is successfully deleted so the parent can refetch the list. */
  onTaskDeleted?: () => void;
}

/** Minimal number record for task list: must include telephoneNumber; recipientNetworkOperator is used to decide if Return button is shown. Optional id used to pick latest when multiple rows exist for same phone. */
export interface TaskTableNumberRecord {
  id?: number;
  telephoneNumber: string;
  recipientNetworkOperator?: string;
}

export interface TaskTableProps {
  tasks: TaskData[];
  /** When provided, only tasks whose telephoneNumber exists in this list are shown. recipientNetworkOperator is used to show Return only when it matches the logged-in operator. */
  numbers?: TaskTableNumberRecord[];
  /** Called after a task is successfully deleted so the parent can refetch the list. */
  onTaskDeleted?: () => void;
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

/** NPReturn (TransactionType 012) – To OCH: TelephoneNumber (M), OriginatingOrderNumber (M), SeriesCount (M), Series* (O), Comment* (O) */
export interface NPReturnModalData {
  telephoneNumber: string;
  originatingOrderNumber: string;
  seriesCount: number;
  series: { start: string; end: string }[];
  comments: string[];
}
export type NPReturnModalError = {
  telephoneNumber: string;
  originatingOrderNumber: string;
  seriesCount: string;
  series: string;
  comments: string;
};
