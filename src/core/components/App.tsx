import React from "react";
import styled from "styled-components";
import { Profile } from 'passport';
import AuthorizedContextProvider from "./AuthorizedContextProvider";
import AuthorizedContent from "./AuthorizedContent";

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
  return (
    <Container>
      <AuthorizedContextProvider userProfile={props.userProfile }>
        <AuthorizedContent />
      </AuthorizedContextProvider>
    </Container>
  );
};

export default App;
