import React from "react";
import { useAdContext } from "./AdContextProvider";

const AdIndexPage: React.FC = () => {
  const adContext = useAdContext();

  return (
    <div>
      This is AD page
    </div>
  );
};

export default AdIndexPage;
