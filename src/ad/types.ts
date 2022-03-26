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

export interface AdSetting {
    id: string,
    tags: string[],
    geoSettings: GeoSetting[]
}

export type Ad = AdSetting & (Redirect | Banner);
