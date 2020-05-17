import React from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

interface StateTooltipProps {
  stateCovidStats: StateProperties;
  name: string;
}

interface StateProperties {
  state: string;
  hospitalizedCurrently: number;
  fips: string;
  total3Days: number;
  death: number;
  recovered: number;
}

const StateTooltip: React.FC<StateTooltipProps> = (props) => {
  const { stateCovidStats, name } = props;
  const {
    hospitalizedCurrently,
    total3Days,
    death,
    recovered,
  } = stateCovidStats as StateProperties;

  return (
    <div>
      <Typography align="center" variant="h5" color="inherit">
        {name}
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Currently Hospitalized:
              </TableCell>
              <TableCell align="right">
                {hospitalizedCurrently || 'N/A'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Deaths(Last 3 days):
              </TableCell>
              <TableCell align="right">{total3Days || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Total Deaths:
              </TableCell>
              <TableCell align="right">{death || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Recovered:
              </TableCell>
              <TableCell align="right">{recovered || 'N/A'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StateTooltip;
