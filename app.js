const express = require("express");
const path = require("path");
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");

app.use(express.static(path.join(__dirname, "public")));
app.use("/", cardsRouter);
app.use("/", usersRouter);

app.listen(PORT, () => {
  console.log(`La aplicación está detectando el puerto ${PORT}`);
});
