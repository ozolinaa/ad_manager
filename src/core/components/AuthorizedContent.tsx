import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AdsPage from "src/ad/components/AdsPage";
import IPGeoTester from "src/common/components/IPGeoTester";
import { converProfileToUserDetailsProps } from "src/user/components/UserDetails";
import { useAuthorizedContext } from "./AuthorizedContextProvider";

const WelcomePage: React.FC = () => {
  const { userProfile } = useAuthorizedContext();

  const userDetailsProps = converProfileToUserDetailsProps(userProfile);

  return (
    <div>
      <h1>Welcome to Ad manager {userDetailsProps.name} ({userDetailsProps.email})</h1>
      <div>
        <Link to="/ads">Manage Ads</Link>
      </div>
      <div>
        <Link to="/ipgeotester">IP Geo Tester</Link>
      </div>
    </div>
  );
}

const IPGeoTesterPage: React.FC = () => {
  return (
    <div>
      <IPGeoTester />
    </div>
  );
}




const AuthorizedContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="ads/*" element={<AdsPage />} />
      <Route path="ipgeotester/*" element={<IPGeoTesterPage />} />
    </Routes>
  );
};

export default AuthorizedContent;
