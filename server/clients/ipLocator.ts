import { IPLocation } from "src/common/types";

const host: string = process.env.IP_LOCATOR_HOST || '';

export default {
  getIPLocation: async (ip: string): Promise<IPLocation> => {
    try {
      const response = await fetch(`${host}/?ip=${ip}`);
      const ipLocation = await response.json() as unknown as IPLocation;
      if(ipLocation?.country?.name_en && ipLocation?.region?.name_en && ipLocation?.city?.name_en) {
        return ipLocation;
      } else {
        throw {
          ip,
          message: `ipLocation recieved from ${host} does not have reqiured data`,
          ipLocation
        }
      }
    } catch (error) {
      throw error;
    }
  },
};
