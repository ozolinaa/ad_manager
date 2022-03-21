import React from "react";
import useAPIcaller from "src/api/hooks/useAPIcaller";
import { serverOperations } from "src/api/serverOperations";

const APITester: React.FC = () => {
  const [callIPGeoLookup, ipGeoLookupApi] = useAPIcaller(
    serverOperations.IPGeoLookup
  );

  return (
    <div>
      <button
        onClick={() => {
          callIPGeoLookup({'ip': "213.180.204.3"});
        }}
      >
        TestAPI
      </button>
      <div>response: {JSON.stringify(ipGeoLookupApi.response)}</div>
    </div>
  );
};

export default APITester;
