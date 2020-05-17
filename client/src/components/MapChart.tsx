import React, { memo } from 'react';
import { ComposableMap, Geographies } from 'react-simple-maps';
import { Tooltip, withStyles } from '@material-ui/core';

import topology from '../data/states-10m.json';
import Geography from './Geography';
import StateTooltip from './StateTooltip';

interface StateProperties {
  name: string;
  state: string;
  hospitalizedCurrently: number;
  fips: string;
  total3Days: number;
  death: number;
  recovered: number;
}

interface MapChartProps {
  stateCovidStats: StateProperties[];
}

const MapChart: React.FC<MapChartProps> = (props) => {
  const { stateCovidStats } = props;

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 300,
      fontSize: theme.typography.pxToRem(12),
      border: '2px solid #dadde9',
    },
  }))(Tooltip);

  const fillColour = (value: number) => {
    switch (true) {
      case value < 25:
        return '#ffd54f';
      case value > 25 && value < 50:
        return '#ffc048';
      case value > 50 && value < 100:
        return '#ffab40';
      case value > 100 && value < 200:
        return '#ff9638';
      case value > 200 && value < 300:
        return '#ff8131';
      case value > 300 && value < 400:
        return '#ff6c2a';
      default:
        return '#ff5722';
    }
  };

  return (
    <ComposableMap height={500} projection="geoAlbersUsa">
      <Geographies geography={topology}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const stateStats = stateCovidStats.find(
              (state) => state.fips === geo.id
            );
            const { total3Days } = stateStats as StateProperties;

            const fill = fillColour(total3Days);

            return (
              <HtmlTooltip
                key={geo.rsmKey}
                title={
                  <StateTooltip
                    stateCovidStats={stateStats as StateProperties}
                    name={geo.properties.name}
                  />
                }
              >
                <Geography
                  geography={geo}
                  style={{
                    default: {
                      fill,
                      outline: 'none',
                    },
                    hover: {
                      outline: 'none',
                      fill: '#90caf9',
                    },
                    pressed: {
                      fill: '#1e88e5',
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
  );
};

export default memo(MapChart);
