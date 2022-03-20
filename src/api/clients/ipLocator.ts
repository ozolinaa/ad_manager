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

const host = "http://127.0.0.1:16001";

export default {
  getIPLocation: async (ip: string): Promise<IPLocation> => {
    try {
      const response = await fetch(`${host}/?ip=${ip}`);
      return response.json() as unknown as IPLocation;
    } catch (error) {
      throw error;
    }
  },
};
