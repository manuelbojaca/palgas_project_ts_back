const mongoose = require("mongoose");

function connect() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.once("open", () => {
    console.log("Connected with mongo DB: ", mongoose.connection.db.databaseName);
  });

  mongoose.connection.on("error", (err: any) => {
    console.log("Something went wrong! :", err);
  });

  return mongoose.connection;
}
export default connect;