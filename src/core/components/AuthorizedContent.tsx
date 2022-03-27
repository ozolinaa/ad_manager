import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AdsPage from "src/ad/components/AdsPage";
import APITester from "src/common/components/APITester";
import UserDetails, { converProfileToUserDetailsProps } from "src/user/components/UserDetails";
import { useAuthorizedContext } from "./AuthorizedContextProvider";

const Welcome: React.FC = () => {
  const { userProfile } = useAuthorizedContext();

  return (
    <div>
      <h1>Welcome to Ad manager</h1>
      <UserDetails {...converProfileToUserDetailsProps(userProfile)} />
      <Link to="/ads">Manage Ads</Link>
      <APITester />
    </div>
  );
}

const AuthorizedContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="ads/*" element={<AdsPage />} />
    </Routes>
  );
};

export default AuthorizedContent;
