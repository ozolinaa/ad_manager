import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AdContextProvider, { useAdContext } from "./AdContextProvider";
import AdContextSyncerContextProvider, { useAdContextSyncerContext } from "./AdContextSyncerContextProvider";
import { createBlankAd } from 'src/ad/utils'; 
import AdItemEditable from "./AdItemEditable";

const AdsIndexPage: React.FC = () => {
  const adContext = useAdContext();
  const adContextSyncerContext = useAdContextSyncerContext()
  return (
    <div>
      <button onClick={() => adContext.actions.createAd(createBlankAd('redirect'))}>Add Redirect Ad</button>
      <button 
        onClick={() => adContextSyncerContext.sendAdContextStateToServer()} 
        disabled={!adContextSyncerContext.modified}>
          Save All Ads
      </button>

      <div>
        {adContext.state.ads.map((ad) => <AdItemEditable key={ad.id} {...ad} />)}
      </div>
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
      </Routes>
    </HasAdContextSyncerContextProvider>
  );
};

export default AdsPage;
