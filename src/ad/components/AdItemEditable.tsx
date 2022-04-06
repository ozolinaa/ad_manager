import React from 'react';
import { Ad } from "../types";
import { useAdContext } from './AdContextProvider';
import AdItemEditMode from './AdItemEditMode';
import AdItemReadMode from './AdItemReadMode';

const AdItemEditable: React.FC<Ad> = (ad: Ad) => {
    const [adEditing, setAdEditing] = React.useState(false);
    const { actions } = useAdContext();

    const handleSave = (adToSave: Ad) => {
        actions.updateAd(adToSave);
        setAdEditing(false);
    };

    return (
        <div>
            {adEditing ?
                <AdItemEditMode 
                    ad={ad} 
                    onCancelClick={() => setAdEditing(false)} 
                    onSaveClick={handleSave} 
                />
                :
                <AdItemReadMode
                    ad={ad}
                    onEditClick={() => setAdEditing(true)}
                />
            }
            <br />
        </div>
    );
};

export default AdItemEditable;