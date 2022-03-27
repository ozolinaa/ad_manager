import React from "react";
import useAdContextSyncer from "../hooks/useAdContextSyncer";

export type AdContextSyncerContextType = ReturnType<typeof useAdContextSyncer>;

export const AdContextSyncerContext = React.createContext<AdContextSyncerContextType>({} as AdContextSyncerContextType);

const AdContextSyncerContextProvider: React.FC<{ children: React.ReactElement }> = (props: { children: React.ReactElement }) => {
    const adContextSyncerContextType: AdContextSyncerContextType = useAdContextSyncer();
    return <AdContextSyncerContext.Provider value={adContextSyncerContextType}>{props.children}</AdContextSyncerContext.Provider>;
};


export default AdContextSyncerContextProvider;
export const useAdContextSyncerContext = (): AdContextSyncerContextType => React.useContext(AdContextSyncerContext);
