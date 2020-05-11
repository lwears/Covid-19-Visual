import React from 'react';
import './App.css';
import MapChart2 from './components/MapChart';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <div className='App'>
      <React.Fragment>
        <CssBaseline />
        <Container style={{ backgroundColor: '#cfe8fc', height: '10vh' }}>
        <Typography align='center' component='h3' variant="h3">
          USA Covid19 Visualiser
        </Typography>
        </Container>
        <Container maxWidth='lg'>
          <MapChart2 />
        </Container>
      </React.Fragment>
    </div>
  );
}

export default App;
