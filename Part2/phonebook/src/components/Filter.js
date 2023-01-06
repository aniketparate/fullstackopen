const Filter = ({ searchValue, handleSearch }) => {
  return (
    <div>
      <label>fliter shown with: </label>
      <input value={searchValue} onChange={handleSearch} />
    </div>
  );
};

export default Filter;
