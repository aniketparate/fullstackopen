const Filter = ({ search, handleSearch }) => {
  return (
    <div>
      <label>find countries:</label>
      <input
        value={search}
        onChange={handleSearch}
        placeholder="type here to search"
      />
    </div>
  );
};

export default Filter;
