const mongoose = require("mongoose");

require("dotenv").config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 *
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */

//dotenv.config({ path: "./config.env" });

const DB = process.env.DB_STRING.replace("<PASSWORD>", process.env.DB_PASSWORD);
const connection = mongoose.createConnection(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
connection
  .then(() => console.log("DB connection successfull!"))
  .catch((err) => console.log(err));

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
});

// Expose the connection
const User = connection.model("User", UserSchema);
module.exports = connection;
