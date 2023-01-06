const Persons = ({ personData, searchValue }) => {
  return (
    <div>
      {personData.map(
        (per) =>
          per.name.toLowerCase().includes(searchValue.toLowerCase()) && (
            <li key={per.id}>
              {per.name} {per.number}
            </li>
          )
      )}
    </div>
  );
};

export default Persons;
