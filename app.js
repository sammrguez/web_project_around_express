const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb");
const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "Error de conexión a la base de datos:")
);
db.once("open", () => {
  console.log("Conexión exitosa a la base de datos");
});
const cardsRouter = require("./routes/cards");

const usersRouter = require("./routes/users");

app.use(express.static(path.join(__dirname, "public")));
app.use("/", cardsRouter);
app.use("/", usersRouter);
app.use("/", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`La aplicación está detectando el puerto ${PORT}`);
});
