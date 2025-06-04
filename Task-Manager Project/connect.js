const mongoose = require("mongoose");

// Add your database name after .net/
const connectionString = "mongodb+srv://shahzahans:Alma2014$@cluster0.hc8y5zs.mongodb.net/task-manager?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = () => {
  return mongoose.connect(connectionString);
};

module.exports = connectDB;
