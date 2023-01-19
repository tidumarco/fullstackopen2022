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
      <div key={country.ccn3}>
        <h1>{country.name.common}</h1>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
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
  } else {
    return filter.list.map((country) => (
      <li key={country.ccn3}>{country.name.common}</li>
    ));
  }
};

export default Countries;
