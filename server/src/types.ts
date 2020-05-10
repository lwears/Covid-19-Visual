export interface State {
  state: string;
  hospitalizedCurrently: number;
}

export interface ExtendedState extends State {
  total3Days: number;
}

export interface IncomingState {
  date: number;
  state: string;
  positive: number;
  negative: number;
  hospitalizedCurrently: number;
  inIcuCurrently: number;
  dataQualityGrade: string;
  lastUpdateEt: string;
  hash: string;
  dateChecked: '2020-05-09T20:00:00Z';
  death: number;
  total: number;
  totalTestResults: number;
  posNeg: number;
  fips: string;
  deathIncrease: number;
  hospitalizedIncrease: number;
  negativeIncrease: number;
  positiveIncrease: number;
  totalTestResultsIncrease: number;
}
