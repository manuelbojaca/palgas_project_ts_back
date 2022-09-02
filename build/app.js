"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const vehicle_routes_1 = __importDefault(require("./routes/vehicle.routes"));
const journey_routes_1 = __importDefault(require("./routes/journey.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.set('port', port);
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use('/api/users', user_routes_1.default);
app.use('/api/vehicles', vehicle_routes_1.default);
app.use('/api/journeys', journey_routes_1.default);
app.use('/', (_req, res) => {
    res.send('Gapps Project Server');
});
exports.default = app;
//# sourceMappingURL=app.js.map