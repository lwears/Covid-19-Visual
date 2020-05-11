"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const states_10m_json_1 = __importDefault(require("../../data/states-10m.json"));
const baseUrl = 'https://covidtracking.com/api/v1/states/';
const getStateStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`${baseUrl}current.json`);
    return data.map(({ state, hospitalizedCurrently, fips, death, recovered }) => ({
        state,
        hospitalizedCurrently,
        fips,
        death,
        recovered,
    }));
});
const get3DayTotal = (stateName) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`${baseUrl}${stateName}/daily.json`);
    return data.slice(0, 3).reduce((total, place) => {
        return total + place.deathIncrease;
    }, 0);
});
const getAllData = () => __awaiter(void 0, void 0, void 0, function* () {
    const states = yield getStateStats();
    const result = yield Promise.all(states.map(({ state, hospitalizedCurrently, fips, death, recovered }) => __awaiter(void 0, void 0, void 0, function* () {
        const total3Days = yield get3DayTotal(state);
        return {
            state,
            hospitalizedCurrently,
            total3Days,
            fips,
            death,
            recovered,
        };
    })));
    return result;
});
const updateGeometries = () => __awaiter(void 0, void 0, void 0, function* () {
    const states = yield getAllData();
    return states_10m_json_1.default.objects.states.geometries.map((place) => {
        const stateToCopy = states.find((state) => state.fips === place.id);
        const newPlace = JSON.parse(JSON.stringify(place));
        newPlace.properties = Object.assign(Object.assign({}, place.properties), stateToCopy);
        return newPlace;
    });
});
const newTopology = () => __awaiter(void 0, void 0, void 0, function* () {
    const topologyClone = JSON.parse(JSON.stringify(states_10m_json_1.default));
    topologyClone.objects.states.geometries = yield updateGeometries();
    return topologyClone;
});
exports.default = {
    getStateStats,
    getAllData,
    get3DayTotal,
    newTopology,
    updateGeometries,
};
