const Persons = ({ personData, searchValue, deletePerson }) => {
  return (
    <div>
      {personData.map(
        (per) =>
          per.name.toLowerCase().includes(searchValue.toLowerCase()) && (
            <li key={per.id}>
              {per.name} {per.number}
              <button onClick={() => deletePerson(per.id, per.name)}>
                delete
              </button>
            </li>
          )
      )}
    </div>
  );
};

export default Persons;
