import React, { memo } from 'react';
import { ComposableMap, Geographies } from 'react-simple-maps';
import Geography from './Geography';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const MapChart = () => {
  return (
    <>
      <ComposableMap data-tip='' projection='geoAlbersUsa'>
        <Geographies geography={'http://localhost:3001/api/covidstats'}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const { name, hospitalizedCurrently, total3Days, death, recovered } = geo.properties;
              const fill =
                total3Days < 50
                  ? '#FFCC00'
                  : total3Days > 50 && total3Days < 100
                  ? '#FF9900'
                  : total3Days > 100 && total3Days < 300
                  ? '#FF6600'
                  : '#FF0000';
              return (
                <HtmlTooltip
                  key={geo.rsmKey}
                  title={
                    <React.Fragment>
                      <Typography color='inherit'>{name}</Typography>
                      <b>{'Currently Hospitalized: '}</b>
                      {hospitalizedCurrently ? hospitalizedCurrently : 'N/A'}
                      <br /> <b>{'Total Deaths(Last 3 days): '}</b>
                      {total3Days}
                      <br /> <b>{'Total Deaths: '}</b>
                      {death}
                      <br /> <b>{'Total Recovered: '}</b>
                      {recovered ? recovered : 'N/A'}
                    </React.Fragment>
                  }
                >
                  <Geography
                    geography={geo}
                    style={{
                      default: {
                        fill: fill,
                        outline: 'none',
                      },
                      hover: {
                        outline: 'none',
                        opacity: '0.3',
                      },
                      pressed: {
                        fill: '#E42',
                        outline: 'none',
                      },
                    }}
                  />
                </HtmlTooltip>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
