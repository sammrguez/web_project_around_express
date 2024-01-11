const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const app = express();

// conexion  MONGOdb
mongoose.connect("mongodb://127.0.0.1:27017/aroundb");
const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Error de conexión a la base de datos:", err);
});

db.once("open", () => {
  console.log("Conexión exitosa a la base de datos");
});

// importando routers
const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");
//solucion temporal
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // pega el _id del usuario de prueba que creamos en el paso anterior
  };

  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/", cardsRouter);
app.use("/", usersRouter);

app.use("/", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`La aplicación está detectando el puerto ${PORT}`);
});
