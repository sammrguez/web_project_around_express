const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "../data/users.json");

router.get("/users", (req, res) => {
  fs.readFile(usersPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "ha ocurrido un error en el servidor" });
      return;
    } else {
      const users = JSON.parse(data);
      res.send(users);
    }
  });
});

const doesUserExist = (req, res) => {
  const userId = req.params.id;

  fs.readFile(usersPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "ha ocurrido un error en el servidor" });
      return;
    }

    const users = JSON.parse(data);
    const user = users.find((user) => user._id === userId);

    if (!user) {
      res.status(404).send({ message: "ID de usuario no encontrado" });
    } else {
      res.send(user);
    }
  });
};

// // aqui empieza el condicional
// const doesUserExist = (req, res) => {
//   const userId = req.params.id;
//   const user = users.find((user) => user._id === userId);
//   if (!user) {
//     res.status(404).send({ message: "ID de usuario no encontrado" });
//   } else {
//     res.send(user);
//   }
// };

router.get("/users/:id", doesUserExist);
module.exports = router;
