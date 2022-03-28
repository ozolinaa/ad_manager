import React from 'react';
import ArrayFormManager from 'src/common/components/ArrayFormManager';
import Form from 'src/common/components/Form';
import { Ad, isRedirectAd } from "../types";

export interface AdItemEditModeProps {
    ad: Ad,
    onSaveClick: (updatedAd: Ad) => void
    onCancelClick: () => void
}
const AdItemEditMode: React.FC<AdItemEditModeProps> = (props: AdItemEditModeProps) => {

    const [updatedAd, setUpdatedAd] = React.useState<Ad>({} as Ad);

    React.useEffect(() => {
        setUpdatedAd(JSON.parse(JSON.stringify(props.ad)));
    }, [props.ad])

    const handlePartialUpdate = React.useCallback((partialAd: Partial<Ad>) => {
        setUpdatedAd((prevState) => {
            return {
                ...prevState,
                ...partialAd as Ad
            };
        })
    }, [setUpdatedAd]);

    return (
        <div> Editing
            <Form 
                obj={updatedAd || {}} 
                fields={[{ fieldName: 'adName' }]} 
                handlePartialUpdate={handlePartialUpdate}
            />
            {isRedirectAd(updatedAd) && <Form 
                obj={updatedAd || {}} 
                fields={[{ fieldName: 'url' }]} 
                handlePartialUpdate={handlePartialUpdate}
            />}
            <ArrayFormManager 
                arr={updatedAd.tags || []} 
                fields={[{fieldName: 'tagName'}]} 
                handleUpdate={(arr) => {handlePartialUpdate({'tags': arr})}} 
            />
            <ArrayFormManager 
                arr={updatedAd.geoSettings || []} 
                fields={[{fieldName: 'country'}, {fieldName: 'region'}, {fieldName: 'city'}]} 
                handleUpdate={(arr) => {handlePartialUpdate({'geoSettings': arr})}} 
            />
            
            {JSON.stringify(props.ad)}
            <div>
                <button onClick={() => { props.onSaveClick(updatedAd) }}>Save</button>
                <button onClick={() => { props.onCancelClick() }}>Cancel</button>
            </div>

        </div>
    );
};

export default AdItemEditMode;