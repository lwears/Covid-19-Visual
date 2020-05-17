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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
describe('The Covid19 Api', () => {
    test('responds with json', (done) => {
        supertest_1.default(index_1.default)
            .get('/api/covidstats')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    test('Confirm array is returned', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield supertest_1.default(index_1.default).get('/api/covidstats');
        expect(resp.status).toBe(200);
        expect(Array.isArray(resp.body)).toBeTruthy();
        done();
    }));
    test('API Should return Array of Objects', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield supertest_1.default(index_1.default).get('/api/covidstats');
        expect(resp.status).toBe(200);
        expect(resp.body).toEqual(expect.arrayContaining([
            expect.objectContaining({ state: 'AK' }),
            expect.objectContaining({ state: 'AL' }),
            expect.objectContaining({ state: 'AR' }),
        ]));
        done();
    }));
    test('Check Object has correct properties', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield supertest_1.default(index_1.default).get('/api/covidstats');
        expect(resp.status).toBe(200);
        expect(resp.body[0]).toHaveProperty('state');
        expect(resp.body[0]).toHaveProperty('hospitalizedCurrently');
        expect(resp.body[0]).toHaveProperty('total3Days');
        expect(resp.body[0]).toHaveProperty('fips');
        done();
    }));
});
