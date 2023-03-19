import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  const DB = config.db.url.replace("<PASSWORD>", config.db.password);

  mongoose.set("autoIndex", true);

  const con = mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  });
};
export default connectDB;
