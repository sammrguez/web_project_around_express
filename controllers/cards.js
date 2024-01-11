const Card = require("../models/card");

const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404; //CastError
const SERVER_ERROR_CODE = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      console.log(
        `Error ${err.name} con el mensaje ${err.message} ocurrió durante la ejecución del código, pero lo hemos manejado`
      );
      res
        .status(SERVER_ERROR_CODE)
        .send({ message: "ha ocurrido un error en el servidor" });
    });
};
module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id se volverá accesible

  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })

    .then((card) => {
      res.send({ card });
    })

    .catch((err) => {
      console.log(
        `Error ${err.name} con el mensaje ${err.message} ocurrió durante la ejecución del código, pero lo hemos manejado`
      );
      res
        .status(ERROR_CODE)
        .send({ message: "los datos proporcionados no son válidos" });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log("ID de tarjeta no encontrado");
      res.status(NOT_FOUND_CODE).send({ message: err.message });
    });
};
