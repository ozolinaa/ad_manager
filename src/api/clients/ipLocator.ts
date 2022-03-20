import { IPLocation } from "src/common/types";
import postData from "../postData";

export default {
  getIPLocation: async (ip: string): Promise<IPLocation> => {
    try {
      const data = await postData<IPLocation>('/getIPLocation', {ip});
      return data;
    } catch (error) {
      throw error;
    }
  },
};
