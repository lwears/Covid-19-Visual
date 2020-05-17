import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Typography,
  CssBaseline,
  Box,
  makeStyles,
} from '@material-ui/core';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import MapChart from './components/MapChart';

interface StateProperties {
  name: string;
  state: string;
  hospitalizedCurrently: number;
  fips: string;
  total3Days: number;
  death: number;
  recovered: number;
}

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? '/api/covidstats'
    : process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
  },
  progressBar: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
}));

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function App() {
  const [stateCovidStats, setStateCovidStats] = useState<StateProperties[]>([]);
  const classes = useStyles();

  function fetchStateCovidStats() {
    fetch(baseUrl as RequestInfo)
      .then((res) => res.json())
      .then((data) => setStateCovidStats(data));
  }

  useEffect(() => {
    fetchStateCovidStats();
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100%"
      >
        <ThemeProvider theme={theme}>
          <Typography
            align="center"
            component="h4"
            variant="h4"
            className={classes.title}
          >
            USA Covid19 Visualiser
          </Typography>
        </ThemeProvider>
        {stateCovidStats.length > 1 ? (
          <Box width="70%">
            <MapChart stateCovidStats={stateCovidStats} />
          </Box>
        ) : (
          <Box className={classes.progressBar}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </div>
  );
}

export default App;
