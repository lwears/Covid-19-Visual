"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const covid19Stats_1 = __importDefault(require("./routes/covid19Stats"));
const index_1 = __importDefault(require("./routes/index"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'client/build')));
app.use('/', index_1.default);
app.use('/api/covidstats', covid19Stats_1.default);
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (Number.isNaN(port))
        return val;
    if (port >= 0)
        return port;
    return false;
}
const PORT = normalizePort(process.env.PORT || '3000');
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(path_1.default.join(__dirname, 'client/build'));
});
exports.default = app;
