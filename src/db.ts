const mongoose = require("mongoose");

function connect() {
  mongoose.connect(process.env.MONGO_URI);

  mongoose.connection.once("open", () => {
    console.log("Connected with mongo");
  });

  mongoose.connection.on("error", (err: any) => {
    console.log("Something went wrong!", err);
  });

  return mongoose.connection;
}
export default connect;