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
}

export interface NumberTableProps {
  numbers: NumberData[];
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
