import CountryData from "./CountryData";
import ShowCountries from "./ShowCountries";

const SearchCountry = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    return <CountryData country={countries[0]} />;
  } else {
    return (
      <div>
        {countries.map((country, i) => (
          <div key={i}>
            {country.name.common}
            <ShowCountries country={country} />
          </div>
        ))}
      </div>
    );
  }
};

export default SearchCountry;
