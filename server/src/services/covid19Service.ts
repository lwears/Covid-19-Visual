import axios from 'axios';
import { State, ExtendedState, IncomingState } from '../types';

const baseUrl = 'https://covidtracking.com/api/v1/states/';

const getStateStats = async (): Promise<State[]> => {
  const { data } = await axios.get(`${baseUrl}current.json`);
  return data.map(({ state, hospitalizedCurrently }: State) => ({
    state,
    hospitalizedCurrently,
  }));
};

const get3DayTotal = async (stateName: string): Promise<number> => {
  const { data } = await axios.get(`${baseUrl}${stateName}/daily.json`);
  return data.slice(0, 3).reduce((total: number, place: IncomingState) => {
    return total + place.death;
  }, 0);
};

const getAllData = async (): Promise<ExtendedState[]> => {
  const states = await getStateStats();
  const result = await Promise.all(
    states.map(async ({ state, hospitalizedCurrently }) => {
      const total3Days = await get3DayTotal(state);
      return { state, hospitalizedCurrently, total3Days };
    })
  );

  return result;
};

export default {
  getStateStats,
  getAllData,
  get3DayTotal,
};
