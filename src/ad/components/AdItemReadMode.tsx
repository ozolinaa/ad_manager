import React from 'react';
import { Ad } from "../types";

export interface AdItemReadModeProps {
    ad: Ad,
    onEditClick: () => void
}

const AdItemReadMode: React.FC<AdItemReadModeProps> = (props: AdItemReadModeProps) => {
    const { ad } = props;
    return (
        <div> 
            <b>{ad.adName}</b>
            {ad.type == 'redirect' && (<div>
                <a href={ad.url} target="_blank">{ad.url}</a>
            </div>)}
            <div>
                Tags: {ad.tags.map((x) => x.tagName).join(", ")}
            </div>
            <div>
                Geo Settings: {ad.geoSettings.map((x) => {
                    return(<div>
                        Country: {x.country} - Region: {x.region} - City: {x.city}
                    </div>)
                })}
            </div>
            <div>
                &lt;script src=&quot;//{window.location.hostname}/ad.js?type={ad.type}&amp;tags={ad.tags.map((x) => x.tagName).join(".")}&quot;&gt;&lt;/script&gt;
            </div>
            <button onClick={props.onEditClick}>Edit</button>
        </div>
    );
};

export default AdItemReadMode;