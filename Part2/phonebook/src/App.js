import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/person";
import Notification from "./components/Notification";

const App = () => {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState({});

  useEffect(() => {
    personService
      .getAll()
      .then((initialInfo) => {
        setPerson(initialInfo);
      })
      .catch((error) => console.warn(error));
  }, []);

  const emptyFields = () => {
    setNewName("");
    setNewNum("");
  };

  const addNewName = (event) => {
    event.preventDefault();
    if (!newName || !newNum) {
      setNotification({
        message: "Please fill both fields.",
        type: "unsuccessfull",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      return;
    }
    const itemInExistance = person.find(
      (item) => item.name.toLowerCase() === newName.toLowerCase()
    );
    if (itemInExistance) {
      updateName();
    } else {
      const nameObj = {
        name: newName,
        number: newNum,
        id: person.length + 1,
      };

      personService
        .create(nameObj)
        .then((returnInfo) => {
          setPerson(person.concat(returnInfo));
          emptyFields();
          setNotification({
            message: `Added ${nameObj.name}.`,
            type: "successfull",
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => console.warn(error));
    }
  };

  const removeName = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name} ?`);

    if (confirmDelete) {
      personService
        .deleteInfo(id)
        .then(() => {
          setPerson(person.filter((per) => per.id !== id));
          setNotification({
            message: `Deleted ${name}'s contact successfuly.`,
            type: "successfull",
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          console.warn(error);
          setNotification({
            message: `The information on ${name} has already been removed from the server.`,
            type: "unsuccessful",
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  };

  const updateName = () => {
    const confirmUpdate = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    );

    const numUpdate = person.find(
      (per) => per.name.toLowerCase() === newName.toLowerCase()
    );
    const changeNum = { ...numUpdate, number: newNum };

    if (confirmUpdate) {
      personService
        .update(changeNum.id, changeNum)
        .then((returnInfo) => {
          setPerson(
            person.map((per) => (per.id !== returnInfo.id ? per : returnInfo))
          );
          emptyFields();
          setNotification({
            message: `Replaced ${newName}'s number.`,
            type: "successfull",
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          console.warn(error);
          setNotification({
            message: `Could not replace, as the information on ${newName} has already been removed from the server.`,
            type: "unsuccessful",
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
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
      <Persons
        personData={person}
        searchValue={search}
        deletePerson={removeName}
      />
    </div>
  );
};

export default App;
