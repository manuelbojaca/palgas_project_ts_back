"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const vehicle_routes_1 = __importDefault(require("./routes/vehicle.routes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./db"));
//HTTPS
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use('/users', user_routes_1.default);
app.use('/vehicles', vehicle_routes_1.default);
app.use('*', (_req, res) => {
    res.send('Gapps Project Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=server.js.map