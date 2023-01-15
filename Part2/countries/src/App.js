import { useEffect, useState } from "react";
import axios from "axios";
import SearchCountry from "./components/SearchCountry";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value);
  };

  const countryList = countries.filter((item) =>
    item.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  );

  return (
    <div>
      <Filter search={searchCountry} handleSearch={handleSearchCountry} />
      <SearchCountry countries={countryList} />
    </div>
  );
};

export default App;
