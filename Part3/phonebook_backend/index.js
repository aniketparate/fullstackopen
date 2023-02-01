const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

const app = express();

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

const middleware = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    JSON.stringify(req.body),
  ].join(" ");
});

app.use(middleware);

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
  Person.find({})
    .then((person) => {
      response.send(`
      <p>Phonebook has info of ${person.length} people</p>
      <p>${Date()}</p>  
    `);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  // const alreadyExist = person.find((per) => per.name === request.body.name);
  // const alreadyExist = false;
  // else if (alreadyExist) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  } else {
    const per = new Person({
      name: request.body.name,
      number: request.body.number,
    });

    per
      .save()
      .then((person) => {
        response.json(person);
      })
      .catch((error) => next(error));
  }
});

app.put("/api/persons/:id", (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatePerson) => {
      response.json(updatePerson);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.message === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
