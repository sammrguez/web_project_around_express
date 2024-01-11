const User = require("../models/user");

const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(
        `Error ${err.name} con el mensaje ${err.message} ocurrió durante la ejecución del código, pero lo hemos manejado`
      );
      res.status(500).send({ message: err.name });
    });
};

module.exports.getUser = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún user con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(
        `Error ${err.name} con el mensaje ${err.message} ocurrió durante la ejecución del código, pero lo hemos manejado`
      );
      res
        .status(404)
        .send({ message: "No se ha encontrado ningún user con esa id" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })

    .then((user) => {
      res.send({ data: user });
    })

    .catch((err) => {
      res
        .status(400)
        .send({ message: "los datos proporcionados no son válidos" });
    });
};
