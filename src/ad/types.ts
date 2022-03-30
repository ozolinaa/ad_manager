export type Redirect = {
    type: 'redirect'
    url: string
}

export type Banner = {
    type: 'banner'
    src: string
}

export interface GeoSetting {
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

export type BannerAd = Ad & Banner;
export type RedirectAd = Ad & Redirect;

export const isBannerAd = (ad: Ad): ad is BannerAd => {
    return ad.type == 'banner';
}

export const isRedirectAd = (ad: Ad): ad is RedirectAd => {
    return ad.type == 'redirect';
}