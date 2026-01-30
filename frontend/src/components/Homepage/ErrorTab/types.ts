export interface ErrorData {
  id: number;
  transactionType: String;
  telephoneNumber: String;
  ochOrderNumber: String;
  uniqueId: String;
  originatingOrderNumber: String;
  errors: [];
  isViewed: boolean;
}

export interface ErrorTabProps {
  visible: string;
  errors: ErrorData[];
}

export interface ErrorTableProps {
  errors: ErrorData[];
}
