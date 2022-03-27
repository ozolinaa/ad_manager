import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AdContextProvider, { useAdContext } from "./AdContextProvider";
import AdContextSyncerContextProvider, { useAdContextSyncerContext } from "./AdContextSyncerContextProvider";

const AdsIndexPage: React.FC = () => {
  const adContext = useAdContext();
  const adContextSyncerContext = useAdContextSyncerContext()
  return (
    <div>
      adContextSyncer.modified: {JSON.stringify(adContextSyncerContext)}
      <button onClick={() => adContext.actions.createAd('redirect')}>Add</button>
      <button onClick={() => adContextSyncerContext.sendAdContextStateToServer()}>sendAdContextStateToServer</button>

      <Link to="1">Manage Ad1</Link>
    </div>
  );
};

const AdSinglePage: React.FC = () => {
  const adContext = useAdContext();

  return (
    <div>
      This is AD 1
    </div>
  );
};

const HasAdContextSyncerContextProvider: React.FC<{children: React.ReactElement}> = (props: {children: React.ReactElement}) => {
  return (
    <AdContextProvider>
      <AdContextSyncerContextProvider>
        {props.children}
      </AdContextSyncerContextProvider>
    </AdContextProvider>
  );
};

const AdsPage: React.FC = () => {
  return (
    <HasAdContextSyncerContextProvider>
      <Routes>
        <Route path="/" element={<AdsIndexPage />} />
        <Route path="1" element={<AdSinglePage />} />
      </Routes>
    </HasAdContextSyncerContextProvider>
  );
};

export default AdsPage;
