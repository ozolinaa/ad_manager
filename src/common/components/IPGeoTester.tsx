import React from "react";
import useAPIcaller from "src/api/hooks/useAPIcaller";
import { serverOperations } from "src/api/serverOperations";

const IPGeoTester: React.FC = () => {
  const [callIPGeoLookup, ipGeoLookupApi] = useAPIcaller(
    serverOperations.IPGeoLookup
  );

  const [ip, setIp] = React.useState('213.180.204.3');
  const ipChangeHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIp(e.target.value);
  }, [setIp]);

  return (
    <div>
      <div>
        <a href="https://ip.osnova.news/country/ru/#city" target="_blank">https://ip.osnova.news/country/ru/#city</a>
      </div>
      <input type='text' value={ip} onChange={ipChangeHandler} />
      <button
        onClick={() => {
          callIPGeoLookup({ip});
        }}
      >
        IP Geo Lookup
      </button>
      {ipGeoLookupApi.response && (<div>
        <h3>{ipGeoLookupApi?.request?.ip}</h3>
        <div>
          <label>Country:</label> <b>{ipGeoLookupApi.response.country.name_en}</b>
        </div>
        <div>
          <label>Region:</label> <b>{ipGeoLookupApi.response.region.name_en}</b>
        </div>
        <div>
          <label>City:</label> <b>{ipGeoLookupApi.response.city.name_en}</b>
        </div>
      </div>)}
    </div>
  );
};

export default IPGeoTester;
