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
// import assert from 'assert';
const covid19Service_1 = __importDefault(require("./covid19Service"));
describe('Covid19 Service - getStateStats Function', () => {
    test('covid19Service.getStateStats() returns array of length 56', (done) => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        const result = yield covid19Service_1.default.getStateStats();
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toBe(56);
        done();
    }));
    test('covid19Service.getStateStats() returns array containing state objects', (done) => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const result = yield covid19Service_1.default.getStateStats();
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({ state: 'AK' }),
            expect.objectContaining({ state: 'AL' }),
            expect.objectContaining({ state: 'AR' }),
        ]));
        done();
    }));
});
describe('Covid19 Service - get3DayTotal Function', () => {
    test('covid19Service.get3DayTotal() returns number', (done) => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        const result = yield covid19Service_1.default.get3DayTotal('AK');
        expect(Number.isInteger(result)).toBeTruthy();
        expect(result).not.toBe(0);
        done();
    }));
});
describe('Covid19 Service - getAllData Function', () => {
    test('covid19Service.getAllData() returns array', (done) => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        const result = yield covid19Service_1.default.getAllData();
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toBe(56);
        done();
    }));
    test('covid19Service.getAllData() returns array containing state objects', (done) => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const result = yield covid19Service_1.default.getAllData();
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({ state: 'AK' }),
            expect.objectContaining({ state: 'AL' }),
            expect.objectContaining({ state: 'AR' }),
        ]));
        done();
    }));
    test('covid19Service.getAllData() returns array containing remapped state objects', (done) => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(3);
        const result = yield covid19Service_1.default.getAllData();
        expect(result[0]).toHaveProperty('state');
        expect(result[0]).toHaveProperty('hospitalizedCurrently');
        expect(result[0]).toHaveProperty('total3Days');
        expect(result[0]).toHaveProperty('fips');
        done();
    }));
});
