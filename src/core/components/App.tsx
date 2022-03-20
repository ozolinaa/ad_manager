import React from "react";
import styled from "styled-components";
import { Profile } from 'passport';
import { Routes, Route, Link } from "react-router-dom";
import UserDetails, { converProfileToUserDetailsProps } from "src/user/components/UserDetails";
import Counter from "src/common/components/Counter";
import APITester from "src/common/components/APITester";
import LoginPage from "src/common/components/LoginPage";

const Container = styled("div")`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dbe6f6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #c5796d,
    #dbe6f6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #c5796d,
    #dbe6f6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

export interface AppProps {
  userProfile: Profile | undefined,
}



const App: React.FC<AppProps> = (props: AppProps) => {
  if(!props) {
    return null;
  }
  return (
    <div>
        <Container>
        <Routes>
        <Route path="/" element={      <div>
        <h1>Hello React!</h1>
        {props.userProfile ? <UserDetails {...converProfileToUserDetailsProps(props.userProfile)} /> : <Link to="/login">LOGIN</Link>}
        <Counter />
        <APITester />
      </div>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

    </Container>    
    </div>


  );
};

export default App;
