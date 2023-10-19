const router = require("express").Router();
const users = require("../data/users.json");

router.get("/users", (req, res) => {
  res.send(users);
});
// aqui empieza el condicional
const doesUserExist = (req, res) => {
  const userId = req.params.id;
  const user = users.find((user) => user._id === userId);
  if (!user) {
    res.status(404).send({ message: "ID de usuario no encontrado" });
  } else {
    res.send(user);
  }
};

router.get("/users/:id", doesUserExist);
module.exports = router;
