export type IPLocation = {
    city: {
      id: number;
      lat: number;
      lon: number;
      name_en: string;
    };
    region: {
      id: number;
      name_en: string;
    };
    country: {
      id: number;
      name_en: string;
    };
  };