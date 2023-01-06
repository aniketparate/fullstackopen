const PersonForm = ({
  nameValue,
  numValue,
  handleName,
  handleNum,
  handleSubmit,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input value={nameValue} onChange={handleName} />
        </div>
        <div>
          <label>Number: </label>
          <input value={numValue} onChange={handleNum} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
