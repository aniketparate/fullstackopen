import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [person, setPerson] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [search, setSearch] = useState("");

  const addNewName = (event) => {
    event.preventDefault();

    const itemInExistance = person.find(
      (item) =>
        item.name.toLowerCase() === newName.toLowerCase() ||
        item.number === newNum
    );
    if (itemInExistance) {
      alert(`${newName} is already added to phone book`);
    } else {
      const nameObj = {
        name: newName,
        id: person.length + 1,
        number: newNum,
      };

      setPerson(person.concat(nameObj));
      setNewName("");
      setNewNum("");
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    console.log(event.target.value);
    setNewNum(event.target.value);
  };

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue={search} handleSearch={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={addNewName}
        nameValue={newName}
        handleName={handleNameChange}
        numValue={newNum}
        handleNum={handleNumChange}
      />
      <h3>Numbers</h3>
      <Persons personData={person} searchValue={search} />
    </div>
  );
};

export default App;
