import axios from 'axios';
import { GeometryObject, Topology } from 'topojson-specification';
import topology from '../../data/states-10m.json';
import {
  BasicState,
  ExtendedState,
  IncomingState,
  StateProperties,
} from '../types';

const baseUrl = 'https://covidtracking.com/api/v1/states/';

const getStateStats = async (): Promise<BasicState[]> => {
  const { data } = await axios.get(`${baseUrl}current.json`);
  return data.map(
    ({ state, hospitalizedCurrently, fips, death, recovered }: BasicState) => ({
      state,
      hospitalizedCurrently,
      fips,
      death,
      recovered,
    })
  );
};

const get3DayTotal = async (stateName: string): Promise<number> => {
  const { data } = await axios.get(`${baseUrl}${stateName}/daily.json`);
  return data.slice(0, 3).reduce((total: number, place: IncomingState) => {
    return total + place.deathIncrease;
  }, 0);
};

const getAllData = async (): Promise<ExtendedState[]> => {
  const states = await getStateStats();
  const result = await Promise.all(
    states.map(
      async ({ state, hospitalizedCurrently, fips, death, recovered }) => {
        const total3Days = await get3DayTotal(state);
        return {
          state,
          hospitalizedCurrently,
          total3Days,
          fips,
          death,
          recovered,
        };
      }
    )
  );

  return result;
};

const updateGeometries = async (): Promise<
  GeometryObject<StateProperties>[]
> => {
  const states = await getAllData();
  return topology.objects.states.geometries.map((place) => {
    const stateToCopy = states.find((state) => state.fips === place.id);
    const newPlace = JSON.parse(JSON.stringify(place));
    newPlace.properties = { ...place.properties, ...stateToCopy };
    return newPlace;
  });
};

const newTopology = async (): Promise<Topology> => {
  const topologyClone = JSON.parse(JSON.stringify(topology));
  topologyClone.objects.states.geometries = await updateGeometries();
  return topologyClone;
};

export default {
  getStateStats,
  getAllData,
  get3DayTotal,
  newTopology,
  updateGeometries,
};
