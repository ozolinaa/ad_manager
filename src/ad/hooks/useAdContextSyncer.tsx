import React from 'react';
import useAPIcaller from 'src/api/hooks/useAPIcaller';
import { useAdContext, AdContextState } from '../components/AdContextProvider';
import { serverOperations } from 'src/api/serverOperations';

const getStateHash = (state: AdContextState) => {
    return JSON.stringify(state);
}

const useAdContextSyncer = () => {
    const { state, actions } = useAdContext();
    const [ stateHash, setStateHash ] = React.useState({
        current: '',
        initial: ''
    });

    const [callUpdateAdContextState, updateAdContextStateAPI] =  useAPIcaller(serverOperations.UpdateAdContextState);
    const [callGetAdContextState, getAdContextStateAPI] =  useAPIcaller(serverOperations.GetAdContextState);

    const loadAdContextStateFromServer = React.useCallback(() => {
        callGetAdContextState({});
    }, []);

    const setNewState = (newAdContextState: AdContextState) => {
        const hash = getStateHash(newAdContextState);
        setStateHash({
            initial: hash,
            current: hash
        });
        actions.setState(newAdContextState);
    }

    // do this once onmount
    React.useEffect(() => {
        loadAdContextStateFromServer();
    }, [])


    // do this when getAdContextStateAPI just got response
    React.useEffect(() => {
        if(getAdContextStateAPI.justCompleted && getAdContextStateAPI.response) {
            setNewState(getAdContextStateAPI.response);
        }
    }, [getAdContextStateAPI.justCompleted, getAdContextStateAPI.response])

    // do this when updateAdContextStateAPI just got response
    React.useEffect(() => {
        if(updateAdContextStateAPI.justCompleted && updateAdContextStateAPI.response) {
            setNewState(updateAdContextStateAPI.response);
        }
    }, [updateAdContextStateAPI.justCompleted, updateAdContextStateAPI.response]);

    // do this when state changes
    React.useEffect(() => {
        const hash = getStateHash(state);
        setStateHash({
            current: hash,
            initial: stateHash.initial,
        });
    }, [state]);

    const sendAdContextStateToServer = React.useCallback(() => {
        callUpdateAdContextState(state)
    }, [state]);

    return {
        sendAdContextStateToServer,
        loadAdContextStateFromServer,
        modified: stateHash.current != stateHash.initial
    } 
}

export default useAdContextSyncer;