import "./styles.css";
import countries from "./countries";
import phoneCodes from "./CountryCodes";
import { useEffect, useState } from "react";
import { exportCSVFile } from "./FileConvertUtil";

export default function App() {
  const [countryData, setCountryData] = useState([]);
  const [countryDetail, setCountryDetails] = useState([]);
  const [stringValues, setStringValues] = useState([]);
  const [showJson, setShowJson] = useState(false);
  const [showJsonDetail, setShowJsonDetail] = useState(false);
  const [showStringVal, setShowStringVal] = useState(false);

  useEffect(() => {
    getCountriesData();
  }, []);

  const printJson = () => setShowJson(!showJson);

  const getCountriesData = () => {
    const countriesWithCurrenciesPhone = [];
    const countriesData = countries.map((country) => {
      const phoneCodeObj =
        phoneCodes.find(
          (phoneCodes) => phoneCodes.code === country.isoAlpha2
        ) ?? "";

      countriesWithCurrenciesPhone.push({
        ...country,
        dial_code: phoneCodeObj?.dial_code
      });

      return {
        two_char_code: country.isoAlpha2,
        name: country.name,
        phone_code: phoneCodeObj?.dial_code ?? "0",
        three_char_code: country.isoAlpha3,
        currency_code: country.currency.code
      };
    });

    const finalData = countriesData.sort((firstElement, secondElement) =>
      firstElement.name
        .toLowerCase()
        .localeCompare(secondElement.name.toLowerCase())
    );

    setCountryData(finalData);
    setCountryDetails(countriesWithCurrenciesPhone);
  };

  const getStringValues = () => {
    let stringVals = "";

    const strData = countryData.map((countryData) => {
      const data =
        "('" +
        countryData.two_char_code +
        "', '" +
        countryData.name +
        "', '" +
        countryData.phone_code +
        "', '" +
        countryData.three_char_code +
        "', '" +
        countryData.currency_code +
        "'),";
      stringVals = stringVals + data;
      console.log(data);
      return data;
    });

    setStringValues(strData);

    setShowStringVal(!showStringVal);
  };

  const exportCSV = () => {
    const header = {
      two_char_code: "two_char_code",
      name: "name",
      phone_code: "phone_code",
      three_char_code: "three_char_code",
      currency_code: "currency_code"
    };
    exportCSVFile(header, countryData, "country");
  };

  return (
    <div className="App">
      <h1>Click below to download countries csv file.</h1>
      <div>
        <button onClick={() => exportCSV()}>Download CSV file</button>
      </div>
      <br />
      <div>
        <button onClick={() => printJson()}>
          {showJson ? "Hide" : "Print"} JSON Short Version{" "}
        </button>
        <p>{showJson ? JSON.stringify(countryData) : ""}</p>
      </div>

      <div>
        <button onClick={() => setShowJsonDetail(!showJsonDetail)}>
          {showJsonDetail ? "Hide" : "Print"} JSON Detail Version{" "}
        </button>
        <p>{showJsonDetail ? JSON.stringify(countryDetail) : ""}</p>
      </div>

      <br />
      <div>
        <button onClick={() => getStringValues()}>
          {showStringVal ? "Hide" : "Print"} String Values{" "}
        </button>
        <p>{showStringVal ? JSON.stringify(stringValues) : ""}</p>
      </div>
    </div>
  );
}

// reference : https://medium.com/@danny.pule/export-json-to-csv-file-using-javascript-a0b7bc5b00d2
