const mysql = require("mysql");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
require("dotenv").config();

app.use("/", require("./Routes/routes"));

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`Server running on port ${process.env.PORT}`);
});
