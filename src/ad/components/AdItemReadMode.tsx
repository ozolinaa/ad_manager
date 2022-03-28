import React from 'react';
import { Ad } from "../types";

export interface AdItemReadModeProps {
    ad: Ad,
    onEditClick: () => void
}

const AdItemReadMode: React.FC<AdItemReadModeProps> = (props: AdItemReadModeProps) => {
    return (
        <div> Display
            {JSON.stringify(props.ad)}
            <button onClick={props.onEditClick}>Edit</button>
        </div>
    );
};

export default AdItemReadMode;