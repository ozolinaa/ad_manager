import React from 'react';
import { Ad } from 'src/ad/types';
import { createAd as _createAd } from 'src/ad/utils'; 
import { HasFunctionsOnly, StateActionsContext } from '../../core/types';

export interface AdContextState {
    timestamp: number,
    ads: Ad[]
}

export interface AdContextActions extends HasFunctionsOnly {
    createAd: ( type: Ad['type']) => Ad;
    updateAd: (ad: Ad) => void;
    setState: (newState: AdContextState) => void;
}

export interface AdContextType extends StateActionsContext {
    state: AdContextState;
    actions: AdContextActions;
}

export const initialState: AdContextState = {
    timestamp: 0,
    ads: []
};

export const AdContext = React.createContext<AdContextType>({} as AdContextType);

const AdContextProvider: React.FC<{ children: React.ReactElement }> = (props: { children: React.ReactElement }) => {
    const [state, setState] = React.useState(initialState);

    const actions: AdContextActions = {
        createAd: (type: Ad['type']): Ad => {
            const newAd: Ad = _createAd(type);
            setState((prevState) => {
                prevState.ads.push(newAd)
                return {
                    ...prevState,
                    ads: [...prevState.ads, newAd]
                }
            });
            return newAd;
        },
        updateAd: (ad: Ad) => {
            setState((prevState) => {
                const adToUpdate = prevState.ads.find((x) => x.id == ad.id);
                if(!adToUpdate) {
                    return prevState;
                }
                const idx = prevState.ads.indexOf(adToUpdate);
                prevState.ads[idx] = ad;
                return {
                    ...prevState,
                    ads: [...prevState.ads]
                }
            });
        },
        setState: (newState: AdContextState) => {
            setState(newState);
        },
    };
    return <AdContext.Provider value={{ state, actions }}>{props.children}</AdContext.Provider>;
};

export default AdContextProvider;
export const useAdContext = (): AdContextType => React.useContext(AdContext);
