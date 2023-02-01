import React from "react";
import { useCountry } from "../hooks/index";

const Country = ({ country }) => {
  const countryName = country?.name.common;
  const countryObject = useCountry(countryName);

  if (countryObject) {
    return (
      <div>
        <h3>{countryObject.name.common} </h3>
        <div>capital {countryObject.capital} </div>
        <div>population {countryObject.population}</div>
        <img
          src={countryObject.flags.png}
          height="100"
          alt={`flag of ${countryObject.name.common}`}
        />
      </div>
    )
  } else {
	return <div>not found</div>
  }
};

export default Country;
