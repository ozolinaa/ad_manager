import React from 'react';
import { Profile } from 'passport';
import AdContextProvider from 'src/ad/components/AdContextProvider';
import LoginPage from 'src/common/components/LoginPage';

export interface AuthorizedContextProviderProps {
    userProfile: Profile | undefined,
    children: React.ReactElement
};

export interface AuthorizedContextType {
    userProfile: Profile
}

export const AuthorizedContext = React.createContext<AuthorizedContextType>({} as AuthorizedContextType);

const AuthorizedContextProvider: React.FC<AuthorizedContextProviderProps> = (props: AuthorizedContextProviderProps) => {
    if(!props.userProfile) {
        return <LoginPage />;
    }
    return (
        <AuthorizedContext.Provider value={{userProfile: props.userProfile}}>
            <AdContextProvider>
                {props.children}
            </AdContextProvider> 
        </AuthorizedContext.Provider>
    );
};

export default AuthorizedContextProvider;
export const useAuthorizedContext = (): AuthorizedContextType => React.useContext(AuthorizedContext);
