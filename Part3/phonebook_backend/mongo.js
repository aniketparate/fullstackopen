const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give a password as argument: node mongo.js <password>");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://flame:${password}@cluster0.adln9cg.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

const Person = mongoose.model("Person", personSchema);

if (!name && !number) {
  Person.find({})
    .then((result) => {
      console.log("phonebook:");
      result.forEach((person) => {
        console.log(person);
      });
      mongoose.connection.close();
    })
    .catch((error) => console.log(error));
}

if (name && number) {
  const person = new Person({
    name: name,
    number: number,
    date: Date(),
  });

  person
    .save()
    .then((result) => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((error) => console.log(error));
}
