export interface NumberData {
  id: number;
  telephoneNumber: string;
  ochOrderNumber: string;
  uniqueId: string;
  originatingOrderNumber: string;
  currentServiceOperator: string;
  recipientServiceOperator: string;
  recipientNetworkOperator: string;
  currentNumberType: string;
  customerId: string;
  icc: string;
  requestedExecutionDate: string;
  requestedExecutionTime: string;
  pointOfConnection: string;
  regDate: string;
  modDate: string;
  status: Status;
}

interface Status {
  id: number;
  value: string;
}

export interface NumberTabProps {
  visible: string;
  numbers: NumberData[];
  filterType?: string;
  onFilterTypeChange?: (value: string) => void;
  onSearchSubmit?: (searchRange: string) => void;
  /** Called after a number is successfully deleted so the parent can refetch the list. */
  onNumberDeleted?: () => void;
  /** Phone numbers that have a task with is_completed=1 in tasklisttable; show "NP completed" instead of trash in Actions. */
  phoneNumbersWithCompletedTask?: Set<string>;
  /** Phone numbers that have a task with non-empty confirmedExecutionDate; show "Wait for confirmation" (yellow) instead of Reject/Cancel. */
  phoneNumbersWithConfirmedExecutionDate?: Set<string>;
}

export interface NumberTableProps {
  numbers: NumberData[];
  /** Called after a number is successfully deleted so the parent can refetch the list. */
  onNumberDeleted?: () => void;
  /** Phone numbers that have a task with is_completed=1 in tasklisttable; show "NP completed" instead of trash in Actions. */
  phoneNumbersWithCompletedTask?: Set<string>;
  /** Phone numbers that have a task with non-empty confirmedExecutionDate; show "Wait for confirmation" (yellow) instead of Reject/Cancel. */
  phoneNumbersWithConfirmedExecutionDate?: Set<string>;
}

export interface ImportModalData {
  telephoneNumber: string;
  recipientServiceOperator: string;
  recipientNetworkOperator: string;
  requestedExecutionDate: string;
  pointOfConnection: string;
}

export type ImportModalErrors = {
  [k in keyof ImportModalData]: string;
};
