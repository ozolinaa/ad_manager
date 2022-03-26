import { Ad, AdSetting } from 'src/ad/types';
import { uuid } from 'src/common/utils';

export const createAd = (type: Ad['type']): Ad => {
    const adSetting: AdSetting = {
        id: uuid(),
        tags: [],
        geoSettings: []
    }
    let ad: Ad;
    if(type == 'banner') {
        ad = {
            ...adSetting,
            type,
            src: ''
        }
    } else {
        ad = {
            ...adSetting,
            type,
            url: ''
        }
    }
    return ad;
};