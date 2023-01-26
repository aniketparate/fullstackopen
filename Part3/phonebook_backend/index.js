const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

let person = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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

app.get("/", (request, response) => {
  response.send("<h1>Server working on root</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(person);
});

app.get("/info", (request, response) => {
  response.send(`
    <p>Phonebook has info of ${person.length} people</p>
    <p>${Date()}</p>  
  `);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const per = person.find((n) => n.id === id);

  if (per) {
    response.json(per);
  } else {
    response.statusMessage = "Requested resource is not available";
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  person = person.filter((per) => per.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const alreadyExist = person.find((per) => per.name === request.body.name);

  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  } else if (alreadyExist) {
    return response.status(400).json({
      error: "name must be unique",
    });
  } else {
    const per = {
      id: Math.floor(Math.random() * 1000000),
      name: request.body.name,
      number: request.body.number,
    };

    person = person.concat(per);
    response.json(person);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
