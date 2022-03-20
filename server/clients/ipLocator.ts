import { IPLocation } from "src/common/types";

const host = "http://127.0.0.1:16001";

export default {
  getIPLocation: async (ip: string): Promise<IPLocation> => {
    try {
      const response = await fetch(`${host}/?ip=${ip}`);
      console.log('server getIPLocation', response);
      return response.json() as unknown as IPLocation;
    } catch (error) {
      throw error;
    }
  },
};
