"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
function connect() {
    mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.once("open", () => {
        console.log("Connected with mongo DB: ", mongoose.connection.db.databaseName);
    });
    mongoose.connection.on("error", (err) => {
        console.log("Something went wrong!", err);
    });
    return mongoose.connection;
}
exports.default = connect;
//# sourceMappingURL=db.js.map