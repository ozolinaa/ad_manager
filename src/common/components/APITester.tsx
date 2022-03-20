import React from "react";
import ipLocator from "src/api/clients/ipLocator";
import useAPIcaller from "src/api/hooks/useAPIcaller";

const APITester: React.FC = () => {
  const [callGetIPLocation, getIPLocationApi] = useAPIcaller(
    ipLocator.getIPLocation
  );

  return (
    <div>
      <button
        onClick={() => {
          callGetIPLocation("213.180.204.3");
        }}
      >
        TestAPI
      </button>
      <div>response: {JSON.stringify(getIPLocationApi.response)}</div>
    </div>
  );
};

export default APITester;
