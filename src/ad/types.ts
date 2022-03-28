type Redirect = {
    type: 'redirect'
    url: string
}

type Banner = {
    type: 'banner'
    src: string
}

interface GeoSetting {
    country: string,
    region: string,
    city: string
}

export interface Tag {tagName: string}

export interface AdSetting {
    id: string,
    tags: Tag[],
    geoSettings: GeoSetting[]
}

export type Ad = {
    adName: string
} & AdSetting & (Redirect | Banner);


export const isBannerAd = (ad: Ad): ad is Ad & AdSetting & Banner => {
    return ad.type == 'banner';
}

export const isRedirectAd = (ad: Ad): ad is Ad & AdSetting & Redirect => {
    return ad.type == 'redirect';
}