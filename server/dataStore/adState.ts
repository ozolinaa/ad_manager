import path from "path";
import fs from "fs";
import { AdContextState } from 'src/ad/components/AdContextProvider';
import { Ad, BannerAd, isBannerAd, isRedirectAd, RedirectAd } from "src/ad/types";

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
    await rebuildCountryRegionCityAdListMapCache();
    return stateToWrite;
}

type AdLists = {
    redirectAds: (RedirectAd & {tagSet: Set<string>})[],
    bannerAds: (BannerAd & {tagSet: Set<string>})[];
}
type CityAdListMap = Map<string, AdLists>;
type RegionCityAdListMap = Map<string, CityAdListMap>;
type CountryRegionCityAdListMap = Map<string, RegionCityAdListMap>;

export const countryRegionCityAdListMapCache: CountryRegionCityAdListMap = new Map<string, CountryRegionCityAdListMap>();

export const getAdsByGeoAndTags = (countryName: string, regionName: string, cityName: string, tags: string[]): AdLists => {
  const adLists: AdLists[] = [];

  const regionCityAdListMaps: RegionCityAdListMap[] = [];
  [countryName, '*'].forEach((name) => {
    const regionCityAdListMap: RegionCityAdListMap | undefined = countryRegionCityAdListMapCache.get(name);
    if (regionCityAdListMap) {
        regionCityAdListMaps.push(regionCityAdListMap);
    }
  });

  const cityAdListMaps: CityAdListMap[] = [];
  [regionName, '*'].forEach((name) => {
    regionCityAdListMaps.forEach((regionCityAdListMap) => {
        const cityAdListMap: CityAdListMap | undefined = regionCityAdListMap.get(name);
        if (cityAdListMap) {
            cityAdListMaps.push(cityAdListMap);
        }
    })
  });

  const cityAdLists: AdLists[] = [];
  [cityName, '*'].forEach((name) => {
    cityAdListMaps.forEach((cityAdListMap) => {
        const AdListMap: AdLists | undefined = cityAdListMap.get(name);
        if (AdListMap) {
            cityAdLists.push(AdListMap);
        }
    })
  });

  const result: AdLists = { bannerAds: [], redirectAds: [] };
  cityAdLists.forEach((cityAdList) => {
    cityAdList.bannerAds.forEach((ad) => {
        if (containsAllTags(ad, tags)) {
            result.bannerAds.push(ad);
        } 
    })
    cityAdList.redirectAds.forEach((ad) => {
        if (containsAllTags(ad, tags)) {
            result.redirectAds.push(ad);
        } 
    })
  })

  return result;
}

const buildTagSet = (ad: Ad): Set<string> => {
    return new Set((ad.tags||[]).map(x => x.tagName))
}

const containsAllTags = (adWithTagSet: Ad & {tagSet: Set<string>}, tagsToCheck: string[]): boolean => {
    if(adWithTagSet.tagSet.size == 0 || tagsToCheck.length == 0) {
        return false;
    }
    for (const tagToCheck of tagsToCheck) {
        if(!adWithTagSet.tagSet.has(tagToCheck)) {
            return false;
        }
    };
    return true;
}

const rebuildCountryRegionCityAdListMapCache = async () => {
    const adState = await getAdState();

    // important to clear old cache values
    countryRegionCityAdListMapCache.clear();


    adState?.ads.forEach((ad) => {
        ad.geoSettings?.forEach((geoSetting) => {
            let countryRegionCityAdListMap = countryRegionCityAdListMapCache.get(geoSetting.country);
            if(!countryRegionCityAdListMap) {
                countryRegionCityAdListMapCache.set(geoSetting.country, new Map<string, RegionCityAdListMap>());
                countryRegionCityAdListMap = countryRegionCityAdListMapCache.get(geoSetting.country);
            }
            if (!countryRegionCityAdListMap) {
                throw 'falsy countryRegionCityAdListMap';
            }

            let regionCityAdListMap = countryRegionCityAdListMap.get(geoSetting.region);
            if(!regionCityAdListMap) {
                countryRegionCityAdListMap.set(geoSetting.region, new Map<string, CityAdListMap>());
                regionCityAdListMap = countryRegionCityAdListMap.get(geoSetting.region);
            }
            if(!regionCityAdListMap) {
                throw 'falsy regionCityAdListMap';
            }

            let cityAdList = regionCityAdListMap.get(geoSetting.city);
            if(!cityAdList) {
                regionCityAdListMap.set(geoSetting.city, {
                    bannerAds: [],
                    redirectAds: []
                });
                cityAdList = regionCityAdListMap.get(geoSetting.city);
            }
            if(!cityAdList) {
                throw 'falsy cityAdList';
            }

            if(isBannerAd(ad)) {
                cityAdList.bannerAds.push({
                    ...ad,
                    tagSet: buildTagSet(ad)
                });
            } else if(isRedirectAd(ad)) {
                cityAdList.redirectAds.push({
                    ...ad,
                    tagSet: buildTagSet(ad)
                });
            }
        });
    })
}
// invoke immediately 
rebuildCountryRegionCityAdListMapCache();
