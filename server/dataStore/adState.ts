import path from "path";
import fs from "fs";
import { AdContextState } from 'src/ad/components/AdContextProvider';
import { BannerAd, isBannerAd, isRedirectAd, RedirectAd } from "src/ad/types";

const dataFilePath = path.resolve("./server/data/ad_data.json");

const getData = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataFilePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
          });
    });
}

const setData = async (data: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(dataFilePath, data, 'utf-8', (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
          });
    });
}

export const getAdState = async(): Promise<AdContextState> => {
    let stateString = ""; 
    try {
        stateString = await getData();
    } catch (error) {
        console.error(error);
    }
    const parsed = JSON.parse(stateString);
    if(!parsed || !Object.keys(parsed).length) {
        const stateToWrite: AdContextState = {
            timestamp: Date.now(),
            ads: [],
        };
        stateString = JSON.stringify(stateToWrite);
        await setData(stateString);
    }
    return JSON.parse(stateString);
}

export const setAdState = async(newState: AdContextState): Promise<AdContextState> => {
    const currentState = await getAdState();
    if(newState.timestamp != currentState.timestamp) {
        console.error('trying to set old state. Server state timestamp differs from the timestamp you are trying to set');
    }
    const stateToWrite: AdContextState = {
        ...newState,
        timestamp: Date.now()
    }
    await setData(JSON.stringify(stateToWrite));
    await rebuildCountryRegionCityTagAdsMapCache();
    return stateToWrite;
}

type AdLists = {
    redirectAds: RedirectAd[],
    bannerAds: BannerAd[];
}
type TagAdsMap = Map<string, AdLists>;
type CityTagAdsMap = Map<string, TagAdsMap>;
type RegionCityTagAdsMap = Map<string, CityTagAdsMap>;
type CountryRegionCityTagAdsMap = Map<string, RegionCityTagAdsMap>;

export const countryRegionCityTagAdsMapCache: CountryRegionCityTagAdsMap = new Map<string, RegionCityTagAdsMap>();

const rebuildCountryRegionCityTagAdsMapCache = async () => {
    const adState = await getAdState();

    // important to clear old cache values
    countryRegionCityTagAdsMapCache.clear();


    adState?.ads.forEach((ad) => {
        ad.geoSettings?.forEach((geoSetting) => {
            let countryRegionCityTagAdsMap = countryRegionCityTagAdsMapCache.get(geoSetting.country);
            if(!countryRegionCityTagAdsMap) {
                countryRegionCityTagAdsMapCache.set(geoSetting.country, new Map<string, RegionCityTagAdsMap>());
                countryRegionCityTagAdsMap = countryRegionCityTagAdsMapCache.get(geoSetting.country);
            }
            if (!countryRegionCityTagAdsMap) {
                throw 'falsy countryRegionCityTagAdsMap';
            }

            let regionCityTagAdsMap = countryRegionCityTagAdsMap.get(geoSetting.region);
            if(!regionCityTagAdsMap) {
                countryRegionCityTagAdsMap.set(geoSetting.region, new Map<string, CityTagAdsMap>());
                regionCityTagAdsMap = countryRegionCityTagAdsMap.get(geoSetting.region);
            }
            if(!regionCityTagAdsMap) {
                throw 'falsy regionCityTagAdsMap';
            }

            let cityTagAdsMap = regionCityTagAdsMap.get(geoSetting.city);
            if(!cityTagAdsMap) {
                regionCityTagAdsMap.set(geoSetting.city, new Map<string, TagAdsMap>());
                cityTagAdsMap = regionCityTagAdsMap.get(geoSetting.city);
            }

            ad.tags?.forEach((tag) => {
                if(!cityTagAdsMap) {
                    throw 'falsy cityTagAdsMap';
                }
                let tagAdsMap = cityTagAdsMap.get(tag.tagName);
                if(!tagAdsMap) {
                    cityTagAdsMap.set(tag.tagName, {
                        redirectAds: [],
                        bannerAds: []
                    });
                    tagAdsMap = cityTagAdsMap.get(tag.tagName);
                }
                if(!tagAdsMap) {
                    throw 'falsy tagAdsMap';
                }
                if(isBannerAd(ad)) {
                    tagAdsMap.bannerAds.push(ad);
                } else if(isRedirectAd(ad)) {
                    tagAdsMap.redirectAds.push(ad);
                }
            });
        });
    })
}
// invoke immediately 
rebuildCountryRegionCityTagAdsMapCache();