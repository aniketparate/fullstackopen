import { useState } from "react";
import CountryData from "./CountryData";

const ShowCountries = ({ country }) => {
  const [showData, setShowData] = useState(false);

  return (
    <>
      <button type="text" onClick={() => setShowData(!showData)}>
        show
      </button>
      {showData ? <CountryData country={country} /> : null}
    </>
  );
};

export default ShowCountries;
