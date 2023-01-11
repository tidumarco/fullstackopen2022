const Countries = ({ filter, countries }) => {
  if (filter.query === "") {
    return (
      <ul>
        <div>No country selected</div>
      </ul>
    );
  } else if (filter.list.length > 10) {
    return <div>Too many results</div>;
  } else if (filter.list.length === 1) {
    return filter.list.map((country) => (
      <div>
        <h1>{country.name.common}</h1>
        <img
          src={country.flags.png}
          alt={country.name.common}
          style={{ height: "50px" }}
        />
        <li>capital: {country.capital}</li>
        <li>area: {country.area} km^2</li>
        <h4>Languages</h4>
        <ul>
          {Object.values(country.languages).map((lang) => {
            return <li key={JSON.stringify(lang)}>{lang}</li>;
          })}
        </ul>
      </div>
    ));
  } else if (countries.map((country) => country.name.common === filter.query)) {
    return filter.list.map((country) => (
      <li key={country.ccn3}>{country.name.common}</li>
    ));
  }
};

export default Countries;
