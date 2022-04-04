import { IPLocation } from "src/common/types";

const host: string = process.env.IP_LOCATOR_HOST || '';

export default {
  getIPLocation: async (ip: string): Promise<IPLocation> => {
    try {
      const response = await fetch(`${host}/?ip=${ip}`);
      const ipLocation = await response.json() as unknown as IPLocation;
      return {
        country: {
          id: ipLocation?.country?.id || 0,
          name_en: ipLocation?.country?.name_en || '*'
        },
        region: {
          id: ipLocation?.region?.id || 0,
          name_en: ipLocation?.region?.name_en || '*'
        },
        city: {
          id: ipLocation?.city?.id || 0,
          name_en: ipLocation?.city?.name_en || '*',
          lat: 0,
          lon: 0
        }
      };
    } catch (error) {
      throw error;
    }
  },
};
