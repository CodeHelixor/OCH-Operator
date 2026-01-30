export interface RangeData {
  id: number;
  rangeStart: string;
  rangeEnd: string;
  startDate: string;
  rangeHolderId: string;
  serviceOperator: string;
  networkOperator: string;
  lubo: string;
  numberType: string;
  spc: string;
  municipality: string;
  chargingInfo: string;
  routingInfo: string;
  portingCase: string;
  ochOrderNumber: string;
}

export interface RangeTabProps {
  visible: string;
  ranges: RangeData[];
  onSearch: (start: string, end: string) => void;
}

export interface RangeTableProps {
  ranges: RangeData[];
  onSearch?: (start: string, end: string) => void;
}
